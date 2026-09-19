import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

const description =
  "일본 메뉴 도감에서 현재 제공 중인 스시 메뉴를 만나보세요. 일본 초밥집의 메뉴 이름과 읽는 법, 한국어 뜻을 확인할 수 있습니다.";

export const metadata: Metadata = {
  title: "일본 메뉴 도감",
  description,
  alternates: {
    canonical: `${SITE_URL}/food`,
  },
  openGraph: {
    title: "일본 메뉴 도감 | 일생가",
    description,
    url: `${SITE_URL}/food`,
    siteName: "일생가",
    locale: "ko_KR",
    type: "website",
  },

  keywords: [
    "일본 메뉴",
    "일본 음식 메뉴",
    "일본 음식 한국어",
    "일본 메뉴판",
    "일본 음식 일본어",
    "일본 음식 도감",
  ],
};

const categories = [
  {
    name: "스시",
    description: "일본 초밥집에서 자주 볼 수 있는 메뉴",
    href: "/food/sushi",
    emoji: "🍣",
    isAvailable: true,
  },
  {
    name: "라멘",
    description: "일본에서 자주 먹는 다양한 라멘",
    href: "/coming-soon",
    emoji: "🍜",
  },
  {
    name: "야키니쿠",
    description: "일본식 고기구이 부위와 메뉴",
    href: "/coming-soon",
    emoji: "🥩",
  },
  {
    name: "이자카야",
    description: "일본 술집에서 자주 볼 수 있는 메뉴",
    href: "/coming-soon",
    emoji: "🍶",
  },
];

export default function FoodPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
          ← 일생가 홈
        </Link>

        <header className="mt-8">
          <p className="text-sm font-medium text-gray-500">🍴 일본 생활</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            일본 메뉴 도감
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            일본 식당에서 자주 볼 수 있는 메뉴를 일본어와 한국어로 쉽게
            확인해보세요.
          </p>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          {categories.map((category) => {
            const badge =
              category.href === "/coming-soon" ? "준비 중" : undefined;

            const content = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div className="text-4xl">{category.emoji}</div>

                  {badge && (
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                      {badge}
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {category.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>
              </>
            );

            return (
              <Link
                key={category.name}
                href={category.href}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
              >
                {content}
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
