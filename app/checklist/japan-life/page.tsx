import type { Metadata } from "next";
import Header from "@/app/components/Header";
import { japanLifeChecklist } from "@/data/japan-life-checklist";
import { SITE_URL } from "@/lib/site";
import JapanLifeChecklist from "./JapanLifeChecklist";

const title = "일본 생활 시작 체크리스트";
const description = "일본 입국 전부터 정착 초기까지 필요한 준비를 단계별로 확인해보세요. 주소 신고, 건강보험·연금 확인, 은행·통신·교통 준비 등을 체크하고 진행 상황을 저장할 수 있습니다.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/checklist/japan-life` },
  openGraph: {
    title, description, url: `${SITE_URL}/checklist/japan-life`,
    siteName: "일생가", locale: "ko_KR", type: "website",
  },
};

export default function JapanLifeChecklistPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 leading-7 text-gray-600">일본 입국 전부터 정착 초기까지 필요한 준비를 하나씩 확인해보세요.</p>
          <p className="mt-3 text-sm leading-6 text-gray-600">체크한 항목은 이 브라우저에 저장됩니다.</p>
          <p className="mt-2 text-sm leading-6 text-gray-500">체크 상태는 다른 기기와 동기화되지 않으며, 브라우저 데이터를 삭제하면 기록도 사라질 수 있습니다.</p>
          <p className="mt-3 text-sm leading-6 text-gray-600">완료한 항목을 체크하고, ‘자세히 보기’에서 세부 안내와 출처를 확인하세요.</p>
          <JapanLifeChecklist sections={japanLifeChecklist} />
          <p className="mt-8 text-sm leading-6 text-gray-500">행정 절차는 재류자격, 나이, 취업 형태, 거주 지역 등에 따라 달라질 수 있습니다. 본인에게 적용되는 조건과 절차는 각 항목의 공식 출처와 담당 기관에서 확인하세요.</p>
        </div>
      </main>
    </>
  );
}
