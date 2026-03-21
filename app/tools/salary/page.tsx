import type { Metadata } from "next";
import Link from "next/link";
import SalaryCalculator from "./SalaryCalculator";

export const metadata: Metadata = {
  title: "일본 월급 실수령액 계산기",
  description:
    "일본 월급을 입력하면 건강보험, 후생연금, 고용보험, 소득세, 주민세 등을 고려해 예상 실수령액을 계산해보세요.",
  keywords: [
    "일본 월급 실수령액",
    "일본 월급 계산기",
    "일본 실수령액 계산기",
    "일본 연봉 실수령액",
    "일본 월급 세금",
    "일본 직장인 실수령액",
  ],
};

export default function SalaryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/"
          className="text-sm text-gray-500 transition hover:text-gray-900"
        >
          ← 일생가 홈
        </Link>

        <div className="mt-8">
          <p className="text-sm font-medium text-gray-500">💰 돈</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            일본 월급 실수령액 계산기
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            일본에서 받는 월급을 입력하면 사회보험과 세금을 고려해 예상
            실수령액을 계산해드립니다.
          </p>
        </div>

        <div className="mt-8">
          <SalaryCalculator />
        </div>

        <section className="mt-12 rounded-xl border bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900">
            일본 월급에서 무엇이 빠지나요?
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            일본에서 회사원으로 근무하면 월급에서 건강보험, 후생연금, 고용보험
            등의 사회보험료와 소득세 등이 공제됩니다. 주민세는 전년도 소득 등을
            기준으로 결정되기 때문에 실제 급여명세서와 계산 결과가 다를 수
            있습니다.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-500">
            이 계산기는 일반적인 조건을 기준으로 한 예상치입니다. 실제 금액은
            거주 지역, 건강보험조합, 나이, 부양가족, 각종 공제 등에 따라 달라질
            수 있습니다.
          </p>
        </section>
      </div>
    </main>
  );
}
