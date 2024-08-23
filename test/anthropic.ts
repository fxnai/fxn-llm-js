/*
*   Function
*   Copyright © 2024 NatML Inc. All Rights Reserved.
*/

import { expect, should, use } from "chai"
import chaiAsPromised from "chai-as-promised"
import { Anthropic } from "@anthropic-ai/sdk"
import mocha from "@testdeck/mocha"
import { locally, LocallyConfig } from "../src"

@mocha.suite("Anthropic")
class AnthropicTest {

    private anthropic: Anthropic;

    public before () {
        should();
        use(chaiAsPromised);
        const anthropic = new Anthropic({ apiKey: "fxn" });
        this.anthropic = locally(
            anthropic,
            { provider: "anthropic", accessKey: process.env.FXN_ACCESS_KEY }
        );
    }
}