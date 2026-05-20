import { Button } from "@/components/ui/button";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.66 4.1-5.5 4.1-3.3 0-6-2.74-6-6.1s2.7-6.1 6-6.1c1.88 0 3.14.8 3.86 1.48l2.63-2.53C16.84 3.4 14.66 2.4 12 2.4 6.86 2.4 2.7 6.56 2.7 11.7s4.16 9.3 9.3 9.3c5.36 0 8.92-3.77 8.92-9.07 0-.61-.07-1.08-.16-1.55H12z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.46 2.23-1.21 3.02-.79.85-2.07 1.52-3.13 1.43-.13-1.12.42-2.29 1.15-3.04.81-.84 2.18-1.46 3.19-1.41zM20.5 17.27c-.55 1.26-.82 1.82-1.53 2.93-.99 1.55-2.39 3.47-4.12 3.49-1.54.02-1.94-1-4.03-.99-2.09.01-2.53 1-4.07.98-1.73-.02-3.05-1.76-4.04-3.3C-.04 15.96-.34 10.66 1.74 7.7c1.46-2.06 3.76-3.27 5.93-3.27 2.2 0 3.59 1.21 5.42 1.21 1.78 0 2.86-1.21 5.42-1.21 1.93 0 3.98 1.05 5.44 2.87-4.78 2.62-4 9.43-3.45 9.97z"/>
    </svg>
  );
}

export function SocialAuthButtons() {
  const [loading, setLoading] = useState<string | null>(null);

  const signIn = async (provider: "google" | "apple") => {
    setLoading(provider);
    try {
      const result = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(result.error.message ?? "Sign-in failed");
        setLoading(null);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Sign-in failed");
      setLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => signIn("google")}
          disabled={loading !== null}
        >
          {loading === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => signIn("apple")}
          disabled={loading !== null}
        >
          {loading === "apple" ? <Loader2 className="h-4 w-4 animate-spin" /> : <AppleIcon />}
          Apple
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>
    </div>
  );
}
