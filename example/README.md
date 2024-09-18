# Document Retrieval in the Browser Demo
This is a very basic document retrieval demo. We patch the `OpenAI` client to generate embeddings `locally` using Function LLM. Users can then upload a plain `.txt` file and retrieve relevant information based on a search query.

https://github.com/user-attachments/assets/86ae6012-264e-437f-9ab8-94408f4105ba

> [!CAUTION]
> You must take [additional steps](https://docs.fxn.ai/insiders/keys#in-the-browser) to secure your Function access key before deploying this sample into production.

## Setup Instructions
In a few steps:

1. Duplicate the `.env.example` file and name it `.env.local`.
2. Get an access key from [fxn.ai](https://fxn.ai/settings/developer) and add it to your `.env.local` file:
    ```bash
    # Function
    NEXT_PUBLIC_FXN_ACCESS_KEY="fxn_..."
    ```
3. Start the development server by running the following in Terminal:
    ```bash
    # Start the development server
    $ npm run dev
    ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

___

## Useful Links
- [Discover predictors to use in your apps](https://fxn.ai/explore).
- [Join our Discord community](https://fxn.ai/community).
- [Check out our docs](https://docs.fxn.ai).
- Learn more about us [on our blog](https://blog.fxn.ai).
- Reach out to us at [hi@fxn.ai](mailto:hi@fxn.ai).

## Credits
- [Custom Document Semantic Search with OpenAI, Pinecone, LangChain, NextJS](https://github.com/dbabbs/semantic-search-openai-nextjs-sample/tree/master) by Dylan Babbs.
- [v0 by Vercel](https://v0.dev) for UI scaffolding.
