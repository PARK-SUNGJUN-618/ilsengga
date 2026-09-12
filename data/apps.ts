export type AvailabilityStatus = "available" | "unavailable" | "conditional" | "unknown";
export type RequirementStatus = "required" | "not_required" | "conditional" | "unknown";
export type SupportStatus = "supported" | "unsupported" | "partial" | "unknown";
export type Platform = "ios" | "android";
export type Audience = "travel" | "resident";
export type Priority = "essential" | "recommended" | "optional";
export type Purpose = "maps" | "translation" | "transport" | "safety" | "communication" | "payment" | "shopping" | "administration";

export type Condition<S extends string> = { status: S; note?: string };
// 공통값은 한 번만 작성하고, 차이가 있을 때만 플랫폼별로 작성합니다.
export type PlatformCondition<S extends string> = Condition<S> | Record<Platform, Condition<S>>;

export interface AppItem {
  id: string;
  name: string;
  description: string;
  audiences: Audience[];
  purpose: Purpose;
  priority: Priority;
  platforms: PlatformCondition<AvailabilityStatus>;
  conditions: {
    koreanPhone: PlatformCondition<AvailabilityStatus>;
    japanesePhoneRequired: PlatformCondition<RequirementStatus>;
    japaneseStoreAccountRequired: PlatformCondition<RequirementStatus>;
    japaneseResidenceRequired: PlatformCondition<RequirementStatus>;
    koreanSupported: PlatformCondition<SupportStatus>;
  };
  scopeNote?: string;
  cautions: string[];
  officialUrl: string;
  sources: { label: string; url: string }[];
  lastVerified: string | null;
}

export const appsContentUpdatedAt = "2026-09-12";

// 공식 링크는 재확인할 출발점이며, 이용 조건을 검증했다는 의미가 아닙니다.
// 검증 전인 항목에는 공통 미확인 값을 적용합니다. 확인 후 앱별로 교체하세요.
const unverified = {
  platforms: { status: "unknown", note: "플랫폼 지원 및 세부 제약은 아직 확인하지 않았습니다." },
  conditions: {
    koreanPhone: { status: "unknown" },
    japanesePhoneRequired: { status: "unknown" },
    japaneseStoreAccountRequired: { status: "unknown" },
    japaneseResidenceRequired: { status: "unknown" },
    koreanSupported: { status: "unknown" },
  },
  lastVerified: null,
} satisfies Pick<AppItem, "platforms" | "conditions" | "lastVerified">;

const suicaNote = "서로 다른 Suica 이용 방식 중 하나입니다. 세 가지를 모두 설치해야 하는 것은 아닙니다.";

export const apps: AppItem[] = [
  {
    ...unverified,
    id: "google-maps", name: "Google Maps",
    description: "길을 찾고 주변 장소를 살펴보는 지도 서비스입니다.",
    audiences: ["travel", "resident"], purpose: "maps", priority: "essential",
    cautions: [], officialUrl: "https://www.google.com/maps/about/",
    sources: [{ label: "Google Maps 공식 안내", url: "https://www.google.com/maps/about/" }],
  },
  {
    ...unverified,
    id: "google-translate", name: "Google Translate",
    description: "메뉴와 안내문, 일상 대화의 번역을 돕는 앱입니다.",
    audiences: ["travel", "resident"], purpose: "translation", priority: "essential",
    cautions: [], officialUrl: "https://translate.google.com/about/",
    sources: [{ label: "Google Translate 공식 안내", url: "https://translate.google.com/about/" }],
  },
  {
    ...unverified,
    id: "japan-transit-planner", name: "Japan Transit Planner",
    description: "일본의 대중교통 경로와 환승을 찾아보는 앱입니다.",
    audiences: ["travel", "resident"], purpose: "transport", priority: "recommended",
    cautions: ["설치 전 공식 안내에서 앱 이름과 배포 대상을 확인하세요."],
    officialUrl: "https://appli.jorudan.co.jp/norikae/",
    sources: [{ label: "Jorudan 앱 공식 안내", url: "https://appli.jorudan.co.jp/norikae/" }],
  },
  {
    ...unverified,
    id: "safety-tips", name: "Safety tips",
    description: "일본 체류 중 재난 정보를 확인하기 위한 앱입니다.",
    audiences: ["travel", "resident"], purpose: "safety", priority: "recommended",
    cautions: [], officialUrl: "https://www.jnto.go.jp/safety-tips/eng/app.html",
    sources: [{ label: "JNTO Safety tips 안내", url: "https://www.jnto.go.jp/safety-tips/eng/app.html" }],
  },
  {
    ...unverified,
    id: "apple-wallet-suica", name: "Apple Wallet의 Suica",
    description: "Apple Wallet에서 Suica를 추가하고 이용하는 방식입니다.",
    audiences: ["travel", "resident"], purpose: "transport", priority: "recommended",
    scopeNote: suicaNote, cautions: [], officialUrl: "https://www.jreast.co.jp/appsuica/",
    sources: [{ label: "JR동일본 Apple Pay의 Suica 안내", url: "https://www.jreast.co.jp/appsuica/" }],
  },
  {
    ...unverified,
    id: "welcome-suica-mobile", name: "Welcome Suica Mobile",
    description: "일본 방문자를 위한 Suica 모바일 서비스입니다.",
    audiences: ["travel"], purpose: "transport", priority: "recommended",
    scopeNote: suicaNote, cautions: [], officialUrl: "https://www.jreast.co.jp/en/multi/welcomesuicamobile/",
    sources: [{ label: "JR동일본 Welcome Suica Mobile 안내", url: "https://www.jreast.co.jp/en/multi/welcomesuicamobile/" }],
  },
  {
    ...unverified,
    id: "mobile-suica", name: "モバイルSuica",
    description: "Suica 이용과 정기권 관리를 위한 JR동일본 앱입니다.",
    audiences: ["resident"], purpose: "transport", priority: "recommended",
    scopeNote: suicaNote, cautions: [], officialUrl: "https://www.jreast.co.jp/mobilesuica/",
    sources: [{ label: "JR동일본 モバイルSuica 안내", url: "https://www.jreast.co.jp/mobilesuica/" }],
  },
  {
    ...unverified,
    id: "line", name: "LINE",
    description: "메시지와 통화로 사람들과 연락하는 앱입니다.",
    audiences: ["travel", "resident"], purpose: "communication", priority: "essential",
    cautions: [], officialUrl: "https://www.line.me/ja/",
    sources: [{ label: "LINE 공식 안내", url: "https://www.line.me/ja/" }],
  },
  {
    ...unverified,
    id: "paypay", name: "PayPay",
    description: "일본 생활에서 QR 결제수단으로 검토할 수 있는 앱입니다.",
    audiences: ["resident"], purpose: "payment", priority: "recommended",
    cautions: [], officialUrl: "https://paypay.ne.jp/",
    sources: [{ label: "PayPay 공식 안내", url: "https://paypay.ne.jp/" }],
  },
  {
    ...unverified,
    id: "mercari", name: "Mercari",
    description: "생활용품을 구매하거나 정리할 때 사용하는 중고 거래 앱입니다.",
    audiences: ["resident"], purpose: "shopping", priority: "optional",
    cautions: [], officialUrl: "https://jp.mercari.com/",
    sources: [{ label: "Mercari 공식 사이트", url: "https://jp.mercari.com/" }],
  },
  {
    ...unverified,
    id: "myna", name: "マイナアプリ / マイナポータル",
    description: "온라인 행정 서비스와 인증을 이용하는 경로를 안내합니다.",
    audiences: ["resident"], purpose: "administration", priority: "recommended",
    cautions: ["서비스명과 설치 앱의 명칭·연결 관계는 공식 안내에서 다시 확인해야 합니다."],
    officialUrl: "https://www.digital.go.jp/policies/myna_portal",
    sources: [
      { label: "디지털청 マイナポータル 안내", url: "https://www.digital.go.jp/policies/myna_portal" },
      { label: "디지털청 マイナアプリ 안내", url: "https://www.digital.go.jp/policies/mynumber/local-government/mynaapp" },
    ],
  },
];
