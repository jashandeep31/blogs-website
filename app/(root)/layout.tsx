import Navbar from "@/components/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <header className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-3 border-t mt-12 md:mt-24">
        <p className="container text-muted-foreground ">@jashandeep31</p>
      </footer>
    </div>
  );
};

export default layout;
