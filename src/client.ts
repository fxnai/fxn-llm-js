/*
*   Function
*   Copyright © 2024 NatML Inc. All Rights Reserved.
*/

import express from "express"
import type { Express, Request, Response } from "express"
import { Function, Tensor } from "fxnjs"
import type { Server } from "http"
import { CREATE_EMBEDDINGS_SCHEMA } from "./schema/embeddings"

export type LLMProvider = "openai" | "anthropic";

export interface FunctionLLMConfig {
    /**
     * LLM provider to mock.
     */
    provider: LLMProvider;
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

/**
 * Function LLM client.
 */
export class FunctionLLM {

    /**
     * LLM API URL.
     * This is a loopback URL that handles requests locally and in-process.
     */
    public readonly baseUrl: string;

    private readonly fxn: Function;

    private server: Server;

    public constructor (config: FunctionLLMConfig) {
        const { provider, fxn, ...fxnConfig } = config;
        this.fxn = fxn ?? new Function(fxnConfig);
        const app = this.createOpenAI();
        const port = 12345;
        this.baseUrl = `http://127.0.0.1:${port}/v1`;
        this.server = app.listen(port, () => { });
    }

    public [Symbol.dispose] () {
        this.server.closeAllConnections();
        this.server.close();
    }

    private createOpenAI (): Express {
        const app = express();
        app.use(express.json());
        app.post("/v1/embeddings", wrap(req => this.createEmbeddingsOpenAI(req)));
        return app;
    }

    private async createEmbeddingsOpenAI (req: Request): Promise<EmbeddingResponse> {
        // Check request body
        const result = CREATE_EMBEDDINGS_SCHEMA.safeParse(req.body);
        if (!result.success)
            throw new Error(result.error.errors[0].message);
        // Embed
        const { input: inputs, model, encoding_format, dimensions } = result.data;
        const input = typeof inputs === "string" ? [inputs] : inputs;
        const prediction = await this.fxn.predictions.create({ tag: model, inputs: { input } });
        const embeddings = prediction.results[0] as Tensor;
        // Respond
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
    }

    private createAnthropic (): Express {
        const app = express();
        app.use(express.json());
        return app;
    }
}

function range (start: number, count: number): number[] {
    return Array.from({ length: count }, (_, index) => start + index);
}

function wrap (handler: (req: Request) => Promise<any>) {
    return async (req: Request, res: Response) => {
        try {
            const response = await handler(req);
            return res.status(200).json(response);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    };
}

interface Embedding {
    object: "embedding";
    embedding: number[];
    index: number;
}

interface EmbeddingResponse {
    object: "list";
    data: Embedding[];
    model: string;
    usage: {
        prompt_tokens: 0;
        total_tokens: 0;
    }
}