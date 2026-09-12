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

// 2026-09-12 확정 데이터의 공통 조건. 차이가 있는 앱은 아래에서 명시합니다.
const commonConditions = {
  platforms: { status: "available" },
  conditions: {
    koreanPhone: { status: "available" },
    japanesePhoneRequired: { status: "not_required" },
    japaneseStoreAccountRequired: { status: "not_required" },
    japaneseResidenceRequired: { status: "not_required" },
    koreanSupported: { status: "supported" },
  },
  lastVerified: "2026-09-12",
} satisfies Pick<AppItem, "platforms" | "conditions" | "lastVerified">;

const suicaNote = "서로 다른 Suica 이용 방식 중 하나입니다. 세 가지를 모두 설치해야 하는 것은 아닙니다.";

export const apps: AppItem[] = [
  {
    ...commonConditions,
    id: "google-maps", name: "Google Maps",
    description: "일본에서 길찾기, 대중교통 경로 및 주변 장소 검색에 사용하는 지도 앱.",
    audiences: ["travel", "resident"], purpose: "maps", priority: "essential",
    cautions: [], officialUrl: "https://www.google.com/maps/about/",
    sources: [{ label: "Google Maps 공식 안내", url: "https://www.google.com/maps/about/" }],
  },
  {
    ...commonConditions,
    id: "google-translate", name: "Google Translate",
    description: "텍스트, 사진, 음성 등을 한국어와 일본어를 포함한 다양한 언어로 번역할 수 있음.",
    audiences: ["travel", "resident"], purpose: "translation", priority: "essential",
    cautions: [], officialUrl: "https://translate.google.com/about/",
    sources: [{ label: "Google Translate 공식 안내", url: "https://translate.google.com/about/" }],
  },
  {
    ...commonConditions,
    id: "japan-transit-planner", name: "Japan Transit Planner",
    description: "일본의 대중교통 경로와 환승을 찾아보는 앱입니다.",
    audiences: ["travel", "resident"], purpose: "transport", priority: "recommended",
    cautions: [
      "일부 고급 기능은 유료일 수 있음.",
      "일본 철도·항공 경로, 운임, 소요시간 검색용.",
      "한국어 인터페이스 지원.",
    ],
    officialUrl: "https://appli.jorudan.co.jp/norikae/",
    sources: [{ label: "Jorudan 앱 공식 안내", url: "https://appli.jorudan.co.jp/norikae/" }],
  },
  {
    ...commonConditions,
    id: "safety-tips", name: "Safety tips",
    description: "일본 체류 중 재난 정보를 확인하기 위한 앱입니다.",
    audiences: ["travel", "resident"], purpose: "safety", priority: "recommended",
    cautions: [
      "일본 내 지진, 쓰나미, 기상 경보 등을 확인하기 위한 앱.",
      "여행자뿐 아니라 일본 거주 외국인에게도 유용함.",
      "한국어 공식 지원.",
    ], officialUrl: "https://www.jnto.go.jp/safety-tips/eng/app.html",
    sources: [{ label: "JNTO Safety tips 안내", url: "https://www.jnto.go.jp/safety-tips/eng/app.html" }],
  },
  {
    ...commonConditions,
    id: "apple-wallet-suica", name: "Apple Wallet의 Suica",
    platforms: { ios: { status: "available" }, android: { status: "unavailable" } },
    conditions: {
      ...commonConditions.conditions,
      koreanPhone: {
        ios: { status: "conditional", note: "iPhone 8 이후 모델은 이용 가능. 일부 구형 모델(iPhone 7 계열 등)은 일본 판매 모델 조건이 있습니다." },
        android: { status: "unavailable" },
      },
      koreanSupported: { status: "unknown" },
    },
    description: "Apple Wallet에서 Suica를 추가하고 이용하는 방식입니다.",
    audiences: ["travel", "resident"], purpose: "transport", priority: "recommended",
    scopeNote: suicaNote, cautions: [
      "Apple Account의 2단계 인증이 필요함.",
      "Wallet에 대응 결제카드가 등록되어 있어야 함.",
      "Android에서는 Apple Wallet을 사용할 수 없음.",
    ], officialUrl: "https://www.jreast.co.jp/appsuica/",
    sources: [{ label: "JR동일본 Apple Pay의 Suica 안내", url: "https://www.jreast.co.jp/appsuica/" }],
  },
  {
    ...commonConditions,
    id: "welcome-suica-mobile", name: "Welcome Suica Mobile",
    platforms: { ios: { status: "available" }, android: { status: "unavailable" } },
    conditions: {
      ...commonConditions.conditions,
      koreanPhone: { ios: { status: "available" }, android: { status: "unavailable" } },
      koreanSupported: { status: "unsupported" },
    },
    description: "일본 방문자를 위한 Suica 모바일 서비스입니다.",
    audiences: ["travel"], purpose: "transport", priority: "recommended",
    scopeNote: suicaNote, cautions: [
      "iPhone 전용 앱.",
      "한국 App Store에서도 배포되고 있음.",
      "앱 UI 언어는 영어.",
      "별도 회원가입은 필요하지 않지만 비밀 키워드를 설정함.",
      "위치 정보가 켜져 있어야 Suica 발급 및 충전 가능.",
      "일부 국가에서는 일본 입국 전 발급/충전이 제한될 수 있음.",
      "Apple Pay에 등록된 카드로 충전.",
      "잔액 및 Suica는 발급 후 180일 유효.",
      "세 가지 Suica 방식 중 하나이며 다른 Suica 앱을 모두 설치할 필요는 없음.",
    ], officialUrl: "https://www.jreast.co.jp/en/multi/welcomesuicamobile/",
    sources: [{ label: "JR동일본 Welcome Suica Mobile 안내", url: "https://www.jreast.co.jp/en/multi/welcomesuicamobile/" }],
  },
  {
    ...commonConditions,
    id: "mobile-suica", name: "モバイルSuica",
    conditions: {
      koreanPhone: {
        ios: { status: "conditional", note: "Apple Pay Suica 대응 iPhone 조건을 충족해야 합니다." },
        android: { status: "conditional", note: "モバイルSuica 대응 단말 및 おサイフケータイ 기능이 필요합니다. 한국 등 해외 판매 Android 단말은 모델별 확인이 필요합니다." },
      },
      japanesePhoneRequired: { status: "unknown", note: "JR동일본은 전화번호가 설정된 대응 단말을 요구하지만, 외국 전화번호 허용 범위는 이번 검증에서 확정하지 않았습니다." },
      japaneseStoreAccountRequired: { status: "unknown" },
      japaneseResidenceRequired: { status: "unknown" },
      koreanSupported: { status: "unknown" },
    },
    description: "Suica 이용과 정기권 관리를 위한 JR동일본 앱입니다.",
    audiences: ["resident"], purpose: "transport", priority: "recommended",
    scopeNote: suicaNote, cautions: [
      "JRE ID 등록이 필요함.",
      "신용카드 등록 없이도 일부 기능은 이용 가능.",
      "Android는 특히 단말 호환 여부 확인이 중요함.",
      "정기권 등 다양한 기능을 제공함.",
    ], officialUrl: "https://www.jreast.co.jp/mobilesuica/",
    sources: [{ label: "JR동일본 モバイルSuica 안내", url: "https://www.jreast.co.jp/mobilesuica/" }],
  },
  {
    ...commonConditions,
    id: "line", name: "LINE",
    description: "메시지와 통화로 사람들과 연락하는 앱입니다.",
    audiences: ["travel", "resident"], purpose: "communication", priority: "essential",
    cautions: [
      "신규 계정 등록에는 전화번호 인증이 필요함.",
      "일본 전화번호만 가능한 것은 아님.",
      "공식적으로 일본, 한국, 대만, 홍콩, 태국의 휴대전화 번호를 인증에 사용할 수 있음.",
      "SMS 수신 또는 음성 통화 인증이 필요할 수 있음.",
      "050 번호, 가상 전화번호 등은 사용할 수 없음.",
    ], officialUrl: "https://www.line.me/ja/",
    sources: [{ label: "LINE 공식 안내", url: "https://www.line.me/ja/" }],
  },
  {
    ...commonConditions,
    id: "paypay", name: "PayPay",
    conditions: {
      koreanPhone: { status: "conditional", note: "단말 자체보다 계정 등록을 위한 일본 휴대전화 번호가 핵심 조건입니다." },
      japanesePhoneRequired: { status: "required" },
      japaneseStoreAccountRequired: { status: "unknown" },
      japaneseResidenceRequired: { status: "conditional", note: "기본 결제 앱 등록 자체와 본인확인(eKYC)은 구분해야 합니다. 일부 기능에는 일본 내 본인확인 정보가 필요합니다." },
      koreanSupported: { status: "unsupported" },
    },
    description: "일본 생활에서 QR 결제수단으로 검토할 수 있는 앱입니다.",
    audiences: ["resident"], purpose: "payment", priority: "recommended",
    cautions: [
      "SMS 인증 가능한 일본 휴대전화 번호가 필요함.",
      "해외 휴대전화 번호는 사용할 수 없음.",
      "본인확인을 하면 은행계좌 등록 및 PayPay Money 등 추가 기능을 사용할 수 있음.",
      "외국인도 본인확인 가능.",
      "외국인의 경우 재류카드, 마이넘버카드 등 조건이 발생할 수 있음.",
    ], officialUrl: "https://paypay.ne.jp/",
    sources: [{ label: "PayPay 공식 안내", url: "https://paypay.ne.jp/" }],
  },
  {
    ...commonConditions,
    id: "mercari", name: "Mercari",
    conditions: {
      koreanPhone: { status: "conditional" },
      japanesePhoneRequired: { status: "required", note: "SMS 가능한 휴대전화번호 인증 필요. 번호 국가 조건은 추가 확인 필요" },
      japaneseStoreAccountRequired: { status: "unknown" },
      japaneseResidenceRequired: { status: "conditional" },
      koreanSupported: { status: "unsupported" },
    },
    description: "생활용품을 구매하거나 정리할 때 사용하는 중고 거래 앱입니다.",
    audiences: ["resident"], purpose: "shopping", priority: "optional",
    cautions: [
      "신규등록 및 재로그인 등에서 SMS 가능한 휴대전화번호 인증이 필요함.",
      "고정전화와 050 번호는 사용할 수 없음.",
      "구매, 판매, メルペイ 등 사용하는 기능에 따라 추가 인증 조건이 발생할 수 있음.",
      "일본 주소 및 본인확인이 필요한 기능이 있으므로 단순 설치 가능 여부와 실제 거래 가능 여부를 구분할 것.",
    ], officialUrl: "https://jp.mercari.com/",
    sources: [{ label: "Mercari 공식 사이트", url: "https://jp.mercari.com/" }],
  },
  {
    ...commonConditions,
    id: "myna", name: "マイナアプリ / マイナポータル",
    conditions: {
      koreanPhone: {
        ios: { status: "conditional", note: "지원되는 iPhone과 OS 버전 조건을 충족해야 합니다." },
        android: { status: "conditional", note: "마이넘버카드 읽기 및 스마트폰 전자증명서 지원 단말인지 확인해야 합니다." },
      },
      japanesePhoneRequired: { status: "not_required" },
      japaneseStoreAccountRequired: { status: "unknown" },
      japaneseResidenceRequired: { status: "required" },
      koreanSupported: { status: "unsupported" },
    },
    description: "온라인 행정 서비스와 인증을 이용하는 경로를 안내합니다.",
    audiences: ["resident"], purpose: "administration", priority: "recommended",
    cautions: [
      "マイナアプリ는 기존 マイナポータルアプリ의 후속/현재 앱 명칭으로 사용됨.",
      "マイナポータル은 행정 서비스이며 マイナアプリ는 카드 인증·읽기 등에 사용하는 앱.",
      "마이넘버카드가 필요한 주요 기능이 많음.",
      "Android에서 실물 마이넘버카드를 읽을 때 NFC / おサイフケータイ 기능을 활성화해야 함.",
      "모든 NFC 스마트폰이 자동으로 지원되는 것은 아니며 공식 대응 단말 확인이 필요함.",
      "iPhone과 Android에서 이용 가능한 기능이 다를 수 있음.",
    ],
    officialUrl: "https://www.digital.go.jp/policies/myna_portal",
    sources: [
      { label: "디지털청 マイナポータル 안내", url: "https://www.digital.go.jp/policies/myna_portal" },
      { label: "디지털청 マイナアプリ 안내", url: "https://www.digital.go.jp/policies/mynumber/local-government/mynaapp" },
    ],
  },
];
