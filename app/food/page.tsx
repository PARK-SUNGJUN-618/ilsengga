import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "일본 메뉴 도감",
  description:
    "일본 식당에서 자주 볼 수 있는 음식 메뉴를 일본어와 한국어로 쉽게 확인해보세요. 스시, 라멘, 야키니쿠, 이자카야 메뉴 등을 정리했습니다.",

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
  },
  {
    name: "라멘",
    description: "일본에서 자주 먹는 다양한 라멘",
    href: "/food/ramen",
    emoji: "🍜",
  },
  {
    name: "야키니쿠",
    description: "일본식 고기구이 부위와 메뉴",
    href: "/food/yakiniku",
    emoji: "🥩",
  },
  {
    name: "이자카야",
    description: "일본 술집에서 자주 볼 수 있는 메뉴",
    href: "/food/izakaya",
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
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-4xl">{category.emoji}</div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                {category.name}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {category.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
