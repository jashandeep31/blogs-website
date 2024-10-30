import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Heart } from "lucide-react";
import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import CreateCommentForm from "./components/create-comment-form";
import { auth } from "@/lib/auth";
import CommentCard from "./components/comment-card";

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
      Comment: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  const session = await auth();
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
          {session?.user && <CreateCommentForm id={blog.id} />}
        </div>

        <div className="mt-3">
          {blog.Comment.map((comment) => (
            <CommentCard comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
