import type { MetadataRoute } from "next";
import { SITE, navItems } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/home", "/quote-request", ...navItems.map((item) => item.href)];
  const uniqueRoutes = Array.from(new Set(routes));

  return uniqueRoutes.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/home" ? 1 : 0.78
  }));
}
