import BlogCard from "@/components/blog-card";
import { db } from "@/lib/db";
import { Facebook } from "lucide-react";
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
        <div className="md:col-span-3">
          <img
            src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*aBbwzTgTDCcCA4zsmyg2NQ.png"
            className="border p-1"
            alt=""
          />
          <div className="md:mt-6 mt-3">
            <h1 className="text-3xl font-bold ">
              How to add the next Auth to Next JS.
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, dolorem! Natus amet ipsum cupiditate eum tempora
              placeat architecto, voluptatibus id dignissimos iste culpa quae
              consequuntur, sit ut. Quos, reiciendis error.
            </p>
          </div>
        </div>
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
