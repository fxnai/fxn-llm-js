# Function LLM for JavaScript

https://github.com/user-attachments/assets/86ae6012-264e-437f-9ab8-94408f4105ba

[![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdiscord.com%2Fapi%2Finvites%2Fy5vwgXkz2f%3Fwith_counts%3Dtrue&query=%24.approximate_member_count&logo=discord&logoColor=white&label=Function%20community)](https://fxn.ai/community)
[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/fxnai)](https://twitter.com/fxnai)

Use local LLMs in your browser and Node.js apps. This package is designed to patch `OpenAI` and `Anthropic` clients for running inference locally, using predictors hosted on [Function](https://fxn.ai/explore).

> [!TIP]
> We offer a similar package for use in Python. Check out [fxn-llm](https://github.com/fxnai/fxn-llm).

> [!IMPORTANT]
> This package is still a work-in-progress, so the API could change drastically between **all** releases.

> [!CAUTION]
> **Never embed access keys client-side (i.e. in the browser)**. Instead, [create a proxy URL](https://docs.fxn.ai/insiders/keys#in-the-browser) in your backend.

## Installing Function LLM
Function LLM is distributed on NPM. Open a terminal and run the following command:
```bash
# Run this in Terminal
$ npm install fxn-llm
```

> [!IMPORTANT]
> Make sure to create an access key by signing onto [Function](https://fxn.ai/settings/developer). You'll need it to fetch the predictor at runtime.

## Using the OpenAI Client Locally
To run text generation and embedding models locally using the OpenAI client, patch your `OpenAI` instance with the `locally` function:
```ts
import { locally } from "fxn-llm"
import { OpenAI } from "openai"

// 💥 Create your OpenAI client
let openai = new OpenAI({ apiKey: "fxn", dangerouslyAllowBrowser: true });

// 🔥 Make it local
openai = locally(openai, {
  accessKey: process.env.NEXT_PUBLIC_FXN_ACCESS_KEY
});

// 🚀 Generate embeddings
const embeddings = openai.embeddings.create({
  model: "@nomic/nomic-embed-text-v1.5-quant",
  input: "search_query: Hello world!"
});
```

> [!WARNING]
> Currently, only `openai.embeddings.create` is supported. Text generation is coming soon!

___

## Useful Links
- [Discover predictors to use in your apps](https://fxn.ai/explore).
- [Join our Discord community](https://fxn.ai/community).
- [Check out our docs](https://docs.fxn.ai).
- Learn more about us [on our blog](https://blog.fxn.ai).
- Reach out to us at [hi@fxn.ai](mailto:hi@fxn.ai).

Function is a product of [NatML Inc](https://github.com/natmlx).