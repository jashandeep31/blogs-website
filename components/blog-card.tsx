import { BookmarkIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Blog } from "@prisma/client";
import Link from "next/link";
import dayjs from "dayjs";

export default function BlogCard({
  blog,
}: {
  blog: Blog & {
    author: {
      image: string | null;
      name: string | null;
    };
    category: {
      name: string;
    };
  };
}) {
  return (
    <Link
      href={`/${blog.slug}`}
      className="p-4 border rounded-lg shadow-sm block"
    >
      <div className="flex items-center space-x-2 mb-2">
        <Avatar className="w-6 h-6">
          {blog.author.image && (
            <AvatarImage src={blog.author.image} alt="Tari Ibaba" />
          )}
          <AvatarFallback>👦</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{blog.author.name}</span>
        <span className="text-sm text-gray-500">in</span>
        <span className="text-sm font-medium text-primary">
          {blog.category.name}
        </span>
      </div>
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-4">{blog.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>{dayjs(blog.createdAt).format("MMM YYYY")}</span>
          <span>{blog.views || 0} views</span>
          <span>{blog.commentsCount || 0} comments</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <BookmarkIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
