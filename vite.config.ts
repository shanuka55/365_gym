import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  define: {
    "import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY": JSON.stringify(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""),
    "import.meta.env.NEXT_PUBLIC_EMBEDDED_CHECKOUT_ENABLED": JSON.stringify(env.NEXT_PUBLIC_EMBEDDED_CHECKOUT_ENABLED || "false"),
  },
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          ui: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],
          supabase: ["@supabase/supabase-js"],
          i18n: ["i18next", "i18next-browser-languagedetector", "react-i18next"],
          carousel: ["embla-carousel-react"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  });
});
