import type { MetadataRoute } from "next";
import { appsContentUpdatedAt } from "@/data/apps";
import { contentUpdatedAt } from "@/data/japan-life-checklist";
import { sushiItems } from "@/data/sushi";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },

    // 일본 생활 시작 체크리스트
    {
      url: `${SITE_URL}/checklist/japan-life`,
      lastModified: contentUpdatedAt,
    },

    // 일본 필수 앱
    {
      url: `${SITE_URL}/apps`,
      lastModified: appsContentUpdatedAt,
    },

    // 돈 / 직장
    {
      url: `${SITE_URL}/tools/salary`,
      lastModified: new Date(),
    },

    // 메뉴 도감
    {
      url: `${SITE_URL}/food`,
      lastModified: new Date(),
    },

    {
      url: `${SITE_URL}/food/sushi`,
      lastModified: new Date(),
    },
  ];

  const sushiPages: MetadataRoute.Sitemap = sushiItems.map((item) => ({
    url: `${SITE_URL}/food/sushi/${item.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...sushiPages];
}
