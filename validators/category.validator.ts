import * as z from "zod";

export const createCategoryValidator = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name should have minimum length category should be 3")
    .max(30, "Name should have maximum length category should be 30"),
});
