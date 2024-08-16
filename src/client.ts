/*
*   Function
*   Copyright © 2024 NatML Inc. All Rights Reserved.
*/

import { Function } from "fxnjs"

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
}

/**
 * Function LLM client.
 */
export class FunctionLLM {

    /**
     * Function client.
     */
    public readonly fxn: Function;

    /**
     * LLM API URL.
     * This is a loopback URL that handles requests locally and in-process.
     */
    public readonly url: string;

    public constructor (config: FunctionLLMConfig) {
        const { provider, ...fxnConfig } = config;
        this.fxn = new Function(config);
    }
}