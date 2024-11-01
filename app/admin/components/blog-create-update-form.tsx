"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBlogValidator } from "@/validators/blog.validator";
import { Blog, Category } from "@prisma/client";
import CKEditorComponent from "../create/components/ck-editor";
import { toast } from "sonner";
import { createBlogAction, updateBlogAction } from "../create/actions";

const formSchema = createBlogValidator;
const BlogCreateUpdateForm = ({
  categories,
  blog,
}: {
  categories: Category[];
  blog?: Blog;
}) => {
  const [contentValue, setContentValue] = useState(blog ? blog.content : "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      blog && createBlogValidator.safeParse(blog).data
        ? createBlogValidator.safeParse(blog).data
        : {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const id = toast.loading("Creating..");
    const res = blog
      ? await updateBlogAction(values, blog.slug)
      : await createBlogAction(values);
    if (res.status === "ok") {
      toast.success(res.message, { id });
    } else {
      toast.error(res.message, { id });
    }
  }

  useEffect(() => {
    if (form.getValues().content !== contentValue) {
      form.setValue("content", contentValue);
    }
  }, [contentValue, form]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-6 grid md:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="How add next auth to Next JS"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Next JS" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="How add next auth to Next JS"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description </FormLabel>
                <FormControl>
                  <Input
                    placeholder="How add next auth to Next JS  (write a short description of 100)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A short description of the blog post. This will be displayed
                  on the blog post card and in the meta description.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem className="md:col-span-2 ">
            <FormLabel>Content</FormLabel>
            <CKEditorComponent
              value={contentValue}
              setValue={setContentValue}
            />
            {form.formState.errors.content && (
              <FormMessage>{form.formState.errors.content.message}</FormMessage>
            )}
          </FormItem>
          <div className="items-top flex space-x-2 border p-1 border-red-300">
            <Checkbox checked id="terms1" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Publish the Blog
              </label>
              <p className="text-sm text-muted-foreground">
                By checking the checkbox your blog will get public.
              </p>
            </div>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {blog ? "Update blog " : "Create blog post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BlogCreateUpdateForm;
