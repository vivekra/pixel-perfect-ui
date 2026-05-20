import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandLockup } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocialAuthButtons } from "@/components/social-auth-buttons";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "Create account — ArimaRun" },
      { name: "description", content: "Create your ArimaRun AI workspace account." },
    ],
  }),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const redirectTo = typeof window !== "undefined" ? window.location.origin : undefined;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
        data: { full_name: name },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created. Check your email to confirm.");
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative flex-col justify-between p-10 bg-primary text-primary-foreground overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, oklch(0.78 0.17 165 / 0.45), transparent 50%), radial-gradient(circle at 20% 80%, oklch(0.4 0.15 260 / 0.5), transparent 50%)",
          }}
        />
        <div className="relative z-10">
          <BrandLockup />
        </div>
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Start building in minutes.
          </h2>
          <ul className="space-y-2 text-primary-foreground/80 text-sm">
            <li>• Pre-configured Kubernetes templates</li>
            <li>• Built-in VS Code & terminal</li>
            <li>• AI assistant for infra & code</li>
            <li>• Team collaboration out of the box</li>
          </ul>
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
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>Get a workspace running in under a minute.</CardDescription>
            </CardHeader>
            <CardContent>
              <SocialAuthButtons />
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work email</Label>
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
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create account
                </Button>
              </form>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
