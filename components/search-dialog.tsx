"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { Blog } from "@prisma/client";
import { getBlogsByQuery } from "@/app/actions";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { searchBoxState } from "@/states/searbox-state";
import { useClickAway, useDebounce } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";

const SearchDialog = () => {
  const pathname = usePathname();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [open, setOpen] = useRecoilState(searchBoxState);
  const [query, setQuery] = useState("");
  const debouncedSearchTerm = useDebounce(query, 300);
  const ref = useClickAway<HTMLDivElement>(() => {
    setOpen(false);
  });

  const getBlogs = useCallback(async () => {
    setBlogs(await getBlogsByQuery(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getBlogs();
    } else {
      getBlogs();
    }
  }, [getBlogs, debouncedSearchTerm]);

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

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <div>
      <Dialog open={open}>
        <DialogPortal>
          <DialogOverlay />
          <div
            ref={ref}
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]  border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
          >
            <div className=" border-b  p-2 px-3 flex items-center gap-2  border-muted">
              <Search size={16} />
              <input
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                autoFocus
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
                  className="text-muted-foreground hover:text-foreground duration-300 bg-muted block p-2 rounded-sm"
                  key={blog.id}
                >
                  {blog.title}
                </Link>
              ))}
              {blogs.length === 0 && <p>No blogs found</p>}
            </div>
          </div>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
