import React from "react";
import { BlogCreateUpdateForm } from "../components/blog-create-update-form";
import { db } from "@/lib/db";

const page = async () => {
  const categories = await db.category.findMany({});
  return (
    <div>
      <h1 className="text-lg font-bold">Create Blog</h1>
      <p className="text-sm text-muted-foreground">
        Create a new blog post here.
      </p>
      <div className="mt-6">
        <BlogCreateUpdateForm categories={categories} />
      </div>
    </div>
  );
};

export default page;
