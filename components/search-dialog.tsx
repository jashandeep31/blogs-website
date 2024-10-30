"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { Blog } from "@prisma/client";
import { getBlogsByQuery } from "@/app/actions";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { searchBoxState } from "@/states/searbox-state";

const SearchDialog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [open, setOpen] = useRecoilState(searchBoxState);
  useEffect(() => {
    (async () => {
      setBlogs(await getBlogsByQuery());
    })();
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen, open]);

  return (
    <div>
      <Dialog open={open}>
        <DialogPortal>
          <DialogOverlay />
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]  border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
            <div className=" border-b  p-2 px-3 flex items-center gap-2  border-muted">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search..."
                className=" bg-background w-full p-1 outline-none"
              />
              <button
                onClick={() => {
                  setOpen(false);
                }}
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-3">
              {blogs.map((blog) => (
                <Link
                  href={`/${blog.slug}`}
                  className="text-muted-foreground hover:text-foreground duration-300"
                  key={blog.id}
                >
                  {blog.title}
                </Link>
              ))}
            </div>
          </div>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
