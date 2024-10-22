"use server";
import { catchAsync } from "@/lib/catch-async";
import { db } from "@/lib/db";
import { createCategoryValidator } from "@/validators/category.validator";

export const createCategoryAction = catchAsync(async (data) => {
  const validated = createCategoryValidator.safeParse(data);
  if (!validated.success) {
    const error = validated.error.errors[0].message;
    return {
      status: "error",
      message: error,
    };
  }
  const validatedData = validated.data;
  const category = await db.category
    .create({
      data: {
        name: validatedData.name,
        slug: validatedData.name.toLowerCase().replace(/\s/g, "-"),
      },
    })
    .catch((e) => {
      if (e.code === "P2002") {
        throw Error("Category already exist");
      }
      throw Error(e);
    });
  return {
    status: "ok",
    message: `Category ${category.name} created successfully`,
  };
});
