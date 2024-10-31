"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import * as z from "zod";
import { createComment } from "../actions";
const formSchema = z.object({
  comment: z
    .string()
    .min(10, { message: "Min of length of 10" })
    .max(200, { message: "max of length of 200" }),
});

const CreateCommentForm = ({ id }: { id: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Creating comment...");

    const res = await createComment({
      ...values,
      id,
    });
    if (res.status === "ok") {
      toast.success(res.message, { id: toastId });
      form.setValue("comment", "");
    } else {
      toast.error(res.message, { id: toastId });
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit">Create Comment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateCommentForm;
