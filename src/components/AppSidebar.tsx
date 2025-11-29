import { Calendar, Clock, Folder, Mail, Pencil, AlarmClock, Bell, PlusIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Button items.
const buttons = [
  {
    key: 0,
    url: "/",
    icon: AlarmClock,
  },
  {
    key: 1,
    url: "/",
    icon: Bell,
  },
  {
    key: 2,
    url: "/boards/new",
    icon: PlusIcon,
  },
]

// Menu items.
const items = [
  {
    title: "Projects",
    url: "/",
    icon: Folder,
  },
  {
    title: "My Task",
    url: "/my-task",
    icon: Pencil,
  },
  {
    title: "Calender",
    url: "/calender",
    icon: Calendar,
  },
  {
    title: "Timesheet",
    url: "/timesheet",
    icon: Clock,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: Mail,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-slate-800 border-gray-500">
      <SidebarContent>
        <SidebarGroup className="">
          <SidebarGroupContent>
            <SidebarGroupLabel className="text-xl font-bold tracking-wider text-white my-4">Time Manager SEA</SidebarGroupLabel>
            <SidebarMenu className="flex flex-row justify-center items-center gap-3 px-2">
              {buttons.map((button) => (
                <SidebarMenuItem key={button.key}>
                  <SidebarMenuButton className="py-6 px-2" asChild>
                    <a href={button.url}>
                      <button.icon className="size-64 mx-2" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3 px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="py-6 px-2" asChild>
                    <a href={item.url}>
                      <item.icon className="size-64 mx-2" />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}