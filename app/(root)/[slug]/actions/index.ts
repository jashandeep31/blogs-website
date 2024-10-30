"use server";

import { auth } from "@/lib/auth";
import { catchAsync } from "@/lib/catch-async";
import { db } from "@/lib/db";
import * as z from "zod";

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
  await db.comment.create({
    data: {
      content: validatedData.comment,
      userId: session.user.id,
      blogId: validatedData.id,
    },
  });
  return {
    status: "ok",
    message: "we are fine",
  };
});
