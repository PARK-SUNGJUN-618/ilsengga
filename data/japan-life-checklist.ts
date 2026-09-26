export type ChecklistSource = { name: string; url: string };
export type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  conditionNote?: string;
  details?: string[];
  sources?: ChecklistSource[];
  lastVerified?: string;
};
export type ChecklistSection = {
  id: string;
  title: string;
  description?: string;
  items: ChecklistItem[];
};

export const contentUpdatedAt = "2026-09-26";
const guidebook: ChecklistSource = {
  name: "출입국재류관리청 - 생활·취업 가이드북",
  url: "https://www.moj.go.jp/isa/guidebook_all.html",
};
const portCity: ChecklistSource = {
  name: "출입국재류관리청 - 입국항·시구정촌 절차 안내",
  url: "https://www.moj.go.jp/isa/publications/faq/newimmiact_4_port-city.html",
};

export const japanLifeChecklist: ChecklistSection[] = [
  {
    id: "before-arrival",
    title: "1. 일본 입국 전",
    description: "일본에 도착한 뒤 바로 생활을 시작할 수 있도록 기본적인 준비를 확인해보세요.",
    items: [
      {
        id: "check-passport-residence-status",
        title: "여권·재류자격 확인하기",
        description: "여권 유효기간과 일본에서 활동할 수 있는 재류자격·비자 관련 내용을 다시 확인하세요.",
        conditionNote: "입국 목적과 재류자격에 따라 필요한 절차와 서류가 달라질 수 있습니다.",
        details: [
          "여권의 유효기간과 이름 등 기본 정보를 확인하세요.",
          "일본에서 취업·유학·가족체류 등 장기간 생활할 예정이라면 본인의 재류자격과 허용되는 활동 범위를 확인해두는 것이 좋습니다.",
          "재류자격과 실제 활동 내용이 일치하는지 확인하세요.",
        ],
        sources: [{ name: "출입국재류관리청 - 외국인 생활지원 포털", url: "https://www.moj.go.jp/isa/support/portal/" }],
        lastVerified: "2026-09-26",
      },
      {
        id: "prepare-important-documents",
        title: "중요 서류 준비하기",
        description: "일본에서 행정·취업·주거 절차에 사용할 수 있는 중요 서류를 정리해두세요.",
        conditionNote: "실제로 필요한 서류는 재류자격, 회사, 학교, 계약 상대방 등에 따라 다릅니다.",
        details: [
          "여권과 재류자격 관련 서류는 쉽게 확인할 수 있도록 준비하세요.",
          "취업·학교·주거 계약 등에 필요한 서류가 있다면 출국 전에 발급 가능 여부를 확인하세요.",
          "원본이 필요한지, 사본 또는 전자파일로 가능한지도 각 제출처에서 확인하는 것이 좋습니다.",
        ],
        sources: [guidebook], lastVerified: "2026-09-26",
      },
      {
        id: "prepare-housing",
        title: "일본에서 살 곳 준비하기",
        description: "입국 후 머물 곳을 정하고 계약 조건과 입주 방법을 확인하세요.",
        conditionNote: "호텔·기숙사·회사 사택·임대주택 등 거주 형태에 따라 필요한 준비가 다릅니다.",
        details: [
          "장기 임대주택을 구한다면 초기 비용, 보증 관련 조건, 계약 기간 등을 확인하세요.",
          "입주일과 열쇠 수령 방법을 확인하세요.",
          "일본의 임대 계약 방식은 한국과 차이가 있을 수 있으므로 계약 내용을 확인한 뒤 진행하세요.",
        ],
        sources: [{ name: "국토교통성 - 외국인을 위한 임대주택 정보", url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000017.html" }],
        lastVerified: "2026-09-26",
      },
      {
        id: "prepare-initial-money",
        title: "초기 생활비·결제수단 준비하기",
        description: "입국 직후 필요한 생활비와 사용할 수 있는 결제수단을 준비하세요.",
        conditionNote: "일본 은행 계좌나 신용카드를 바로 만들기 어려운 경우도 있으므로 초기 결제수단을 별도로 준비하면 편리합니다.",
        details: [
          "교통비, 식비, 숙박비, 생활용품 등 초기 지출을 고려하세요.",
          "해외 결제가 가능한 카드의 일본 사용 가능 여부를 확인하세요.",
          "카드만 사용할 수 없는 상황을 대비해 필요한 범위에서 현금도 준비하는 것이 좋습니다.",
        ],
        sources: [guidebook], lastVerified: "2026-09-26",
      },
      {
        id: "prepare-mobile-connection",
        title: "휴대폰·인터넷 이용 방법 확인하기",
        description: "일본 도착 직후 사용할 데이터 통신과 이후 사용할 휴대폰 회선을 준비하세요.",
        conditionNote: "여행용 eSIM·SIM과 일본 거주자용 휴대폰 계약은 조건이 다를 수 있습니다.",
        details: [
          "입국 직후 지도·번역·연락에 사용할 데이터 통신 방법을 준비하세요.",
          "장기 거주자는 이후 일본 전화번호가 필요한 서비스가 있을 수 있으므로 휴대폰 회선 계약도 검토하세요.",
          "본인의 휴대폰이 일본에서 사용할 통신 방식과 호환되는지도 확인하는 것이 좋습니다.",
        ],
        sources: [guidebook], lastVerified: "2026-09-26",
      },
    ],
  },
  {
    id: "after-arrival",
    title: "2. 일본 도착 후 행정 절차",
    description: "일본에서 주소가 정해진 뒤 필요한 행정 절차와 가입 상태를 확인해보세요.",
    items: [
      {
        id: "check-residence-card",
        title: "재류카드 확인하기",
        description: "재류카드를 받았다면 이름, 재류자격, 재류기간 등 기재 내용을 확인하세요.",
        conditionNote: "재류카드의 교부 방식은 입국 공항이나 상황에 따라 달라질 수 있습니다.",
        details: [
          "재류카드를 교부받았다면 기재된 개인정보와 재류자격 등을 확인하세요.",
          "입국 시 재류카드가 바로 교부되지 않고 이후 교부되는 경우도 있으므로 본인의 교부 방법을 확인하세요.",
          "재류카드는 이후 주소 신고 등 여러 행정 절차에서 사용됩니다.",
        ],
        sources: [{ name: "출입국재류관리청 - 신규 입국자 안내", url: "https://www.moj.go.jp/isa/support/guidance/" }, portCity],
        lastVerified: "2026-09-26",
      },
      {
        id: "register-address",
        title: "주소 신고하기",
        description: "일본에서 살 주소가 정해졌다면 거주지의 시구정촌에서 주소 관련 신고를 하세요.",
        conditionNote: "새로 일본에 입국한 중장기재류자 등 주소 신고 대상자에게 해당합니다.",
        details: [
          "새로 일본에 입국한 중장기재류자는 주거지를 정한 날부터 14일 이내에 거주지의 시구정촌에 주거지를 신고해야 합니다.",
          "입국 시 재류카드를 교부받았다면 재류카드를 지참합니다.",
          "여권에 ‘재류카드를 후일 교부한다’는 취지의 기재가 있는 경우에는 해당 여권을 지참합니다.",
          "재류카드를 지참해 주민기본대장법상의 전입·전거 신고를 하면 입관법상의 주거지 신고도 함께 처리할 수 있습니다.",
        ],
        sources: [portCity, { name: "출입국재류관리청 - 주거지 신고 FAQ", url: "https://www.moj.go.jp/isa/publications/faq/newimmiact_4_q-and-a_page3.html" }],
        lastVerified: "2026-09-26",
      },
      {
        id: "check-my-number",
        title: "마이넘버 확인하기",
        description: "주민등록 후 본인에게 부여되는 마이넘버 관련 안내와 필요한 절차를 확인하세요.",
        conditionNote: "마이넘버와 마이넘버카드는 같은 것이 아니며, 카드 발급은 별도의 절차입니다.",
        details: [
          "주민표가 작성되는 외국인 주민에게도 마이넘버가 부여됩니다.",
          "마이넘버가 필요한 행정·세금·사회보장 절차가 있으므로 관련 안내를 확인하세요.",
          "마이넘버카드가 필요한 경우 별도로 신청 방법을 확인하세요.",
        ],
        sources: [guidebook, { name: "마이넘버카드 종합사이트", url: "https://www.kojinbango-card.go.jp/" }],
        lastVerified: "2026-09-26",
      },
      {
        id: "check-health-insurance",
        title: "건강보험 가입 상태 확인하기",
        description: "회사 건강보험 또는 국민건강보험 등 본인에게 적용되는 의료보험 가입 상태를 확인하세요.",
        conditionNote: "취업 상태, 체류 상황, 가족의 피부양자 여부 등에 따라 적용되는 건강보험이 달라질 수 있습니다.",
        details: [
          "회사에서 건강보험 적용 대상인지 먼저 확인하세요.",
          "회사 건강보험 등에 가입하지 않는 경우에는 국민건강보험 가입 대상인지 거주지의 시구정촌에서 확인하세요.",
          "본인의 상황에 따라 적용 조건이 달라질 수 있으므로 단순히 모든 외국인이 같은 절차를 밟는 것으로 판단하지 마세요.",
        ],
        sources: [guidebook], lastVerified: "2026-09-26",
      },
      {
        id: "check-pension",
        title: "연금 가입 상태 확인하기",
        description: "회사에서 후생연금에 가입하는지, 본인이 국민연금 관련 절차를 해야 하는지 확인하세요.",
        conditionNote: "나이와 취업 형태 등에 따라 가입 구분과 필요한 절차가 달라집니다.",
        details: [
          "국적과 관계없이 일본에 주소가 있는 20세 이상 60세 미만은 원칙적으로 국민연금의 적용 대상입니다.",
          "회사에서 후생연금에 가입한 사람은 국민연금의 제2호 피보험자가 됩니다.",
          "제2호 또는 제3호 피보험자에 해당하지 않는 20세 이상 60세 미만의 일본 거주자는 원칙적으로 국민연금 제1호 피보험자가 됩니다.",
          "취업 시작 전 기간이나 퇴직 후 후생연금 자격을 상실한 기간에도 국민연금 가입이 필요한 경우가 있으므로 공백이 없는지 확인하세요.",
        ],
        sources: [
          { name: "일본연금기구 - 외국인 근로자와 연금", url: "https://www.nenkin.go.jp/tokusetsu/gaikokujinkoyou.html" },
          { name: "일본연금기구 - National Pension Enrollment", url: "https://www.nenkin.go.jp/international/english/japanese-system/nationalpension/np_enroll.html" },
        ],
        lastVerified: "2026-09-26",
      },
    ],
  },
  {
    id: "daily-life",
    title: "3. 생활 기반 만들기",
    description: "행정 절차와 함께 일본에서 일상생활을 하기 위한 기본 환경을 준비해보세요.",
    items: [
      {
        id: "get-japanese-phone-number",
        title: "일본 전화번호 준비하기",
        description: "장기 거주에 사용할 일본 휴대폰 번호가 필요한지 확인하고 회선을 준비하세요.",
        conditionNote: "통신사와 요금제에 따라 계약 조건과 본인확인 방법이 다릅니다.",
        details: [
          "일본의 각종 서비스에서 SMS 인증이나 전화번호 입력이 필요한 경우가 있습니다.",
          "데이터 전용 회선과 음성·SMS가 가능한 회선의 차이를 확인하세요.",
          "계약 전 요금, 해지 조건, 데이터 용량 등을 확인하세요.",
        ],
        sources: [guidebook], lastVerified: "2026-09-26",
      },
      {
        id: "prepare-bank-account",
        title: "은행 계좌 준비하기",
        description: "급여 수령과 생활비 결제 등에 필요한 일본 은행 계좌를 준비하세요.",
        conditionNote: "은행마다 계좌 개설 조건과 필요한 서류, 심사 기준이 다를 수 있습니다.",
        details: [
          "급여를 받을 회사가 지정하거나 권장하는 은행이 있는지 먼저 확인하면 편리할 수 있습니다.",
          "재류카드, 주소, 전화번호 등 필요한 조건은 은행별로 확인하세요.",
        ],
        sources: [guidebook], lastVerified: "2026-09-26",
      },
      {
        id: "setup-utilities",
        title: "전기·가스·수도 준비하기",
        description: "입주할 집에서 전기·가스·수도를 언제부터 사용할 수 있는지 확인하세요.",
        conditionNote: "임대주택, 사택, 기숙사 등 거주 형태에 따라 직접 신청할 필요가 없을 수도 있습니다.",
        details: [
          "임대 계약이나 관리회사 안내에서 각 서비스의 신청 필요 여부를 확인하세요.",
          "입주일부터 사용할 수 있도록 필요한 경우 미리 신청하세요.",
          "가스는 종류와 계약에 따라 사용 시작 시 별도 절차가 필요한 경우가 있으므로 공급사업자의 안내를 확인하세요.",
        ],
        sources: [guidebook], lastVerified: "2026-09-26",
      },
      {
        id: "setup-home-internet",
        title: "집 인터넷 환경 준비하기",
        description: "집에서 사용할 인터넷 회선이나 모바일 통신 환경을 준비하세요.",
        conditionNote: "건물에 이미 인터넷이 포함되어 있거나 별도 공사가 필요한 경우 등 주거 형태에 따라 달라집니다.",
        details: [
          "임대 계약이나 관리회사 안내에서 인터넷 제공 여부를 확인하세요.",
          "별도 회선이 필요하다면 설치 가능 여부와 개통까지 걸리는 시간을 확인하세요.",
          "당장 사용할 인터넷이 없다면 임시 모바일 데이터 이용 방법도 준비해두면 편리합니다.",
        ],
        sources: [guidebook], lastVerified: "2026-09-26",
      },
      {
        id: "prepare-transport-card",
        title: "Suica·PASMO 등 교통수단 준비하기",
        description: "일상적인 이동에 사용할 교통카드나 모바일 교통수단을 준비하세요.",
        conditionNote: "사용 가능한 카드와 모바일 서비스는 기기, 발급 방식, 이용 지역 등에 따라 다를 수 있습니다.",
        details: [
          "본인이 주로 이용할 철도·버스에서 사용할 수 있는 교통수단을 확인하세요.",
          "실물 카드와 모바일 방식 중 본인에게 적합한 방법을 선택하세요.",
          "모바일 교통카드는 기기와 서비스 조건을 확인한 뒤 사용하세요.",
        ],
        sources: [guidebook], lastVerified: "2026-09-26",
      },
      {
        id: "install-essential-apps",
        title: "일본 생활 필수 앱 확인하기",
        description: "지도, 교통, 번역, 결제 등 일본 생활에 필요한 앱을 준비하세요.",
        details: ["지도와 길찾기", "전철·환승", "번역", "연락", "결제", "행정 서비스 등 본인에게 필요한 앱을 확인하세요."],
        sources: [{ name: "일생가 - 일본 필수 앱", url: "/apps" }],
        lastVerified: "2026-09-26",
      },
    ],
  },
];
