import type { MetadataRoute } from "next";
import { sushiItems } from "@/data/sushi";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },

    // 돈 / 직장
    {
      url: `${SITE_URL}/tools/salary`,
      lastModified: new Date(),
    },

    {
      url: `${SITE_URL}/tools/job-change`,
      lastModified: new Date(),
    },

    // 메뉴 도감
    {
      url: `${BASE_URL}/food`,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/food/sushi`,
      lastModified: new Date(),
    },
  ];

  const sushiPages: MetadataRoute.Sitemap = sushiItems.map((item) => ({
    url: `${BASE_URL}/food/sushi/${item.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...sushiPages];
}
