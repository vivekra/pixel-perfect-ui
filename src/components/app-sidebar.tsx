import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Boxes,
  LayoutTemplate,
  Globe,
  Image as ImageIcon,
  HardDrive,
  KeyRound,
  Users,
  Share2,
  Activity,
  History,
  Sparkles,
  Terminal,
  Code2,
  LineChart,
  FileText,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { BrandLockup, BrandMark } from "./brand";
import { Button } from "@/components/ui/button";

const main = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Workspaces", url: "/dashboard/workspaces", icon: Boxes },
  { title: "Templates", url: "/dashboard/templates", icon: LayoutTemplate },
  { title: "Environments", url: "/dashboard/environments", icon: Globe },
  { title: "Images", url: "/dashboard/images", icon: ImageIcon },
  { title: "Volumes", url: "/dashboard/volumes", icon: HardDrive },
  { title: "Secrets", url: "/dashboard/secrets", icon: KeyRound },
];

const collab = [
  { title: "Team", url: "/dashboard/team", icon: Users },
  { title: "Shared Workspaces", url: "/dashboard/shared", icon: Share2 },
  { title: "Activity", url: "/dashboard/activity", icon: Activity },
  { title: "Sessions", url: "/dashboard/sessions", icon: History },
];

const tools = [
  { title: "AI Assistant", url: "/dashboard/ai", icon: Sparkles },
  { title: "Terminal", url: "/dashboard/terminal", icon: Terminal },
  { title: "IDE (VS Code)", url: "/dashboard/ide", icon: Code2 },
  { title: "Monitoring", url: "/dashboard/monitoring", icon: LineChart },
  { title: "Logs", url: "/dashboard/logs", icon: FileText },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => path === url;

  const renderGroup = (label: string, items: typeof main) => (
    <SidebarGroup>
      {!collapsed && (
        <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive(item.url)}>
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="text-sm">{item.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        {collapsed ? <BrandMark className="h-7 w-7 mx-auto" /> : <BrandLockup />}
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("Main", main)}
        {renderGroup("Collaboration", collab)}
        {renderGroup("Tools", tools)}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        {!collapsed && (
          <div className="rounded-lg bg-sidebar-accent p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Current Plan
            </div>
            <div className="mt-0.5 text-sm font-semibold">Team Pro</div>
            <Button size="sm" variant="outline" className="mt-2 w-full">
              Upgrade
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
