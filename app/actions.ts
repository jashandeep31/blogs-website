"use server";
import { db } from "@/lib/db";

export const getBlogsByQuery = async (query: string) => {
  return await db.blog.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },

    take: 5,
  });
};
