import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./components/app-bar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="md:p-4 grid  w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
