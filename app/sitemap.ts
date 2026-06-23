import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://singhniwas.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://singhniwas.vercel.app/about",
      lastModified: new Date(),
    },
    {
      url: "https://singhniwas.vercel.app/contact",
      lastModified: new Date(),
    },
    {
      url: "https://singhniwas.vercel.app/tenants",
      lastModified: new Date(),
    },
  ];
}