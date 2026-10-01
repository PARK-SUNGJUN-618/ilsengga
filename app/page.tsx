import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import Header from "./components/Header";
import CategorySection from "./components/CategorySection";

const title = "일생가 | 일본 생활·여행 정보와 도구";
const description =
  "일본 생활과 여행을 준비하는 한국인을 위한 체크리스트, 메뉴 도감, 필수 앱과 월급 실수령액 계산기를 제공합니다.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "일생가",
    locale: "ko_KR",
    type: "website",
  },
};

const categories = [
  {
    title: "🍴 메뉴 도감",
    description: "일본 식당에서 자주 보는 메뉴를 일본어와 한국어로 알아보세요.",
    tools: [
      {
        title: "일본 메뉴 도감",
        description:
          "일본 음식 메뉴의 일본어, 읽는 법, 한국어 뜻과 특징을 확인해보세요.",
        href: "/food",
      },
      {
        title: "스시 메뉴 도감",
        description:
          "마구로, 사몬, 엔가와 등 일본 스시 메뉴를 쉽게 알아보세요.",
        href: "/food/sushi",
      },
    ],
  },

  {
    title: "🏠 생활",
    description: "일본에서 생활하면서 자주 필요한 계산과 정보입니다.",
    tools: [
      {
        title: "일본 생활 시작 체크리스트",
        description:
          "입국 전부터 정착 초기까지 필요한 준비를 확인하고 완료한 항목을 체크해보세요.",
        href: "/checklist/japan-life",
        badge: "NEW",
      },
      {
        title: "일본 필수 앱",
        description:
          "일본 여행·생활에 필요한 앱과 한국 휴대폰 사용 조건을 확인하세요.",
        href: "/apps",
      },
      {
        title: "일본 생활비 계산기",
        description: "월세와 생활비를 입력해서 한 달 지출을 계산해보세요.",
        href: "/tools/living-cost",
        badge: "NEW",
      },
      {
        title: "일본 이사 비용 계산기",
        description: "일본에서 이사할 때 예상되는 비용을 확인해보세요.",
        href: "/coming-soon",
      },
    ],
  },

  {
    title: "💰 돈",
    description: "일본에서 벌고 쓰는 돈을 쉽게 계산해보세요.",
    tools: [
      {
        title: "일본 월급 실수령액 계산기",
        description: "월급을 입력하면 예상 실수령액을 확인할 수 있어요.",
        href: "/tools/salary",
      },
      {
        title: "일본 연봉 계산기",
        description: "연봉을 기준으로 월급과 실수령액을 확인해보세요.",
        href: "/coming-soon",
      },
    ],
  },

  {
    title: "✈️ 여행",
    description: "일본 여행을 조금 더 편하게 만들어주는 도구입니다.",
    tools: [
      {
        title: "일본 여행 준비 체크리스트",
        description:
          "출국 전부터 일본 도착 후까지 필요한 준비사항을 하나씩 확인해보세요.",
        href: "/checklist/japan-travel",
        badge: "NEW",
      },
      {
        title: "일본 여행 예산 계산기",
        description:
          "항공권, 숙박, 교통비 등을 입력해서 여행 예산을 계산해보세요.",
        href: "/coming-soon",
      },
    ],
  },

  {
    title: "💼 직장",
    description: "일본에서 일하고 이직할 때 필요한 도구입니다.",
    tools: [
      {
        title: "이직 연봉 비교",
        description: "현재 직장과 이직 후 연봉을 비교해보세요.",
        href: "/coming-soon",
      },
      {
        title: "일본 잔업수당 계산기",
        description: "잔업시간과 시급을 기준으로 잔업수당을 계산해보세요.",
        href: "/coming-soon",
      },
    ],
  },
];

// Keep planned tools in the data, but show only available tools on the home page.
const visibleCategories = categories
  .map((category) => ({
    ...category,
    tools: category.tools.filter((tool) => tool.href !== "/coming-soon"),
  }))
  .filter((category) => category.tools.length > 0);

const shortcuts = [
  { label: "생활 준비", href: "/checklist/japan-life" },
  { label: "여행 준비", href: "/checklist/japan-travel" },
  { label: "월급 계산", href: "/tools/salary" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:py-20">
            <p className="text-sm font-medium text-gray-500">
              일본 생활 가능하세요?
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:mt-4 sm:text-6xl">
              일생가
            </h1>

            <p className="mt-5 text-xl font-medium text-gray-700">
              일본 생활, 조금 더 쉽게.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              일본에서 생활하거나 여행하는 한국인을 위한 실용적인 정보와 도구를
              모았습니다.
            </p>

            <nav aria-label="주요 기능 바로가기" className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1">
              {shortcuts.map((shortcut) => (
                <Link
                  key={shortcut.href}
                  href={shortcut.href}
                  className="inline-flex min-h-11 items-center rounded px-2 text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900"
                >
                  {shortcut.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 pb-20">
          {visibleCategories.map((category) => (
            <CategorySection
              key={category.title}
              title={category.title}
              description={category.description}
              tools={category.tools}
            />
          ))}
        </div>
      </main>
    </>
  );
}
