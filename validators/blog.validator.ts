import { z } from "zod";

export const createBlogValidator = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(5, { message: "Tile should be minimum of 5 char" })
    .max(255, { message: "Title must be 255 characters or less" }),

  description: z
    .string({ description: "Description is required for SEO" })
    .min(10, { message: "Description should have minimum of 10" })
    .max(100, { message: "Description must be 100 characters or less" }),

  image: z
    .string()
    .url({ message: "Invalid image URL" })
    .min(1, { message: "Image URL is required" }),

  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, { message: "Content is required" }),

  published: z.boolean(),

  categoryId: z
    .string()
    .cuid({ message: "Invalid category ID format" })
    .min(1, { message: "Category ID is required" }),
});
