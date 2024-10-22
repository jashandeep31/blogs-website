import { db } from "@/lib/db";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const blog = await db.blog.findUnique({
    where: {
      slug: params.slug,
    },
  });
  if (!blog) return <h1>Blog not found 404</h1>;
  return (
    <div className="container md:mt-12 mt-6 max-w-2xl">
      <h1 className="md:text-2xl text-lg font-bold">{blog.title}</h1>
      <p className="text-muted-foreground text-base">{blog.description}</p>
      <img src={blog.image} className="border rounded-md mt-6" />
      <div
        className="mt-6 "
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default page;
