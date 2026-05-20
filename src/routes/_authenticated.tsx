import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, FileText, Plus, Search, Sparkles, LayoutTemplate, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  const initial = (user?.email ?? "U").charAt(0).toUpperCase();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-20">
            <div className="h-full flex items-center gap-3 px-4">
              <SidebarTrigger />
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search anything in your workspace..."
                  className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background"
                />
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> New
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <LayoutTemplate className="h-4 w-4" /> Templates
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4 text-accent" /> AI Assistant
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <FileText className="h-4 w-4" /> Docs
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <ThemeToggle />
                {ready && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2 pl-2 pr-3">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {initial}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left leading-tight hidden md:block">
                          <div className="text-xs font-semibold">{user?.email?.split("@")[0] ?? "User"}</div>
                          <div className="text-[10px] text-muted-foreground">Admin</div>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </header>
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
