import { db } from "@/lib/db";
import React from "react";
import { BlogCreateUpdateForm } from "../../components/blog-create-update-form";

const page = async ({ params }: { params: { slug: string } }) => {
  const categories = await db.category.findMany({});
  const blog = await db.blog.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!blog) return <h1 className="text-lg font-bold">Blog not found 404</h1>;

  return (
    <div>
      <h1 className="text-lg font-bold">Edit Blog</h1>
      <p className="text-sm text-muted-foreground">
        Update your blog data here.
      </p>
      <div className="mt-6">
        <BlogCreateUpdateForm blog={blog} categories={categories} />
      </div>
    </div>
  );
};

export default page;
