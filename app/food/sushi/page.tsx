import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sushiItems } from "@/data/sushi";
import { SITE_URL } from "@/lib/site";

const description =
  "일본 초밥집에서 자주 볼 수 있는 스시 메뉴를 일본어, 읽는 법, 한국어 뜻과 함께 알아보세요. 마구로, 사몬, 엔가와, 가리비, 연어알, 성게알 등을 정리했습니다.";

export const metadata: Metadata = {
  title: "일본 스시 메뉴 도감",
  description,
  alternates: {
    canonical: `${SITE_URL}/food/sushi`,
  },
  openGraph: {
    title: "일본 스시 메뉴 도감 | 일생가",
    description,
    url: `${SITE_URL}/food/sushi`,
    siteName: "일생가",
    locale: "ko_KR",
    type: "website",
  },

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
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">{item.koreanReading}</p>

                  <h2 lang="ja" className="mt-1 text-xl font-bold text-gray-900">
                    {item.japanese}
                  </h2>

                  <p className="mt-1 text-base font-medium text-gray-700">
                    {item.korean}
                  </p>
                </div>

                {item.image && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-50 sm:aspect-square sm:w-28 sm:shrink-0">
                    <Image
                      src={item.image}
                      alt={`${item.korean} 초밥`}
                      fill
                      sizes="(min-width: 640px) 112px, calc(100vw - 74px)"
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

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
