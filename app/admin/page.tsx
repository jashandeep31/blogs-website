import { db } from "@/lib/db";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const page = async () => {
  const blogs = await db.blog.findMany();
  return (
    <div>
      <h1 className="text-lg font-bold">Blogs</h1>
      <p className="text-sm text-muted-foreground ">
        Here are all your published and unpublished blogs.
      </p>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S.No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Likes & Views</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog, index) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">{++index}</TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.likes} </TableCell>
                <TableCell>{blog.likes} </TableCell>
                <TableCell>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/admin/edit/${blog.slug}`}
                    className={cn(buttonVariants({ variant: "secondary" }))}
                  >
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
