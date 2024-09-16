/*
*   Function
*   Copyright © 2024 NatML Inc. All Rights Reserved.
*/

import { expect, should, use } from "chai"
import chaiAsPromised from "chai-as-promised"
import { OpenAI } from "openai"
import mocha from "@testdeck/mocha"
import { locally, LocallyConfig } from "../src"

@mocha.suite("OpenAI")
class OpenAITest {

    private openai: OpenAI;

    public before () {
        should();
        use(chaiAsPromised);
        const openai = new OpenAI({ apiKey: "fxn" });
        this.openai = locally(openai, { accessKey: process.env.FXN_ACCESS_KEY });
    }

    @mocha.test
    async "Should create an embedding" () {
        const tag = "@nomic/nomic-embed-text-v1.5-quant"
        const embedding = await this.openai.embeddings.create({
            model: tag,
            input: "search_query: What is the capital of France?"
        });
        expect(embedding.model).to.eql(tag);
        expect(embedding.object).to.eql("list");
        expect(embedding.data).to.not.be.empty;
        expect(embedding.usage.prompt_tokens).to.eql(0);
        expect(embedding.usage.total_tokens).to.eql(0);
    }
}