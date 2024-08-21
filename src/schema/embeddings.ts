/*
*   Function
*   Copyright © 2024 NatML Inc. All Rights Reserved.
*/

import { z } from "zod"

const ENCODING_FORMATS = z.enum(["float", "base64"]);
export type EncodingFormat = z.infer<typeof ENCODING_FORMATS>;

export const CREATE_EMBEDDINGS_SCHEMA = z.object({
    input: z.union([
        z.string().min(1, "Input cannot be an empty string"),
        z.array(z.string().min(1))
            .min(1, "Input array cannot be empty")
            .max(2048, "Input array length must be 2048 or less")
    ]),
    model: z.string().min(1, "Model ID must be a non-empty string"),
    encoding_format: ENCODING_FORMATS.default("float"),
    dimensions: z.number().int().positive().optional(),
});