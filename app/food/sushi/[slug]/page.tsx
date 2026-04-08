import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { sushiItems, getSushiBySlug } from "@/data/sushi";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return sushiItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const item = getSushiBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    title: `${item.japanese} ${item.korean} - 일본 스시 메뉴`,
    description: `${item.japanese}(${item.reading})는 한국어로 ${item.korean}입니다. 일본 스시집에서 어떤 음식인지, 맛과 식감을 알아보세요.`,

    keywords: [
      item.japanese,
      item.reading,
      item.korean,
      `${item.korean} 일본어`,
      `${item.japanese} 뜻`,
      "일본 스시",
      "일본 초밥",
    ],

    openGraph: {
      title: `${item.japanese} - ${item.korean} | 일생가`,
      description: item.description,
      url: `https://ilsengga.vercel.app/food/sushi/${item.slug}`,
      siteName: "일생가",
      locale: "ko_KR",
      type: "article",
    },
  };
}

function Stars({ value }: { value: number }) {
  return (
    <span aria-label={`${value}점`}>
      {"★".repeat(value)}
      {"☆".repeat(5 - value)}
    </span>
  );
}

export default async function SushiDetailPage({ params }: Props) {
  const { slug } = await params;

  const item = getSushiBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="flex gap-4 text-sm">
          <Link href="/food" className="text-gray-500 hover:text-gray-900">
            메뉴 도감
          </Link>

          <span className="text-gray-300">/</span>

          <Link
            href="/food/sushi"
            className="text-gray-500 hover:text-gray-900"
          >
            스시
          </Link>
        </div>

        <article className="mt-8">
          {/* 이미지 영역 */}
          <div className="flex aspect-video items-center justify-center rounded-3xl bg-gray-200">
            <span className="text-6xl">🍣</span>
          </div>

          {/* 기본 정보 */}
          <header className="mt-8">
            <p className="text-sm text-gray-500">{item.reading}</p>

            <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900">
              {item.japanese}
            </h1>

            <p className="mt-2 text-2xl font-semibold text-gray-700">
              {item.korean}
            </p>
          </header>

          {/* 설명 */}
          <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              어떤 음식인가요?
            </h2>

            <p className="mt-3 leading-7 text-gray-600">{item.description}</p>
          </section>

          {/* 맛 정보 */}
          <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">맛과 식감</h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">맛</span>

                <span className="text-sm">
                  <Stars value={item.taste.flavor} />
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">기름기</span>

                <span className="text-sm">
                  <Stars value={item.taste.fattiness} />
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">식감</span>

                <span className="text-sm">
                  <Stars value={item.taste.texture} />
                </span>
              </div>
            </div>
          </section>

          {/* 관련 태그 */}
          <section className="mt-6">
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>

          {/* 하단 */}
          <div className="mt-10">
            <Link
              href="/food/sushi"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              ← 다른 스시 메뉴 보기
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
