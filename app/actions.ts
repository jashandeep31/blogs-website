"use server";
import { db } from "@/lib/db";

export const getBlogsByQuery = async () => {
  return await db.blog.findMany();
};
