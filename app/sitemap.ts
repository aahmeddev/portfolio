import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];
}
