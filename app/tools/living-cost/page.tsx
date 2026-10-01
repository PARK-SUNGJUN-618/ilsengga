import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { parseIncomeQuery } from "@/lib/living-cost";
import LivingCostCalculator from "./LivingCostCalculator";

const title = "일본 생활비 계산기";
const description = "월 실수령액과 월세, 식비, 공과금 등 생활비를 입력해 매달 남는 돈과 연간 예상 지출을 계산해보세요.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/tools/living-cost` },
  openGraph: { title: `${title} | 일생가`, description, url: `${SITE_URL}/tools/living-cost`, siteName: "일생가", locale: "ko_KR", type: "website" },
};

export default async function LivingCostPage({ searchParams }: { searchParams: Promise<{ income?: string | string[] }> }) {
  const initialIncome = parseIncomeQuery((await searchParams).income);
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <Link href="/" className="inline-flex min-h-11 items-center rounded text-sm text-gray-500 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4">← 일생가 홈</Link>
        <header className="mt-8">
          <p className="text-sm font-medium text-gray-500">🏠 생활</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
          <p className="mt-4 text-base leading-7 text-gray-600">{description}</p>
        </header>
        <div className="mt-8">
          <LivingCostCalculator key={initialIncome ?? "empty"} initialIncome={initialIncome} />
        </div>
        <p className="mt-8 text-xs leading-6 text-gray-500">연간 결과는 입력한 월 수입과 지출이 12개월 동안 같다고 가정한 예상 금액입니다. 이사비 등 일회성 지출은 별도로 고려해주세요.</p>
      </div>
    </main>
  );
}
