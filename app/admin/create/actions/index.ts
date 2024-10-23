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

export const updateBlogAction = catchAsync(
  async (values: unknown, slug: string) => {
    if (!slug)
      return {
        status: "error",
        message: "Slug is required",
      };

    const validated = createBlogValidator.safeParse(values);
    if (validated.error)
      return {
        status: "error",
        message: validated.error.errors[0].message,
      };

    const validatedData = validated.data;
    await db.blog.update({
      where: {
        slug: slug,
      },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        image: validatedData.image,
        content: validatedData.content,
        published: validatedData.published,
        authorId: "cm2f0ygfs0000cllxbk9zit8l",
        categoryId: validatedData.categoryId,
      },
    });
    return {
      status: "ok",
      message: "Blog updated is success",
    };
  }
);
