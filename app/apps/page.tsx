import type { Metadata } from "next";
import Header from "@/app/components/Header";
import { apps } from "@/data/apps";
import { SITE_URL } from "@/lib/site";
import AppsDirectory from "./AppsDirectory";

const title = "일본 필수 앱 — 여행·거주 사용 조건 안내";
const description = "일본 여행과 생활에 필요한 앱의 한국 휴대폰 사용 가능 여부, 일본 전화번호·계정·거주 조건, 한국어 지원을 확인하세요.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/apps` },
  openGraph: {
    title, description, url: `${SITE_URL}/apps`,
    siteName: "일생가", locale: "ko_KR", type: "website",
  },
};

export default function AppsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">일본 필수 앱</h1>
          <p className="mt-4 max-w-2xl leading-7 text-gray-600">
            일본 여행·생활에 필요한 앱과 모바일 서비스를 살펴보고, 내 휴대폰에서 이용하기 위한 조건을 확인하세요.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            한국 휴대폰은 한국에서 구입한 단말, 일본 계정은 일본 국가·지역의 Apple/Google 스토어 계정을 뜻합니다.
            미확인은 아직 검증하지 않은 정보이며, 이용 불가를 뜻하지 않습니다.
          </p>
          <AppsDirectory apps={apps} />
        </div>
      </main>
    </>
  );
}
