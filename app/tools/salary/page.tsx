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
    "일본 월급 40만엔 실수령액",
    "일본 월급 50만엔 실수령액",
  ],

  openGraph: {
    title: "일본 월급 실수령액 계산기 | 일생가",
    description:
      "일본 월급을 입력하고 사회보험과 세금을 고려한 예상 실수령액을 계산해보세요.",
    url: "https://ilsengga.vercel.app/tools/salary",
    siteName: "일생가",
    locale: "ko_KR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function SalaryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        {/* 홈으로 돌아가기 */}
        <Link
          href="/"
          className="text-sm text-gray-500 transition hover:text-gray-900"
        >
          ← 일생가 홈
        </Link>

        {/* 페이지 헤더 */}
        <header className="mt-8">
          <p className="text-sm font-medium text-gray-500">💰 돈</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            일본 월급 실수령액 계산기
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-600">
            일본에서 받는 월급을 입력하면 건강보험, 후생연금, 고용보험, 소득세,
            주민세 등을 고려해 예상 실수령액을 계산해드립니다.
          </p>
        </header>

        {/* 계산기 */}
        <div className="mt-8">
          <SalaryCalculator />
        </div>

        {/* 안내 */}
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="text-base font-bold text-gray-900">
            계산 결과를 볼 때 알아두세요
          </h2>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
            <li>
              • 이 계산기는 일본의 일반적인 회사원과 협회けんぽ 가입자를
              기준으로 한 예상 계산입니다.
            </li>

            <li>
              • 실제 사회보험료는 표준보수월액, 표준상여액 및 가입한 건강보험에
              따라 달라질 수 있습니다.
            </li>

            <li>
              • 건강보험조합에 가입한 경우에는 실제 건강보험료가 계산 결과와
              다를 수 있습니다.
            </li>

            <li>
              • 주민세는 기본적으로 전년도 소득을 기준으로 계산되기 때문에
              전년도 연봉을 별도로 입력합니다.
            </li>

            <li>
              • 전년도 사회보험료는 실제 급여명세서를 입력하지 않기 때문에
              전년도 연봉을 이용해 추정합니다.
            </li>
          </ul>
        </section>

        {/* 설명 */}
        <section className="mt-12 space-y-10">
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
              주민세는 기본적으로 전년도 소득을 기준으로 계산됩니다. 따라서 올해
              월급만 입력해서는 현재 급여에서 공제되는 주민세를 정확하게
              추정하기 어렵습니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              예를 들어 2025년에 벌어들인 소득을 기준으로 2026년도 주민세가
              결정되는 방식입니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              전년도 연봉을 모르면 어떻게 하나요?
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              정확한 전년도 소득을 모르는 경우에는 전년도
              원천징수표(源泉徴収票)의 「支払金額」을 확인하는 것이 가장
              좋습니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              전년도 사회보험료는 별도로 입력하지 않기 때문에 일생가에서는
              전년도 연봉을 바탕으로 사회보험료를 추정하여 주민세를 계산합니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              이 계산기는 정확한가요?
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              일생가의 계산 결과는 실제 급여명세서를 대신하는 것이 아니라,
              일본에서 취업하거나 이직할 때 월급과 연봉을 비교하기 위한 예상
              금액입니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              실제 금액은 건강보험조합 가입 여부, 표준보수월액, 보너스 지급
              방식, 부양가족의 나이와 관계, 각종 공제, 거주하는 시구정촌 등에
              따라 달라질 수 있습니다.
            </p>
          </div>

          {/* SEO용 관련 검색어 섹션 */}
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              일본 월급 실수령액을 계산하고 싶다면
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              일본에서 월급 30만엔, 40만엔, 50만엔 등을 받을 경우 실제 통장에
              들어오는 금액은 사회보험료와 세금에 따라 달라집니다. 이 계산기를
              이용하면 예상 연봉과 월 실수령액을 쉽게 비교할 수 있습니다.
            </p>
          </div>
        </section>

        {/* 하단 안내 */}
        <footer className="mt-14 border-t border-gray-200 pt-6">
          <p className="text-xs leading-5 text-gray-400">
            ※ 본 계산기는 2026년도 일본의 세금 및 사회보험 제도를 바탕으로 한
            예상 계산입니다. 실제 세액 및 보험료와 차이가 발생할 수 있습니다.
          </p>
        </footer>
      </div>
    </main>
  );
}
