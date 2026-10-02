import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import JobChangeCalculator from "./JobChangeCalculator";

const title = "이직 연봉 비교";
const description = "현재 직장과 이직 후의 급여 조건을 비교해 세전 연봉과 예상 연·월평균 실수령액 차이를 확인하세요.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/tools/job-change` },
  openGraph: { title: `${title} | 일생가`, description, url: `${SITE_URL}/tools/job-change`, siteName: "일생가", locale: "ko_KR", type: "website" },
};

export default function JobChangePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <Link href="/" className="inline-flex min-h-11 items-center rounded text-sm text-gray-500 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4">← 일생가 홈</Link>
        <header className="mt-8">
          <p className="text-sm font-medium text-gray-500">💼 직장</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
          <p className="mt-4 text-base leading-7 text-gray-600">{description}</p>
        </header>
        <div className="mt-8"><JobChangeCalculator /></div>
        <aside aria-label="계산 기준" className="mt-8 space-y-3 text-xs leading-6 text-gray-500">
          <p>각 급여 조건이 1년 동안 유지된다고 가정한 예상 비교입니다. 이직 시점에 따른 무직 기간과 첫해 보너스 일할 계산은 반영하지 않습니다. 월평균 실수령액은 보너스를 포함한 연간 실수령액을 12개월로 나눈 금액입니다.</p>
          <p>기존 일본 월급 실수령액 계산기와 동일한 2026년 세금·사회보험 기준을 사용합니다. 전년도 연봉은 양쪽에 동일하게 적용하며, 주민세는 기존 계산기의 가나가와 기준 예상치입니다. 거주 지역에 따라 건강보험료와 전년도 사회보험료 추정이 달라질 수 있으며, 실제 금액은 가입 보험과 거주 지자체, 공제 조건 등에 따라 달라집니다.</p>
        </aside>
      </div>
    </main>
  );
}
