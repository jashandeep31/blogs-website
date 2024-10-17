"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavbarClient = () => {
  const { setTheme } = useTheme();
  return (
    <div className="border-b">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <h1 className="text-xl font-bold ">BlogsWeb</h1>
          <div className="hidden md:flex items-center gap-3">
            <nav>
              <Link className="text-muted-foreground  font-medium" href="/">
                Home
              </Link>
            </nav>
            <nav>
              <Link className="text-muted-foreground  font-medium" href="/">
                Categories
              </Link>
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            className={cn(buttonVariants({ variant: "secondary" }))}
            href="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarClient;
