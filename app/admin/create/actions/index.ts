"use server";
import { catchAsync } from "@/lib/catch-async";
import { db } from "@/lib/db";
import { createBlogValidator } from "@/validators/blog.validator";

export const createBlogAction = catchAsync(async (values: unknown) => {
  const validated = createBlogValidator.safeParse(values);
  if (validated.error) {
    const error = validated.error.errors[0].message;
    return {
      status: "error",
      message: error,
    };
  }

  const validatedData = validated.data;
  await db.blog.create({
    data: {
      title: validatedData.title,
      slug: validatedData.title.toLowerCase(),
      description: validatedData.description,
      image: validatedData.image,
      content: validatedData.content,
      published: validatedData.published,
      authorId: "cm2f0ygfs0000cllxbk9zit8l",
      categoryId: validatedData.categoryId,
      likes: 0,
    },
  });
  return {
    status: "ok",
    message: "Created a blog successfully",
  };
});
