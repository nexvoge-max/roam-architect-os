import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

interface SitemapEntry { path: string; changefreq?: string; priority?: string }

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/login", changefreq: "monthly", priority: "0.4" },
          { path: "/signup", changefreq: "monthly", priority: "0.6" },
          { path: "/app", changefreq: "daily", priority: "0.9" },
          { path: "/app/plan", changefreq: "daily", priority: "0.8" },
          { path: "/app/maps", changefreq: "daily", priority: "0.7" },
          { path: "/app/trips", changefreq: "daily", priority: "0.7" },
          { path: "/app/community", changefreq: "daily", priority: "0.7" },
          { path: "/app/finance", changefreq: "weekly", priority: "0.6" },
          { path: "/app/backpack", changefreq: "weekly", priority: "0.6" },
          { path: "/app/hotels", changefreq: "weekly", priority: "0.6" },
          { path: "/app/flights", changefreq: "weekly", priority: "0.6" },
          { path: "/app/transport", changefreq: "weekly", priority: "0.5" },
          { path: "/app/news", changefreq: "daily", priority: "0.5" },
          { path: "/app/settings", changefreq: "monthly", priority: "0.3" },
        ];
        const urls = entries.map((e) => `  <url><loc>${BASE_URL}${e.path}</loc>${e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : ""}${e.priority ? `<priority>${e.priority}</priority>` : ""}</url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
