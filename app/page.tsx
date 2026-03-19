import Header from "./components/Header";
import CategorySection from "./components/CategorySection";

const categories = [
  {
    title: "💰 돈",
    description: "일본에서 벌고 쓰는 돈을 쉽게 계산해보세요.",
    tools: [
      {
        title: "일본 월급 실수령액 계산기",
        description: "월급을 입력하면 예상 실수령액을 확인할 수 있어요.",
        href: "/tools/salary",
        badge: "NEW",
      },
      {
        title: "일본 연봉 계산기",
        description: "연봉을 기준으로 월급과 실수령액을 확인해보세요.",
        href: "/tools/annual-salary",
        badge: "준비중",
      },
    ],
  },

  {
    title: "💼 직장",
    description: "일본에서 일하고 이직할 때 필요한 도구입니다.",
    tools: [
      {
        title: "이직 연봉 비교",
        description: "현재 직장과 이직 후 연봉을 비교해보세요.",
        href: "/tools/job-change",
        badge: "NEW",
      },
      {
        title: "일본 잔업수당 계산기",
        description: "잔업시간과 시급을 기준으로 잔업수당을 계산해보세요.",
        href: "/tools/overtime",
        badge: "준비중",
      },
    ],
  },

  {
    title: "🏠 생활",
    description: "일본에서 생활하면서 자주 필요한 계산과 정보입니다.",
    tools: [
      {
        title: "일본 생활비 계산기",
        description: "월세와 생활비를 입력해서 한 달 지출을 계산해보세요.",
        href: "/tools/living-cost",
        badge: "준비중",
      },
      {
        title: "일본 이사 비용 계산기",
        description: "일본에서 이사할 때 예상되는 비용을 확인해보세요.",
        href: "/tools/moving-cost",
        badge: "준비중",
      },
    ],
  },

  {
    title: "✈️ 여행",
    description: "일본 여행을 조금 더 편하게 만들어주는 도구입니다.",
    tools: [
      {
        title: "일본 여행 예산 계산기",
        description:
          "항공권, 숙박, 교통비 등을 입력해서 여행 예산을 계산해보세요.",
        href: "/tools/travel-budget",
        badge: "준비중",
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center">
            <p className="text-sm font-medium text-gray-500">
              JaLiSim · Japan Life, Simplified.
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              일생가
            </h1>

            <p className="mt-5 text-xl font-medium text-gray-700">
              일본 생활 가능하세요?
            </p>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              일본에서 살아가면서 한 번쯤 필요했던 생활 도구를 한곳에서 쉽게
              이용해보세요.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 pb-20">
          {categories.map((category) => (
            <CategorySection
              key={category.title}
              title={category.title}
              description={category.description}
              tools={category.tools}
            />
          ))}
        </div>
      </main>
    </>
  );
}
