import { BookmarkIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function BlogCard() {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 mb-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Tari Ibaba" />
          <AvatarFallback>TI</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">Tari Ibaba</span>
        <span className="text-sm text-gray-500">in</span>
        <span className="text-sm font-medium text-primary">Coding Beauty</span>
      </div>
      <h2 className="text-xl font-bold mb-2">
        This New UI Framework Is An Absolute Game Changer🤯
      </h2>
      <p className="text-gray-600 mb-4">
        The new shadcn/ui framework completely transforms how we design and
        build modern web apps.
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>Oct 5</span>
          <span>1.2K views</span>
          <span>14 comments</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <BookmarkIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
