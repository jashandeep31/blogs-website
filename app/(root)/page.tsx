import BlogCard from "@/components/blog-card";
import { db } from "@/lib/db";
import dayjs from "dayjs";
import { Facebook } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async () => {
  const blogs = await db.blog.findMany({
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="container md:mt-12 mt-6">
      <section className="grid md:grid-cols-4 md:gap-6 gap-4">
        {blogs[0] && (
          <Link href={`/${blogs[0].slug}`} className="md:col-span-3 block">
            <img src={blogs[0].image} className="border p-1" alt="" />
            <div className="md:mt-6 mt-3">
              <h1 className="text-3xl font-bold ">{blogs[0].title}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {blogs[0].description}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <div className="flex items-center space-x-4">
                <span>{dayjs(blogs[0].createdAt).format("MMM YYYY")}</span>
                <span>{blogs[0].views || 0} views</span>
                <span>{blogs[0].commentsCount || 0} comments</span>
              </div>
            </div>
          </Link>
        )}
        <div className="hidden flex-col gap-1">
          <h2 className="text-muted-foreground font-medium ">Follow Us</h2>
          <button className="border p-2  rounded-md flex items-center gap-1 justify-center w-full">
            <Facebook size={16} />
            <span>Facebook</span>
          </button>
        </div>
      </section>
      <section className="md:mt-24 mt-6 text-muted-foreground font-medium">
        <h2 className="text-2xl">Latest blogs</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-3">
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
