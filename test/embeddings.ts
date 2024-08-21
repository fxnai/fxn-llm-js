/*
*   Function
*   Copyright © 2024 NatML Inc. All Rights Reserved.
*/

import { expect, should, use } from "chai"
import chaiAsPromised from "chai-as-promised"
import { OpenAI } from "openai"
import mocha from "@testdeck/mocha"
import { FunctionLLM } from "../src"

@mocha.suite("Embeddings")
class EmbeddingsTest {

    private fxnllm: FunctionLLM;
    private openai: OpenAI;

    public before () {
        should();
        use(chaiAsPromised);
        this.fxnllm = new FunctionLLM({
            provider: "openai",
            accessKey: process.env.FXN_ACCESS_KEY,
            url: process.env.FXN_API_URL
        });
        this.openai = new OpenAI({
            baseURL: this.fxnllm.baseUrl,
            apiKey: "fxn"
        });
    }

    public after () {
        this.fxnllm[Symbol.dispose]();
    }

    @mocha.test
    async "Should create an OpenAI embedding" () {
        const tag = "@yusuf/nomic-embed-text-v1-5-quant"
        const embeddings = await this.openai.embeddings.create({
            model: tag,
            input: "search_query: What is the capital of France?"
        });
        expect(embeddings.model).to.eql(tag);
        expect(embeddings.object).to.eql("list");
        expect(embeddings.data).to.not.be.empty;
        expect(embeddings.usage.prompt_tokens).to.eql(0);
        expect(embeddings.usage.total_tokens).to.eql(0);
    }
}