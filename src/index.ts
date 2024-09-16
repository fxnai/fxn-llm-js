/*
*   Function
*   Copyright © 2024 NatML Inc. All Rights Reserved.
*/

import { Function, type Tensor } from "fxnjs"
import type { OpenAI } from "openai"
import type { Anthropic } from "@anthropic-ai/sdk"

export type LLMProvider = "openai" | "anthropic";

export interface LocallyConfig {
    /**
     * LLM provider client to make local.
     * Defaults to `openai`.
     */
    provider?: LLMProvider;
    /**
     * Function access key.
     */
    accessKey?: string;
    /**
     * Function API URL.
     */
    url?: string;
    /**
     * Function client.
     */
    fxn?: Function;
}

export function locally<T extends object> (
    client: T,
    config?: LocallyConfig
): T {
    const {
        provider = "openai",
        accessKey,
        url,
        fxn = new Function({ accessKey, url })
    } = config ?? { };
    if (provider === "openai")
        return proxy(client, {
            "embeddings.create": async (
                body: OpenAI.EmbeddingCreateParams,
                options?: OpenAI.RequestOptions
            ): Promise<OpenAI.CreateEmbeddingResponse> => {
                const { input: inputs, model, encoding_format, dimensions } = body;
                // Check if OAI model
                if (!/^@[a-z0-9._-]+\/[a-z0-9._-]+$/.test(model))
                    return await (client as any).embeddings.create(body, options);
                // Create prediction
                const input = typeof inputs === "string" ? [inputs] : inputs;
                const prediction = await fxn.predictions.create({ tag: model, inputs: { input } });
                const embeddings = prediction.results[0] as Tensor;
                return {
                    object: "list",
                    data: range(0, embeddings.shape[0]).map(index => ({
                        object: "embedding",
                        embedding: [...(embeddings.data as Float32Array).slice(index * embeddings.shape[1], (index + 1) * embeddings.shape[1])],
                        index
                    })),
                    model,
                    usage: {
                        prompt_tokens: 0,
                        total_tokens: 0,
                    }
                };
            },
        });
    else if (provider === "anthropic")
        return proxy(client, {
            /*
            "messages.create": async (
                body: Anthropic.MessageCreateParamsNonStreaming,
                options?: Anthropic.RequestOptions
            ): Promise<Anthropic.Message> => {
                return (client as Anthropic).messages.create(body, options);
            },
            "messages.stream": async function* (
                body: Anthropic.MessageCreateParamsStreaming,
                options?: Anthropic.RequestOptions
            ): AsyncGenerator<Anthropic.MessageStreamEvent> {
                return (client as Anthropic).messages.stream(body, options);
            }
            */
        });
    else
        return client;
}

type HandlerFunction<T extends any[], R = any> = (...args: T) => Promise<R>;
type HandlerGenerator<T extends any[]> = (...args: T) => AsyncGenerator;
type HandlerMap = Record<string, HandlerFunction<any, any> | HandlerGenerator<any>>;

function proxy<T extends object> (target: T, handlers: HandlerMap): T {
    const applyProxy = (obj: any, path: string[] = []): any => {
        return new Proxy(obj, {
            get(target, propKey) {
                // Invoke for handler
                const currentPath = [...path, String(propKey)].join(".");
                if (handlers[currentPath])
                    return async (...args: any[]) => await handlers[currentPath](...args);
                // Apply recursively
                const value = Reflect.get(target, propKey);
                if (typeof value === "object" && value !== null)
                    return applyProxy(value, [...path, String(propKey)]);
                // Return original
                return value;
            },
        });
    };
    return applyProxy(target) as T;
}

function range (start: number, count: number): number[] {
    return Array.from({ length: count }, (_, index) => start + index);
}