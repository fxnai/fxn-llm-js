# Function LLM for JavaScript

![function logo](https://raw.githubusercontent.com/fxnai/.github/main/logo_wide.png)

[![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdiscord.com%2Fapi%2Finvites%2Fy5vwgXkz2f%3Fwith_counts%3Dtrue&query=%24.approximate_member_count&logo=discord&logoColor=white&label=Function%20community)](https://fxn.ai/community)

Use local LLMs in your browser and Node.js apps. This package is designed to patch `OpenAI` and `Anthropic` clients and run inference locally in the current process, using predictors hosted on [Function](https://fxn.ai).

> [!CAUTION]
> **Never embed access keys client-side (i.e. in the browser)**. Instead, create a proxy URL in your backend.

## Installing Function LLM
Function LLM is distributed on NPM. Open a terminal and run the following command:
```bash
npm install @fxn/llm
```

## Creating a Function LLM Instance
Function LLM works by setting up an in-process server that handles requests for an LLM API provider (e.g. OpenAI, Anthropic). The client provides a `baseUrl` property that can be passed to LLM clients in your code:
```js
import { FunctionLLM } from "@fxn/llm"

// Create Function LLM client
const fxnllm = new FunctionLLM({
  provider: "openai", // or "anthropic"
  accessKey: "<Function access key>"
});
```

> [!TIP]
> Create an access key by signing onto [Function](https://fxn.ai/settings/developer).

> [!TIP]
> If you would like to see a new LLM provider supported, please submit a PR!

## Running the OpenAI Client Locally
To run text-generation and embedding models locally using the OpenAI client, specify the `baseUrl` on the client:
```js
import OpenAI from "openai"

// Create an OpenAI client
const openai = new OpenAI({
  baseUrl: fxnllm.baseUrl,
  apiKey: "fxn"
});
```

> [!WARNING]
> Currently, only `openai.embeddings.create` is supported. Text generation is coming soon!

## Running the Anthropic Client Locally
*INCOMPLETE*

___

## Useful Links
- [Discover predictors to use in your apps](https://fxn.ai/explore).
- [Join our Discord community](https://fxn.ai/community).
- [Check out our docs](https://docs.fxn.ai).
- Learn more about us [on our blog](https://blog.fxn.ai).
- Reach out to us at [hi@fxn.ai](mailto:hi@fxn.ai).

Function is a product of [NatML Inc](https://github.com/natmlx).