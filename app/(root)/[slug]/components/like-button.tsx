"use client";
import { Blog } from "@prisma/client";
import { Heart } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { getLikeStatus, likeHandler } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// ! high refactorization is needed in this page as getting likes and updating the count is not a proper way
const LikeButton = ({ blog }: { blog: Blog }) => {
  const router = useRouter();
  const [liked, setLiked] = useState<boolean | "loading">("loading");

  const getLikeStatusFn = useCallback(async () => {
    setLiked(await getLikeStatus(blog.id));
  }, [blog.id]);
  useEffect(() => {
    getLikeStatusFn();
  }, [blog.id, getLikeStatusFn]);

  const handleAction = async () => {
    const id = toast.loading("Adding to liked list");
    const res = await likeHandler({ id: blog.id, status: !liked });
    if (res.status === "ok") {
      router.refresh();
      getLikeStatusFn();
      toast.success(res.message, { id });
    } else {
      toast.error(res.message, { id });
    }
  };
  return (
    <div>
      <button
        disabled={liked === "loading"}
        onClick={handleAction}
        className="inline-flex items-center gap-1"
      >
        <Heart
          className={`${liked === true ? "text-red-500 fill-red-500" : ""}`}
          size={16}
        />
        <span className="text-sm text-muted-foreground">
          {blog.likes} Likes
        </span>
      </button>
    </div>
  );
};

export default LikeButton;
