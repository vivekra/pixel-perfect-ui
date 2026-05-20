// Netlify target: we disable the Cloudflare adapter from the Lovable preset
// and ask TanStack Start to emit a Netlify-compatible build (Netlify Functions
// + static assets). Lovable's in-editor preview keeps working because the
// preset's dev plugins are untouched.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    target: "netlify",
  },
});
