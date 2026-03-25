import type { Metadata } from "next";
import Link from "next/link";
import SalaryCalculator from "./SalaryCalculator";

export const metadata: Metadata = {
  title: "일본 월급 실수령액 계산기",
  description:
    "일본 월급을 입력하면 건강보험, 후생연금, 고용보험, 소득세, 주민세 등을 고려해 예상 실수령액을 계산해보세요. 2026년 일본 세금 및 사회보험 기준.",

  keywords: [
    "일본 월급 실수령액",
    "일본 월급 계산기",
    "일본 실수령액 계산기",
    "일본 연봉 실수령액",
    "일본 월급 세금",
    "일본 직장인 실수령액",
    "일본 급여 계산기",
    "일본 월급 30만엔 실수령액",
  ],

  openGraph: {
    title: "일본 월급 실수령액 계산기 | 일생가",
    description: "일본 월급을 입력하고 예상 실수령액을 계산해보세요.",
    url: "https://ilsengga.vercel.app/tools/salary",
    siteName: "일생가",
    locale: "ko_KR",
    type: "website",
  },
};

export default function SalaryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <Link
          href="/"
          className="text-sm text-gray-500 transition hover:text-gray-900"
        >
          ← 일생가 홈
        </Link>

        <header className="mt-8">
          <p className="text-sm font-medium text-gray-500">💰 돈</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            일본 월급 실수령액 계산기
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-600">
            일본에서 받는 월급을 입력하면 사회보험과 소득세, 주민세 등을 고려해
            예상 실수령액을 계산해드립니다.
          </p>
        </header>

        <div className="mt-8">
          <SalaryCalculator />
        </div>

        <section className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              일본 월급에서 무엇이 빠지나요?
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              일본의 회사원 급여에서는 일반적으로 건강보험, 후생연금, 고용보험
              등의 사회보험료와 소득세, 주민세 등이 공제됩니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              주민세는 왜 전년도 연봉을 입력하나요?
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              주민세는 기본적으로 전년도 소득을 기준으로 계산되기 때문에 올해
              연봉만으로 정확한 주민세를 계산하기 어렵습니다. 따라서
              일생가에서는 전년도 연봉을 별도로 입력할 수 있도록 했습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              이 계산기는 정확한가요?
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              일반적인 회사원 조건을 기준으로 한 예상 계산기입니다. 실제
              건강보험과 후생연금은 표준보수월액과 표준상여액 등을 기준으로
              계산되므로 실제 급여명세서와 차이가 날 수 있습니다.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
