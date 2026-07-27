import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admissions/candidature"],
      },
    ],
    sitemap: "https://senegaloilandgasacademy.com/sitemap.xml",
  };
}
