export type SushiItem = {
  slug: string;
  japanese: string;
  reading: string;
  koreanReading: string;
  korean: string;
  description: string;
  image?: string;
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
    image: "/images/sushi/maguro.png",
    japanese: "マグロ",
    reading: "まぐろ",
    koreanReading: "마구로",
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
    image: "/images/sushi/salmon.png",
    japanese: "サーモン",
    reading: "さーもん",
    koreanReading: "사몬",
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
    image: "/images/sushi/engawa.png",
    japanese: "えんがわ",
    reading: "えんがわ",
    koreanReading: "엔가와",
    korean: "광어·가자미 지느러미살",
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
    image: "/images/sushi/hotate.png",
    japanese: "ほたて",
    reading: "ほたて",
    koreanReading: "호타테",
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
    image: "/images/sushi/ikura.png",
    japanese: "いくら",
    reading: "いくら",
    koreanReading: "이쿠라",
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
    image: "/images/sushi/uni.png",
    japanese: "うに",
    reading: "うに",
    koreanReading: "우니",
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

  {
    slug: "tai",
    image: "/images/sushi/tai.png",
    japanese: "たい",
    reading: "たい",
    koreanReading: "타이",
    korean: "도미",
    description: "담백하고 깔끔한 맛이 특징인 도미 초밥입니다.",

    taste: {
      flavor: 4,
      fattiness: 2,
      texture: 3,
    },

    category: "스시",

    tags: ["도미", "담백함"],
  },
  {
    slug: "akami",
    image: "/images/sushi/akami.png",
    japanese: "赤身",
    reading: "あかみ",
    koreanReading: "아카미",
    korean: "참치 붉은살",
    description:
      "참치의 붉은살을 사용한 초밥으로, 중뱃살이나 대뱃살보다 지방감이 적고 살 자체의 풍미가 두드러집니다. 기름진 맛보다 담백한 참치 맛을 즐기고 싶을 때 고르기 좋습니다.",
    taste: { flavor: 4, fattiness: 1, texture: 3 },
    category: "스시",
    tags: ["참치", "붉은살", "담백함"],
  },
  {
    slug: "chutoro",
    image: "/images/sushi/chutoro.png",
    japanese: "中トロ",
    reading: "ちゅうとろ",
    koreanReading: "츄토로",
    korean: "참치 중뱃살",
    description:
      "참치의 붉은살 풍미와 지방의 부드러움을 함께 느낄 수 있는 초밥입니다. 대체로 붉은살보다 기름지고 대뱃살보다 지방감이 덜하지만, 생선과 부위에 따라 차이가 있습니다.",
    taste: { flavor: 4, fattiness: 4, texture: 2 },
    category: "스시",
    tags: ["참치", "중뱃살", "부드러움"],
  },
  {
    slug: "otoro",
    image: "/images/sushi/otoro.png",
    japanese: "大トロ",
    reading: "おおとろ",
    koreanReading: "오토로",
    korean: "참치 대뱃살",
    description:
      "참치 중에서도 지방이 풍부한 부분을 사용해 진한 지방감과 부드러운 식감을 즐기는 초밥입니다. 붉은살이나 중뱃살보다 기름진 맛을 원할 때 고르기 좋으며, 지방의 정도와 식감은 생선과 손질에 따라 달라집니다.",
    taste: { flavor: 5, fattiness: 5, texture: 1 },
    category: "스시",
    tags: ["참치", "대뱃살", "기름짐"],
  },
  {
    slug: "bincho-maguro",
    image: "/images/sushi/bincho-maguro.png",
    japanese: "びんちょうまぐろ",
    reading: "びんちょうまぐろ",
    koreanReading: "빈초마구로",
    korean: "날개다랑어",
    description:
      "날개다랑어를 사용한 초밥으로, 옅은 분홍빛 살과 부드러운 식감이 특징입니다. 지방감은 부위에 따라 달라지므로, 담백한 맛과 기름진 맛 중 어느 쪽인지 궁금하다면 주문할 때 확인해보세요.",
    taste: { flavor: 3, fattiness: 3, texture: 2 },
    category: "스시",
    tags: ["참치", "날개다랑어", "부드러움"],
  },
  {
    slug: "hamachi",
    image: "/images/sushi/hamachi.png",
    japanese: "はまち",
    reading: "はまち",
    koreanReading: "하마치",
    korean: "어린 방어",
    description:
      "하마치는 방어의 성장 단계에 따른 이름 중 하나로, 지역에 따라 부르는 이름이 다르며 양식 방어를 가리키는 경우도 있습니다. 초밥으로는 탄력 있는 살과 지방감을 즐길 수 있지만, 이름만으로 크기나 기름진 정도를 단정하기는 어렵습니다.",
    taste: { flavor: 4, fattiness: 4, texture: 4 },
    category: "스시",
    tags: ["방어", "탄력", "기름짐"],
  },
  {
    slug: "buri",
    image: "/images/sushi/buri.png",
    japanese: "ぶり",
    reading: "ぶり",
    koreanReading: "부리",
    korean: "방어",
    description:
      "부리는 성장한 방어를 가리키는 이름으로 쓰이며, 성장 단계별 명칭과 구분은 지역에 따라 다릅니다. 초밥에서는 진한 풍미와 지방감을 느낄 수 있고, 계절과 부위에 따라 기름진 정도가 달라집니다.",
    taste: { flavor: 4, fattiness: 4, texture: 3 },
    category: "스시",
    tags: ["방어", "진한 풍미", "기름짐"],
  },
  {
    slug: "aji",
    image: "/images/sushi/aji.png",
    japanese: "あじ",
    reading: "あじ",
    koreanReading: "아지",
    korean: "전갱이",
    description:
      "전갱이 특유의 풍미와 적당한 탄력을 즐길 수 있는 초밥입니다. 생강이나 파를 곁들이는 경우가 있어, 곁들임에 따라 향과 뒷맛이 달라질 수 있습니다.",
    taste: { flavor: 4, fattiness: 3, texture: 3 },
    category: "스시",
    tags: ["전갱이", "등푸른생선", "감칠맛"],
  },
  {
    slug: "saba",
    image: "/images/sushi/saba.png",
    japanese: "さば",
    reading: "さば",
    koreanReading: "사바",
    korean: "고등어",
    description:
      "고등어를 사용한 초밥으로, 특유의 진한 풍미와 지방감을 느낄 수 있습니다. 메뉴에 사바라고만 적혀 있어도 초절임 등으로 손질한 경우가 있으므로, 산미가 있는지 알고 싶다면 조리 방식을 확인해보세요.",
    taste: { flavor: 5, fattiness: 4, texture: 3 },
    category: "스시",
    tags: ["고등어", "등푸른생선", "진한 풍미"],
  },
  {
    slug: "shime-saba",
    image: "/images/sushi/shime-saba.png",
    japanese: "しめさば",
    reading: "しめさば",
    koreanReading: "시메사바",
    korean: "초절임 고등어",
    description:
      "고등어를 소금으로 절인 뒤 식초 등으로 절여 만든 초밥 재료입니다. 고등어의 지방감에 산미와 짭짤함이 더해지며, 절이는 방식과 시간에 따라 신맛과 살의 단단함이 달라집니다.",
    taste: { flavor: 5, fattiness: 4, texture: 3 },
    category: "스시",
    tags: ["고등어", "초절임", "새콤함"],
  },
  {
    slug: "iwashi",
    image: "/images/sushi/iwashi.png",
    japanese: "いわし",
    reading: "いわし",
    koreanReading: "이와시",
    korean: "정어리",
    description:
      "정어리를 사용한 초밥으로, 부드러운 살과 등푸른생선 특유의 풍미가 특징입니다. 지방감은 계절과 생선 상태에 따라 달라지며, 생강이나 파를 곁들이면 향과 뒷맛이 더해집니다.",
    taste: { flavor: 5, fattiness: 4, texture: 2 },
    category: "스시",
    tags: ["정어리", "등푸른생선", "부드러움"],
  },
  {
    slug: "amaebi",
    image: "/images/sushi/amaebi.png",
    japanese: "甘エビ",
    reading: "あまえび",
    koreanReading: "아마에비",
    korean: "단새우",
    description:
      "단맛과 부드럽고 살짝 끈기 있는 식감이 특징인 단새우 초밥으로, 주로 생으로 제공합니다. 익힌 새우 초밥의 탱글한 식감과는 다른 부드러운 단맛을 즐기고 싶을 때 고르기 좋습니다.",
    taste: { flavor: 3, fattiness: 1, texture: 2 },
    category: "스시",
    tags: ["단새우", "달콤함", "부드러움"],
  },
  {
    slug: "ebi",
    image: "/images/sushi/ebi.png",
    japanese: "えび",
    reading: "えび",
    koreanReading: "에비",
    korean: "새우",
    description:
      "새우를 사용한 초밥으로, 메뉴에 에비라고 적힌 경우 익힌 새우가 나오는 경우가 많습니다. 단새우 초밥과 달리 탱글한 식감과 담백한 단맛을 즐길 수 있으며, 새우 종류와 조리 방식은 가게마다 다를 수 있습니다.",
    taste: { flavor: 3, fattiness: 1, texture: 4 },
    category: "스시",
    tags: ["새우", "탱글함", "담백함"],
  },
  {
    slug: "ika",
    image: "/images/sushi/ika.png",
    japanese: "いか",
    reading: "いか",
    koreanReading: "이카",
    korean: "오징어",
    description:
      "오징어를 사용한 초밥으로, 씹을수록 느껴지는 은은한 단맛과 탄력이 특징입니다. 오징어 종류와 칼집, 손질 방식에 따라 부드럽거나 쫀득하게 느껴질 수 있습니다.",
    taste: { flavor: 2, fattiness: 1, texture: 4 },
    category: "스시",
    tags: ["오징어", "쫀득함", "담백함"],
  },
  {
    slug: "tako",
    image: "/images/sushi/tako.png",
    japanese: "たこ",
    reading: "たこ",
    koreanReading: "타코",
    korean: "문어",
    description:
      "문어를 사용한 초밥으로, 익힌 문어의 탄력 있고 쫄깃한 식감을 즐기는 경우가 많습니다. 삶는 정도와 썰어낸 두께에 따라 씹는 느낌이 달라지므로, 부드러운 식감을 원한다면 주문할 때 확인해보세요.",
    taste: { flavor: 3, fattiness: 1, texture: 5 },
    category: "스시",
    tags: ["문어", "쫄깃함", "담백함"],
  },
  {
    slug: "unagi",
    image: "/images/sushi/unagi.png",
    japanese: "うなぎ",
    reading: "うなぎ",
    koreanReading: "우나기",
    korean: "민물장어",
    description:
      "민물장어를 익혀 올리는 초밥으로, 달고 짭짤한 소스를 발라 구운 형태로 제공하는 경우가 많습니다. 부드러운 살과 진한 지방감이 특징이며, 소스와 굽는 방식에 따라 단맛과 구운 향이 달라집니다.",
    taste: { flavor: 5, fattiness: 5, texture: 2 },
    category: "스시",
    tags: ["민물장어", "기름짐", "달콤짭짤함"],
  },
  {
    slug: "anago",
    image: "/images/sushi/anago.png",
    japanese: "穴子",
    reading: "あなご",
    koreanReading: "아나고",
    korean: "붕장어",
    description:
      "붕장어를 조리해 올리는 초밥으로, 부드럽게 조린 살에 소스를 곁들이는 경우가 많습니다. 민물장어와는 다른 재료이며, 조림이나 구이 등 조리 방식에 따라 식감과 풍미가 달라집니다.",
    taste: { flavor: 4, fattiness: 3, texture: 1 },
    category: "스시",
    tags: ["붕장어", "부드러움", "달콤짭짤함"],
  },
  {
    slug: "tamago",
    image: "/images/sushi/tamago.png",
    japanese: "たまご",
    reading: "たまご",
    koreanReading: "타마고",
    korean: "계란말이",
    description:
      "생선회 대신 익힌 계란말이를 올린 초밥 메뉴입니다. 부드러운 식감과 달콤한 맛을 즐길 수 있으며, 단맛과 육수의 풍미는 가게의 조리법에 따라 달라집니다.",
    taste: { flavor: 3, fattiness: 2, texture: 2 },
    category: "스시",
    tags: ["계란", "달콤함", "부드러움"],
  },
  {
    slug: "inari",
    image: "/images/sushi/inari.png",
    japanese: "いなり",
    reading: "いなり",
    koreanReading: "이나리",
    korean: "유부초밥",
    description:
      "달고 짭짤하게 조린 유부에 초밥 밥을 채운 메뉴로, 생선회를 올리는 초밥과는 형태가 다릅니다. 유부에 밴 양념과 밥의 산미가 어우러지며, 깨나 채소 등 속재료는 가게마다 다를 수 있습니다.",
    taste: { flavor: 4, fattiness: 3, texture: 2 },
    category: "스시",
    tags: ["유부", "달콤짭짤함", "새콤함"],
  },
];

export function getSushiBySlug(slug: string) {
  return sushiItems.find((item) => item.slug === slug);
}
