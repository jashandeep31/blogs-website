import { FileUser, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

// Menu items.
const sideBarItems = [
  {
    name: "Blogs Actions",
    links: [
      {
        title: "Blogs",
        url: "/admin",
        icon: FileUser,
      },
      {
        title: "Create Blog",
        url: "/admin/create",
        icon: Plus,
      },
    ],
  },
  {
    name: "User Actions",
    links: [
      {
        title: "Manage Managers",
        url: "/admin/managers",
        icon: FileUser,
      },
    ],
  },
] as const;

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        {sideBarItems.map((mainItem, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{mainItem.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItem.links.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarSeparator />
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
