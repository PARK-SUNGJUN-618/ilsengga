import type { ChecklistSection } from "@/data/checklist";

export const contentUpdatedAt = "2026-09-27";

export const japanTravelChecklist: ChecklistSection[] = [
  {
    id: "booking",
    title: "1. 여행 예약·기본 준비",
    items: [
      {
        id: "check-passport-entry",
        title: "여권·입국 조건 확인하기",
        description: "여권 유효기간과 본인의 일본 입국 조건을 출발 전에 확인하세요.",
        conditionNote: "한국 일반여권으로 관광 등 단기체재를 하는 경우 일본의 비자면제 대상에 포함되지만, 국적·여권 종류·체류 목적에 따라 조건이 달라질 수 있습니다.",
        details: [
          "일본 외무성의 현재 비자면제 대상에는 대한민국이 포함되어 있습니다.",
          "비자면제 대상 국가·지역의 일반적인 일본 체류기간은 한국을 포함해 90일입니다.",
          "취업이나 보수를 받는 활동 등은 일반적인 단기체재 비자면제와 조건이 다릅니다.",
          "항공권을 예약한 이름과 여권 영문 이름도 함께 확인하세요.",
          "출발 직전에는 일본 외무성 등 공식 안내에서 최신 입국 조건을 다시 확인하는 것이 좋습니다.",
        ],
        sources: [{ name: "일본 외무성 - Exemption of Visa (Short-Term Stay)", url: "https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html" }],
        lastVerified: "2026-09-27",
      },
      {
        id: "check-flight",
        title: "항공권 정보 확인하기",
        description: "출발·도착 공항, 터미널, 시간과 예약자 정보를 확인하세요.",
        details: [
          "같은 도시라도 이용 공항이 다를 수 있습니다.",
          "출발 전 항공사에서 운항시간과 터미널 변경 여부를 다시 확인하세요.",
          "예약번호와 항공권 정보를 휴대폰에서 바로 확인할 수 있게 준비해두면 편리합니다.",
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "check-accommodation",
        title: "숙소 예약 확인하기",
        description: "숙소 이름, 주소, 체크인 시간과 예약 정보를 확인하세요.",
        details: [
          "일본 도착 후 바로 확인할 수 있도록 숙소 주소를 저장해두세요.",
          "늦은 시간에 도착한다면 체크인 가능 시간을 확인하세요.",
          "공항에서 숙소까지 이동 방법도 함께 확인하면 좋습니다.",
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "plan-itinerary",
        title: "여행 일정·이동 동선 정리하기",
        description: "방문 지역과 주요 이동 경로를 미리 정리하세요.",
        details: [
          "모든 시간을 세세하게 정하기보다는 하루 단위의 주요 지역과 이동 경로를 정리하면 편리합니다.",
          "공항 이동이나 장거리 이동처럼 시간이 중요한 구간은 미리 확인하세요.",
          "영업시간이나 휴무일이 중요한 장소는 방문 전에 공식 정보를 다시 확인하세요.",
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "consider-travel-insurance",
        title: "해외여행보험 검토하기",
        description: "질병·사고·휴대품 문제 등에 대비해 여행보험이 필요한지 확인하세요.",
        details: [
          "일본 외무성과 JNTO도 해외여행 중 의료비와 긴급상황에 대비한 여행보험을 안내하고 있습니다.",
          "이미 보유한 카드 등에 여행 관련 보장이 있다면 보장 조건과 범위를 확인하세요.",
          "가입 여부와 보장 범위는 여행 일정과 개인 상황에 맞게 판단하세요.",
        ],
        sources: [
          { name: "일본 외무성 - VISA", url: "https://www.mofa.go.jp/j_info/visit/visa/" },
          { name: "JNTO - Staying Safe in Japan", url: "https://www.japan.travel/en/plan/emergencies/" },
        ],
        lastVerified: "2026-09-27",
      },
    ],
  },
  {
    id: "before-departure",
    title: "2. 출국 전 준비",
    items: [
      {
        id: "prepare-visit-japan-web",
        title: "Visit Japan Web 준비하기",
        description: "일본 입국심사·세관신고 정보를 미리 등록할지 확인하고 필요한 정보를 준비하세요.",
        conditionNote: "Visit Japan Web은 일본 디지털청의 입국 절차 지원 웹서비스입니다. 모든 여행자에게 단순히 '등록하지 않으면 입국할 수 없다'고 안내하지 마세요.",
        details: [
          "Visit Japan Web에서는 입국·귀국 일정과 입국심사·세관신고 등에 필요한 정보를 등록할 수 있습니다.",
          "외국인 여행자는 등록한 정보를 이용해 입국심사 및 세관신고용 QR 코드를 표시할 수 있습니다.",
          "이용하려면 이메일 주소, 여권 정보, 여행 일정 등의 정보가 필요할 수 있습니다.",
          "출발 전에 공식 사이트에서 현재 이용 방법을 확인하세요.",
        ],
        sources: [
          { name: "일본 디지털청 - Visit Japan Web", url: "https://www.digital.go.jp/policies/visit_japan_web" },
          { name: "Visit Japan Web - 이용 안내", url: "https://services.digital.go.jp/visit-japan-web/guide/" },
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "prepare-internet",
        title: "일본에서 사용할 인터넷 준비하기",
        description: "eSIM·SIM·로밍·포켓 Wi-Fi 중 사용할 방법을 준비하세요.",
        details: [
          "본인 휴대폰이 사용할 통신 방식과 eSIM을 지원하는지 확인하세요.",
          "여행 기간과 필요한 데이터 용량을 기준으로 선택하면 됩니다.",
          "공항 도착 직후 지도나 예약 정보를 확인할 수 있도록 개통 방법을 미리 알아두면 편리합니다.",
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "prepare-payment",
        title: "현금·카드 등 결제수단 준비하기",
        description: "해외 결제가 가능한 카드와 필요한 만큼의 현금을 준비하세요.",
        details: [
          "카드 한 장에만 의존하기보다 사용할 수 있는 결제수단을 나누어 준비하면 좋습니다.",
          "카드의 해외 이용 가능 여부와 해외 결제 관련 설정을 확인하세요.",
          "현금이 필요한 상황에 대비해 소액의 엔화를 준비하거나 현지에서 인출할 방법을 확인하세요.",
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "prepare-transport",
        title: "일본 교통 이용 방법 확인하기",
        description: "Suica·PASMO 같은 교통계 IC 카드와 필요한 승차권을 미리 확인하세요.",
        details: [
          "여행 지역과 이동 횟수에 따라 교통계 IC 카드, 개별 승차권, 각종 패스 중 적합한 방법이 달라질 수 있습니다.",
          "장거리 이동이나 신칸센을 이용한다면 별도 예약이 필요한지 확인하세요.",
          "휴대폰에서 교통계 IC 카드를 사용할 계획이라면 본인 기기의 지원 여부도 확인하세요.",
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "prepare-travel-apps",
        title: "일본 여행에 필요한 앱 준비하기",
        description: "지도·번역·교통·재난정보 등 여행 중 사용할 앱을 미리 준비하세요.",
        details: [
          "출발 전에 로그인이나 초기 설정까지 해두면 일본 도착 후 바로 사용할 수 있습니다.",
          "일생가의 일본 필수 앱 가이드에서 여행용 앱을 함께 확인할 수 있습니다.",
        ],
        sources: [{ name: "일생가 - 일본 필수 앱", url: "/apps" }],
        lastVerified: "2026-09-27",
      },
      {
        id: "prepare-power",
        title: "충전기·보조배터리 준비하기",
        description: "휴대폰과 여행 중 사용할 기기의 충전 수단을 확인하세요.",
        details: [
          "사용하는 충전기와 전자기기가 일본에서 사용할 수 있는 입력 전압을 지원하는지 제품 표시를 확인하세요.",
          "필요한 경우 플러그 형태도 확인하세요.",
          "보조배터리는 항공사의 기내 반입 규정을 출발 전에 확인하세요.",
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "check-restricted-items",
        title: "일본 반입 제한 물품 확인하기",
        description: "음식·식물·의약품 등 가져가는 물품이 일본 반입 규정에 해당하는지 확인하세요.",
        details: [
          "일본은 육류·육가공품과 과일·채소·식물 등에 검역 규정을 적용합니다.",
          "개인 소비용이나 소량이라고 해서 모든 물품이 허용되는 것은 아닙니다.",
          "진공포장이나 가열된 육가공품도 규제 대상이 될 수 있습니다.",
          "의약품은 종류와 양에 따라 별도의 Import Confirmation 또는 사전 허가가 필요할 수 있습니다.",
          "처방약이나 관리 대상 의약품을 가져간다면 출발 전에 일본 후생노동성의 최신 규정을 확인하세요.",
          "본인의 물품이 애매하다면 일반적인 여행 블로그보다 일본 정부의 공식 검역·세관 안내를 우선 확인하세요.",
        ],
        sources: [
          { name: "일본 농림수산성 - 일본 입국 시 검역 안내", url: "https://www.maff.go.jp/pps/j/pqaqinfo_en.html" },
          { name: "일본 동물검역소 - Bringing animal products into Japan", url: "https://www.maff.go.jp/aqs/english/product/import.html" },
          { name: "일본 후생노동성 - Bringing medicines for personal use into Japan", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iyakuhin/kojinyunyu/topics/tp010401-1_00001.html" },
          { name: "Japan Customs - Customs Guide", url: "https://www.customs.go.jp/zeikan/pamphlet/guide_e.pdf" },
        ],
        lastVerified: "2026-09-27",
      },
    ],
  },
  {
    id: "arrival",
    title: "3. 일본 도착 후",
    items: [
      {
        id: "complete-entry-procedures",
        title: "입국·세관 절차 진행하기",
        description: "도착 후 안내에 따라 입국심사와 세관 절차를 진행하세요.",
        details: [
          "Visit Japan Web에 정보를 등록했다면 해당 절차에서 필요한 QR 코드를 표시할 수 있도록 준비하세요.",
          "여권 등 입국에 필요한 서류는 위탁수하물에 넣지 말고 바로 꺼낼 수 있게 보관하세요.",
          "세관 신고 내용이 있다면 사실대로 신고하고 현장 안내를 따르세요.",
        ],
        sources: [
          { name: "Visit Japan Web - 이용 안내", url: "https://services.digital.go.jp/visit-japan-web/guide/" },
          { name: "Japan Customs - Customs Guide", url: "https://www.customs.go.jp/zeikan/pamphlet/guide_e.pdf" },
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "check-internet-connection",
        title: "인터넷 연결 확인하기",
        description: "공항을 나서기 전에 휴대폰 데이터 연결이 정상인지 확인하세요.",
        details: [
          "지도, 교통, 숙소 예약 정보를 열 수 있는지 확인하세요.",
          "eSIM이나 SIM을 사용하는 경우 데이터 회선 설정이 제대로 되어 있는지 확인하세요.",
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "check-airport-transfer",
        title: "공항에서 숙소까지 이동 방법 확인하기",
        description: "열차·버스 등 숙소까지의 이동 경로와 마지막 운행 시간을 확인하세요.",
        details: [
          "공항에서 같은 목적지로 가는 방법이 여러 가지일 수 있습니다.",
          "늦은 시간에 도착한다면 막차·막차 버스 시간을 특히 확인하세요.",
          "숙소 주소를 지도 앱에 저장해두면 도착 후 이동하기 편리합니다.",
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "setup-transit-card",
        title: "Suica·PASMO 등 교통수단 준비하기",
        description: "여행 중 사용할 교통계 IC 카드나 승차권을 준비하세요.",
        details: [
          "출국 전에 준비하지 않았다면 일본 도착 후 본인의 여행 지역과 기기에 맞는 이용 방법을 확인하세요.",
          "특정 카드나 모바일 방식이 모든 여행자·기기에서 동일하게 이용 가능하다고 단정하지 마세요.",
        ],
        lastVerified: "2026-09-27",
      },
      {
        id: "prepare-emergency-info",
        title: "긴급전화·재난정보 확인하기",
        description: "사고·질병·지진 등 긴급상황에 대비해 필요한 연락처와 정보 확인 방법을 알아두세요.",
        details: [
          "일본의 긴급 경찰 신고는 110입니다.",
          "화재·구급차는 119입니다.",
          "JNTO Japan Visitor Hotline은 외국인 여행자를 대상으로 24시간 365일 운영되며 한국어 지원이 안내되어 있습니다.",
          "Japan Visitor Hotline: 050-3816-2787",
          "해외에서 전화할 경우: +81-50-3816-2787",
          "JNTO는 여행자를 위한 재난·안전 정보와 Safety Tips 앱도 안내하고 있습니다.",
        ],
        sources: [
          { name: "JNTO - 일본 방문자 핫라인", url: "https://www.japan.travel/ko/plan/hotline/" },
          { name: "JNTO - 안전한 일본 여행", url: "https://www.japan.travel/ko/plan/emergencies/" },
        ],
        lastVerified: "2026-09-27",
      },
    ],
  },
];
