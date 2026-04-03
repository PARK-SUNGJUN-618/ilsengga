export type SushiItem = {
  slug: string;
  japanese: string;
  reading: string;
  korean: string;
  description: string;

  taste: {
    flavor: number;
    fattiness: number;
    texture: number;
  };

  category: string;

  tags: string[];

  related?: string[];
};

export const sushiItems: SushiItem[] = [
  {
    slug: "maguro",
    japanese: "マグロ",
    reading: "まぐろ",
    korean: "참치",
    description:
      "일본 초밥집에서 가장 대표적으로 볼 수 있는 초밥 중 하나입니다. 부위에 따라 맛과 지방 함량이 크게 달라집니다.",

    taste: {
      flavor: 4,
      fattiness: 2,
      texture: 3,
    },

    category: "스시",

    tags: ["참치", "초밥", "담백함"],
  },

  {
    slug: "salmon",
    japanese: "サーモン",
    reading: "さーもん",
    korean: "연어",
    description:
      "부드럽고 기름진 맛이 특징인 연어 초밥입니다. 일본 초밥을 처음 먹는 사람도 비교적 부담 없이 먹기 좋습니다.",

    taste: {
      flavor: 4,
      fattiness: 4,
      texture: 2,
    },

    category: "스시",

    tags: ["연어", "초밥", "부드러움"],
  },

  {
    slug: "engawa",
    japanese: "えんがわ",
    reading: "えんがわ",
    korean: "엔가와",
    description:
      "광어 또는 가자미의 지느러미 주변에 있는 살입니다. 쫀득한 식감과 특유의 기름진 맛이 특징입니다.",

    taste: {
      flavor: 4,
      fattiness: 4,
      texture: 5,
    },

    category: "스시",

    tags: ["광어", "가자미", "쫀득함"],
  },

  {
    slug: "hotate",
    japanese: "ほたて",
    reading: "ほたて",
    korean: "가리비",
    description: "달콤하고 부드러운 맛이 특징인 가리비 초밥입니다.",

    taste: {
      flavor: 4,
      fattiness: 2,
      texture: 2,
    },

    category: "스시",

    tags: ["가리비", "조개", "달콤함"],
  },

  {
    slug: "ikura",
    japanese: "いくら",
    reading: "いくら",
    korean: "연어알",
    description:
      "연어의 알을 소금이나 간장 등으로 양념한 것으로, 톡톡 터지는 식감과 짭짤한 맛이 특징입니다.",

    taste: {
      flavor: 4,
      fattiness: 3,
      texture: 5,
    },

    category: "스시",

    tags: ["연어알", "알", "짭짤함"],
  },

  {
    slug: "uni",
    japanese: "うに",
    reading: "うに",
    korean: "성게알",
    description:
      "성게의 생식소를 먹는 일본의 대표적인 고급 초밥 재료입니다. 크리미하고 진한 맛이 특징입니다.",

    taste: {
      flavor: 5,
      fattiness: 4,
      texture: 2,
    },

    category: "스시",

    tags: ["성게", "고급", "크리미"],
  },
];

export function getSushiBySlug(slug: string) {
  return sushiItems.find((item) => item.slug === slug);
}
