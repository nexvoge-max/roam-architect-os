import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong rounded-3xl px-10 py-12 text-center max-w-md">
        <h1 className="text-7xl font-black text-gradient-emerald">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Off the map</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This route doesn't exist in your Trailvia journey.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong rounded-3xl px-10 py-12 text-center max-w-md">
        <h1 className="text-xl font-semibold">Something went off route</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Try again, or head back to base camp.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            Try again
          </button>
          <a href="/" className="rounded-2xl glass px-5 py-2.5 text-sm font-semibold hover:bg-white/5 transition">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Trailvia — Your AI Travel Operating System" },
      { name: "description", content: "Trailvia unifies discovery, planning, booking, finance, packing, navigation, community, and memories into one intelligent, AI-first travel companion." },
      { name: "author", content: "Trailvia" },
      { name: "theme-color", content: "#0b1226" },
      { property: "og:title", content: "Trailvia — Your AI Travel Operating System" },
      { property: "og:description", content: "Trailvia unifies discovery, planning, booking, finance, packing, navigation, community, and memories into one intelligent, AI-first travel companion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Trailvia" },
      { name: "twitter:title", content: "Trailvia — Your AI Travel Operating System" },
      { name: "twitter:description", content: "Trailvia unifies discovery, planning, booking, finance, packing, navigation, community, and memories into one intelligent, AI-first travel companion." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/71018aab-c25a-4322-ad31-ee99bb88352d/id-preview-01492b59--f1997a06-a050-497d-a9cb-c74eb404f2e6.lovable.app-1782912857852.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/71018aab-c25a-4322-ad31-ee99bb88352d/id-preview-01492b59--f1997a06-a050-497d-a9cb-c74eb404f2e6.lovable.app-1782912857852.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
