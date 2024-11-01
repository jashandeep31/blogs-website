import BlogCard from "@/components/blog-card";
import { db } from "@/lib/db";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { category: string | undefined };
}) => {
  const blogs = await db.blog.findMany({
    where: {
      ...(searchParams.category && {
        category: { slug: searchParams.category },
      }),
    },
    include: {
      author: {
        select: {
          image: true,
          name: true,
        },
      },
      category: true,
    },
  });

  return (
    <div className="container md:mt-12 mt-6">
      <h1 className="lg:text-xl font-bold text-lg">Blogs</h1>
      <div className="mt-6">
        <div className="grid md:grid-cols-2 gap-6 ">
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
