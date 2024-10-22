import { db } from "@/lib/db";
import React from "react";
import CreateCategoryForm from "./components/create-category-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@prisma/client";

const page = async () => {
  const categories = await db.category.findMany();
  console.log(categories);

  return (
    <div className="h-full ">
      <h1 className="text-lg font-bold">Manage Categories</h1>
      <p className="text-sm text-muted-foreground ">
        Manage and create new categories for you blog.
      </p>

      <div className="mt-6">
        <CreateCategoryForm />
      </div>
      <div className="mt-6">
        <CategoriesRenderer categories={categories} />
      </div>
    </div>
  );
};

const CategoriesRenderer = ({ categories }: { categories: Category[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">S.no</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, index) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>
              {new Date(category.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <span className="text-xs bg-muted p-1">coming soon</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default page;
