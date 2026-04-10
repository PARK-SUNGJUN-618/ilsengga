import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ilsengga.vercel.app",
      lastModified: new Date(),
    },

    // 돈 / 직장
    {
      url: "https://ilsengga.vercel.app/tools/salary",
      lastModified: new Date(),
    },
    {
      url: "https://ilsengga.vercel.app/tools/job-change",
      lastModified: new Date(),
    },

    // 메뉴 도감
    {
      url: "https://ilsengga.vercel.app/food",
      lastModified: new Date(),
    },
    {
      url: "https://ilsengga.vercel.app/food/sushi",
      lastModified: new Date(),
    },
  ];
}
