# Document Retrieval in the Browser Demo
This is a very basic document retrieval demo. We patch the `OpenAI` client to generate embeddings `locally` using Function LLM. Users can then upload a plain `.txt` file and retrieve relevant information based on a search query.

https://github.com/user-attachments/assets/86ae6012-264e-437f-9ab8-94408f4105ba

## Setup Instructions
In a few steps:

1. Duplicate the `.env.example` file and name it `.env.local`.
2. Get an access key from [fxn.ai](https://fxn.ai/settings/developer) and add it to your `.env.local` file:
    ```bash
    # Function
    FXN_ACCESS_KEY="fxn_..."
    ```
3. Start the development server by running the following in Terminal:
    ```bash
    # Start the development server
    $ npm run dev
    ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to use the app.

## How It Works
This demo covers the retrieval step when building a retrieval augmented generation (RAG) pipeline.
Here's how it works:

<details>
  <summary>1. Chunking the Document</summary>

  ### Chunking the Document
  When the user uploads a document, we break it into chunks of text. Each chunk will form the smallest unit 
  of knowledge that the AI model can help us retrieve. We split the document into chunks by punctuation 
  (periods and question marks):

  ```js
  // When a document is uploaded, we chunk it up
  const chunks = splitDocument({ document });
  setChunks(chunks);
  ```

  > In production systems, you might opt for using advanced chunking algorithms from LLM libraries
  > like Langchain or LlamaIndex.
</details>

<details>
  <summary>2. Building a Vector Database</summary>

  ### Building a Vector Database
  When the user enters their first query, we check whether our vector database has been created. In our case, our 
  vector database is simply an array of OpenAI embeddings, each mapping to a chunk of the uploaded document from the 
  previous step:

  ```js
  // When a prompt is entered, we make sure we've populated our vector database
  if (!database) {
    const documentEmbedding = await openai.embeddings.create({
      model: "@nomic/nomic-embed-text-v1.5-quant",
      input: chunks.map(chunk => `search_document: ${chunk}`)
    });
    database = documentEmbedding.data;
  }
  ```

  > In production systems, you might opt for using a hosted vector database like Weaviate or MongoDB.
</details>

<details>
  <summary>3. Retrieving a Document</summary>

  ### Retrieving a Document
  When the user enters a query, we generate an embedding from their text then find the closest embedding in our 
  vector database. The closest embedding will correspond to a chunk of the uploaded document.

  ```js
  // When the user enters a query, we first embed it...
  const { data: [queryEmbedding] } = await openai.embeddings.create({
    model: "@nomic/nomic-embed-text-v1.5-quant",
    input: `search_query: ${query}`
  });

  // Then we find the closest match in our vector database
  const resultChunkEmbedding = findClosestEmbedding({ query: queryEmbedding, database });
  const resultChunk = chunks[resultChunkEmbedding.index];
  ```
</details>

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
