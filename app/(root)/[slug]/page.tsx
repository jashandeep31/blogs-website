import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

const page = async ({ params }: { params: { slug: string } }) => {
  const blog = await db.blog.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  if (!blog) return <h1>Blog not found 404</h1>;
  return (
    <div className="container md:mt-12 mt-6 max-w-2xl">
      <Link
        href={"/"}
        className="text-muted-foreground hover:text-foreground duration-300 inline-flex items-center gap-1"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </Link>
      <h1 className="md:text-2xl text-lg font-bold">{blog.title}</h1>
      <p className="text-muted-foreground text-base">{blog.description}</p>
      <img src={blog.image} className="border rounded-md mt-6 shadow-md" />
      <div className="mt-6">
        <div className="flex gap-1 items-center">
          <button>
            <Heart size={16} />
          </button>
          <span className="text-sm text-muted-foreground">{blog.likes}</span>
        </div>
      </div>
      <div
        className="mt-6 "
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
      <p className="mt-6 text-muted-foreground font-medium">
        Last Updated: {dayjs(blog.updatedAt).format("DD/MM/YYYY")}
      </p>
      <div className="mt-6 flex justify-end">
        <Link
          href=""
          className="bg-muted p-2 hover:border-primary duration-300 hover:shadow  border border-transparent rounded flex items-center gap-2"
        >
          <Avatar>
            {blog.author.image && (
              <AvatarImage className="rounded-full" src={blog.author.image} />
            )}
            <AvatarFallback>👦</AvatarFallback>
          </Avatar>
          <p className="font-bold">{blog.author.name}</p>
        </Link>
      </div>
      <div className="mt-12">
        <h3 className="text-lg font-bold">Comments</h3>
        <div className="mt-3">
          <div className="">
            <div className="px-2 py-3">
              <div className="flex items-center gap-1">
                <span>👦</span>
                <p className="font-bold">Jashandeep Singh</p>
              </div>
              <div className="text-muted-foreground pl-2 pt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                enim necessitatibus quam quos! Veritatis, molestias cupiditate
                quam cumque vel hic!
              </div>
              <div className="flex items-center justify-between mt-3 px-2">
                <p className="text-muted-foreground text-xs">12-04-2024</p>
                <Button variant={"ghost"}>View Replies(4) </Button>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
