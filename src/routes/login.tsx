import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandLockup } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — ArimaRun" },
      { name: "description", content: "Sign in to your ArimaRun AI workspace." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative flex-col justify-between p-10 bg-primary text-primary-foreground overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, oklch(0.78 0.17 165 / 0.4), transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.4 0.15 260 / 0.5), transparent 50%)",
          }}
        />
        <div className="relative z-10">
          <BrandLockup />
        </div>
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            One-click AI workspaces, production ready.
          </h2>
          <p className="text-primary-foreground/70 max-w-md">
            Spin up Kubernetes-backed dev environments, monitor pods, and ship
            with your team — all from a single console.
          </p>
        </div>
        <div className="relative z-10 text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} ArimaRun. All rights reserved.
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between items-center p-6">
          <div className="lg:hidden"><BrandLockup /></div>
          <div className="ml-auto"><ThemeToggle /></div>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <Card className="w-full max-w-md border-border/60 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>Enter your credentials to access your workspace.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/register" className="text-xs text-muted-foreground hover:text-foreground">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign in
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-foreground underline-offset-4 hover:underline">
                  Create one
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
