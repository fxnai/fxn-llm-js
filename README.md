# Function LLM for JavaScript

![function logo](https://raw.githubusercontent.com/fxnai/.github/main/logo_wide.png)

[![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdiscord.com%2Fapi%2Finvites%2Fy5vwgXkz2f%3Fwith_counts%3Dtrue&query=%24.approximate_member_count&logo=discord&logoColor=white&label=Function%20community)](https://fxn.ai/community)

Use local LLMs in your browser and Node.js apps. This package is designed to patch `OpenAI` and `Anthropic` clients for running inference locally, using predictors hosted on [Function](https://fxn.ai/explore).

> [!IMPORTANT]
> This package is still a work-in-progress, and will remain in alpha until browser support is added (see #1).

> [!CAUTION]
> **Never embed access keys client-side (i.e. in the browser)**. Instead, create a proxy URL in your backend.

## Installing Function LLM
Function LLM is distributed on NPM. Open a terminal and run the following command:
```bash
npm install @fxn/llm
```

> [!IMPORTANT]
> Make sure to create an access key by signing onto [Function](https://fxn.ai/settings/developer). You'll need it to fetch the predictor at runtime.

## Using the OpenAI Client Locally
To run text generation and embedding models locally using the OpenAI client, create a `FunctionLLM` instance then pass its `baseUrl` on the OpenAI client:
```js
import { FunctionLLM } from "@fxn/llm"
import { OpenAI } from "openai"

// Create Function LLM client
const fxnllm = new FunctionLLM({
  provider: "openai",
  accessKey: "<Function access key>"
});
// Create an OpenAI client
const openai = new OpenAI({
  baseUrl: fxnllm.baseUrl,
  apiKey: "fxn"
});
```

> [!WARNING]
> Currently, only `openai.embeddings.create` is supported. Text generation is coming soon!

## Using the Anthropic Client Locally
To run text generation models locally using the Anthopic client, create a `FunctionLLM` instance then pass its `baseUrl` on the Anthropic client:
```js
import { FunctionLLM } from "@fxn/llm"
import { Anthropic } from "@anthropic-ai/sdk"

// Create Function LLM client
const fxnllm = new FunctionLLM({
  provider: "anthropic",
  accessKey: "<Function access key>"
});
// Create an Anthropic client
const anthropic = new Anthropic({
  baseUrl: fxnllm.baseUrl,
  apiKey: "fxn"
});
```

> [!CAUTION]
> Anthropic support is not functional as it is still a work-in-progress.
___

## Useful Links
- [Discover predictors to use in your apps](https://fxn.ai/explore).
- [Join our Discord community](https://fxn.ai/community).
- [Check out our docs](https://docs.fxn.ai).
- Learn more about us [on our blog](https://blog.fxn.ai).
- Reach out to us at [hi@fxn.ai](mailto:hi@fxn.ai).

Function is a product of [NatML Inc](https://github.com/natmlx).