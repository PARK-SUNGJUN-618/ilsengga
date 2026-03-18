"use client";

import { useState } from "react";

function formatYen(value: number) {
  return new Intl.NumberFormat("ja-JP").format(Math.round(value));
}

export default function SalaryCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(300000);
  const [bonus, setBonus] = useState(0);
  const [age, setAge] = useState(30);
  const [dependents, setDependents] = useState(0);

  const [result, setResult] = useState<{
    annualIncome: number;
    healthInsurance: number;
    pension: number;
    employmentInsurance: number;
    incomeTax: number;
    residentTax: number;
    annualTakeHome: number;
    monthlyTakeHome: number;
  } | null>(null);

  function calculate() {
    const annualIncome = monthlySalary * 12 + bonus;

    // 2026년 도쿄 협회けんぽ 기준의 단순 예상치
    const healthRate = 0.0985;
    const pensionRate = 0.183;
    const employmentRate = 0.005;

    const annualHealthInsurance = (monthlySalary * 12 * healthRate) / 2;

    const annualPension = (monthlySalary * 12 * pensionRate) / 2;

    const annualEmploymentInsurance = annualIncome * employmentRate;

    // 40~64세는 개호보험 등을 고려해 추가 차감
    const careInsurance =
      age >= 40 && age <= 64 ? (monthlySalary * 12 * 0.0162) / 2 : 0;

    const socialInsurance =
      annualHealthInsurance +
      annualPension +
      annualEmploymentInsurance +
      careInsurance;

    // 간이 급여소득공제
    const salaryDeduction =
      annualIncome <= 1900000
        ? 650000
        : annualIncome <= 3600000
          ? annualIncome * 0.3 + 80000
          : annualIncome <= 6600000
            ? annualIncome * 0.2 + 440000
            : annualIncome <= 8500000
              ? annualIncome * 0.1 + 1100000
              : 1950000;

    const salaryIncome = Math.max(0, annualIncome - salaryDeduction);

    // 2026년 기준 단순화한 기본공제
    const basicDeduction =
      salaryIncome <= 1320000
        ? 950000
        : salaryIncome <= 3360000
          ? 880000
          : salaryIncome <= 4890000
            ? 680000
            : salaryIncome <= 6550000
              ? 630000
              : 580000;

    const taxableIncome = Math.max(
      0,
      salaryIncome - socialInsurance - basicDeduction - dependents * 380000,
    );

    let incomeTax = 0;

    if (taxableIncome <= 1950000) {
      incomeTax = taxableIncome * 0.05;
    } else if (taxableIncome <= 3300000) {
      incomeTax = taxableIncome * 0.1 - 97500;
    } else if (taxableIncome <= 6950000) {
      incomeTax = taxableIncome * 0.2 - 427500;
    } else if (taxableIncome <= 9000000) {
      incomeTax = taxableIncome * 0.23 - 636000;
    } else if (taxableIncome <= 18000000) {
      incomeTax = taxableIncome * 0.33 - 1536000;
    } else if (taxableIncome <= 40000000) {
      incomeTax = taxableIncome * 0.4 - 2796000;
    } else {
      incomeTax = taxableIncome * 0.45 - 4796000;
    }

    // 부흥특별소득세 2.1%
    incomeTax *= 1.021;

    // 주민세는 매우 단순화한 예상치
    const residentTax =
      Math.max(
        0,
        (salaryIncome - socialInsurance - 430000 - dependents * 330000) * 0.1,
      ) + 5000;

    const annualTakeHome =
      annualIncome - socialInsurance - incomeTax - residentTax;

    const monthlyTakeHome = annualTakeHome / 12;

    setResult({
      annualIncome,
      healthInsurance: annualHealthInsurance,
      pension: annualPension,
      employmentInsurance: annualEmploymentInsurance,
      incomeTax,
      residentTax,
      annualTakeHome,
      monthlyTakeHome,
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              월급
            </label>

            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="w-full rounded-lg border px-4 py-3 text-right text-lg outline-none focus:border-gray-500"
                min="0"
                step="10000"
              />

              <span className="text-gray-500">円</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              연간 보너스
            </label>

            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                value={bonus}
                onChange={(e) => setBonus(Number(e.target.value))}
                className="w-full rounded-lg border px-4 py-3 text-right text-lg outline-none focus:border-gray-500"
                min="0"
                step="10000"
              />

              <span className="text-gray-500">円</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              나이
            </label>

            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full rounded-lg border px-4 py-3 text-right text-lg outline-none focus:border-gray-500"
                min="18"
                max="100"
              />

              <span className="text-gray-500">세</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              부양가족
            </label>

            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                value={dependents}
                onChange={(e) => setDependents(Number(e.target.value))}
                className="w-full rounded-lg border px-4 py-3 text-right text-lg outline-none focus:border-gray-500"
                min="0"
                max="10"
              />

              <span className="text-gray-500">명</span>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-700"
          >
            실수령액 계산하기
          </button>
        </div>
      </div>

      {result && (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="bg-gray-900 px-6 py-8 text-center text-white">
            <p className="text-sm text-gray-300">예상 월 실수령액</p>

            <p className="mt-2 text-4xl font-bold">
              ¥{formatYen(result.monthlyTakeHome)}
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-3 text-sm">
              <Row label="연간 총급여" value={result.annualIncome} />

              <Row label="건강보험" value={result.healthInsurance} negative />

              <Row label="후생연금" value={result.pension} negative />

              <Row
                label="고용보험"
                value={result.employmentInsurance}
                negative
              />

              <Row label="소득세" value={result.incomeTax} negative />

              <Row label="주민세 예상액" value={result.residentTax} negative />

              <div className="my-4 border-t" />

              <Row
                label="연간 예상 실수령액"
                value={result.annualTakeHome}
                strong
              />
            </div>
          </div>
        </div>
      )}

      <p className="text-xs leading-6 text-gray-500">
        ※ 본 계산 결과는 일반적인 조건을 기준으로 계산한 예상치입니다. 실제
        실수령액은 거주 지역, 건강보험조합, 표준보수월액, 나이, 부양가족, 각종
        소득공제 및 전년도 소득 등에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  negative = false,
  strong = false,
}: {
  label: string;
  value: number;
  negative?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between ${
        strong ? "text-lg font-bold" : ""
      }`}
    >
      <span className="text-gray-600">{label}</span>

      <span className={negative ? "text-gray-700" : ""}>
        {negative ? "-" : ""}¥{formatYen(value)}
      </span>
    </div>
  );
}
