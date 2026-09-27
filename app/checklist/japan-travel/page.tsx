import type { Metadata } from "next";
import Header from "@/app/components/Header";
import Checklist from "@/app/components/Checklist";
import { japanTravelChecklist } from "@/data/japan-travel-checklist";
import { SITE_URL } from "@/lib/site";

const title = "일본 여행 준비 체크리스트";
const description = "일본 여행 전 여권, 항공권, Visit Japan Web, 인터넷, 결제수단, 교통, 반입 물품과 입국 후 준비사항을 한 번에 확인하세요.";
const storageKey = "ilsengga:checklist:japan-travel";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/checklist/japan-travel` },
  openGraph: {
    title, description, url: `${SITE_URL}/checklist/japan-travel`,
    siteName: "일생가", locale: "ko_KR", type: "website",
  },
};

export default function JapanTravelChecklistPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 leading-7 text-gray-600">일본 여행 전 예약부터 입국 후 준비까지 하나씩 확인해보세요.</p>
          <p className="mt-3 text-sm leading-6 text-gray-600">체크한 항목은 이 브라우저에 저장됩니다.</p>
          <Checklist key={storageKey} sections={japanTravelChecklist} storageKey={storageKey} />
        </div>
      </main>
    </>
  );
}
