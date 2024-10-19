import React from "react";
import { BlogCreateUpdateForm } from "../components/BlogCreateUpdateForm";

const page = () => {
  return (
    <div>
      <h1 className="text-lg font-bold">Create Blog</h1>
      <p className="text-sm text-muted-foreground">
        Create a new blog post here.
      </p>
      <div className="mt-6">
        <BlogCreateUpdateForm />
      </div>
    </div>
  );
};

export default page;
