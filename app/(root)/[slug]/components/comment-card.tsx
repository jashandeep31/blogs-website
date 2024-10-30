import { Button } from "@/components/ui/button";
import { Comment } from "@prisma/client";
import dayjs from "dayjs";
import React from "react";

const CommentCard = ({
  comment,
}: {
  comment: Comment & {
    user: {
      name: string | null;
    };
  };
}) => {
  return (
    <div className="">
      <div className="px-2 py-3">
        <div className="flex items-center gap-1">
          <span>👦</span>
          <p className="font-bold">{comment.user.name}</p>
        </div>
        <div className="text-muted-foreground pl-2 pt-1">{comment.content}</div>
        <div className="flex items-center justify-between mt-3 px-2">
          <p className="text-muted-foreground text-xs">
            {dayjs(comment.createdAt).format("MMM YYYY")}
          </p>
          <Button variant={"ghost"}>View Replies(4) </Button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CommentCard;
