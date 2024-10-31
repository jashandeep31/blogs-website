"use server";

import { auth } from "@/lib/auth";
import { catchAsync } from "@/lib/catch-async";
import { db } from "@/lib/db";
import * as z from "zod";

export const getLikeStatus = async (id: string): Promise<boolean> => {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return false;
  }
  const isLiked = await db.like.findFirst({
    where: {
      blogId: id,
      userId: session.user.id,
    },
  });

  if (isLiked) {
    return true;
  }
  return false;
};

export const likeHandler = catchAsync(async (values: unknown) => {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return {
      status: "error",
      message: "Authentication failed",
    };
  }
  const validated = z
    .object({
      id: z.string(),
      status: z.boolean(),
    })
    .safeParse(values);
  if (validated.error) {
    const error = validated.error.errors[0].message;
    return {
      status: "error",
      message: error,
    };
  }

  const validatedData = validated.data;
  if (!validatedData.status) {
    await db.$transaction(async (tx) => {
      const likedList = await tx.like.deleteMany({
        where: {
          userId: session.user.id,
          blogId: validatedData.id,
        },
      });
      await tx.blog.update({
        where: {
          id: validatedData.id,
        },
        data: {
          likes: {
            decrement: likedList.count,
          },
        },
      });
    });
    return {
      status: "ok",
      message: "Removed from the liked blogs",
    };
  }
  await db.$transaction(async (tx) => {
    if (!session?.user || !session.user.id) return;
    await tx.like.create({
      data: {
        blogId: validatedData.id,
        userId: session.user.id,
      },
    });
    await tx.blog.update({
      where: {
        id: validatedData.id,
      },
      data: {
        likes: { increment: 1 },
      },
    });
  });
  return {
    status: "ok",
    message: "Added to liked blogs",
  };
});

export const createComment = catchAsync(async (values: unknown) => {
  const session = await auth();
  if (!session?.user || !session.user.id) {
    return {
      status: "error",
      message: "Authentication failed",
    };
  }
  const validated = z
    .object({
      comment: z
        .string()
        .min(10, { message: "Min of length of 10" })
        .max(200, { message: "max of length of 200" }),
      id: z.string(),
    })
    .safeParse(values);

  if (validated.error) {
    const error = validated.error.errors[0].message;
    return {
      status: "error",
      message: error,
    };
  }

  const validatedData = validated.data;
  await db.$transaction(async (tx) => {
    if (!session?.user || !session.user.id) return;
    await tx.comment.create({
      data: {
        content: validatedData.comment,
        userId: session.user.id,
        blogId: validatedData.id,
      },
    });
    await tx.blog.update({
      where: {
        id: validatedData.id,
      },
      data: {
        commentsCount: {
          increment: 1,
        },
      },
    });
  });
  return {
    status: "ok",
    message: "we are fine",
  };
});
