import type { Metadata } from "next";
import Link from "next/link";
import { sushiItems } from "@/data/sushi";

export const metadata: Metadata = {
  title: "일본 스시 메뉴 도감",
  description:
    "일본 초밥집에서 자주 볼 수 있는 스시 메뉴를 일본어, 읽는 법, 한국어 뜻과 함께 알아보세요. 마구로, 사몬, 엔가와, 가리비, 연어알, 성게알 등을 정리했습니다.",

  keywords: [
    "일본 스시",
    "일본 초밥",
    "일본 스시 메뉴",
    "일본 초밥 메뉴",
    "스시 일본어",
    "일본 초밥 종류",
    "엔가와",
    "마구로",
  ],
};

export default function SushiPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <Link
          href="/food"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          ← 메뉴 도감
        </Link>

        <header className="mt-8">
          <p className="text-sm font-medium text-gray-500">🍣 메뉴 도감</p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            일본 스시 메뉴 도감
          </h1>

          <p className="mt-4 text-gray-600">
            일본 초밥집에서 자주 볼 수 있는 스시 메뉴를 일본어와 한국어로 쉽게
            확인해보세요.
          </p>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          {sushiItems.map((item) => (
            <Link
              key={item.slug}
              href={`/food/sushi/${item.slug}`}
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm text-gray-500">{item.reading}</p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                {item.japanese}
              </h2>

              <p className="mt-1 text-base font-medium text-gray-700">
                {item.korean}
              </p>

              <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
                {item.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
