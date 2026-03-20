import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ilsengga.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://ilsengga.vercel.app/tools/job-change",
      lastModified: new Date(),
    },
    {
      url: "https://ilsengga.vercel.app/tools/salary",
      lastModified: new Date(),
    },
  ];
}
