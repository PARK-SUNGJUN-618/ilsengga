"use client";

import { useState } from "react";
import { calculateSalary, PREFECTURES, type SalaryResult } from "@/lib/salary";

function formatYen(value: number) {
  return new Intl.NumberFormat("ja-JP").format(Math.round(value));
}

function Input({
  label,
  value,
  onChange,
  suffix,
  min = 0,
  step = 10000,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix?: string;
  min?: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="mt-2 flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-right text-lg outline-none transition focus:border-gray-700 focus:ring-2 focus:ring-gray-200"
        />

        {suffix && (
          <span className="whitespace-nowrap text-gray-500">{suffix}</span>
        )}
      </div>
    </div>
  );
}

function ResultRow({
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
        strong ? "text-lg font-bold text-gray-900" : "text-sm"
      }`}
    >
      <span className="text-gray-600">{label}</span>

      <span className="font-medium text-gray-900">
        {negative ? "-" : ""}¥{formatYen(value)}
      </span>
    </div>
  );
}

export default function SalaryCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(300000);

  const [annualBonus, setAnnualBonus] = useState(0);

  const [bonusPayments, setBonusPayments] = useState(2);

  const [age, setAge] = useState(33);

  const [prefecture, setPrefecture] = useState("東京");

  const [dependents, setDependents] = useState(0);

  const [previousAnnualIncome, setPreviousAnnualIncome] = useState(3600000);

  const [result, setResult] = useState<SalaryResult | null>(null);

  function handleCalculate() {
    const calculated = calculateSalary({
      monthlySalary,
      annualBonus,
      bonusPayments,
      age,
      prefecture,
      dependents,
      previousAnnualIncome,
    });

    setResult(calculated);
  }

  return (
    <div className="space-y-6">
      {/* 입력 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            급여 정보를 입력해주세요
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            일반적인 회사원 기준의 예상 실수령액입니다.
          </p>
        </div>

        <div className="space-y-6">
          <Input
            label="월급"
            value={monthlySalary}
            onChange={setMonthlySalary}
            suffix="円"
            step={10000}
          />

          <Input
            label="연간 보너스"
            value={annualBonus}
            onChange={setAnnualBonus}
            suffix="円"
            step={10000}
          />

          {annualBonus > 0 && (
            <Input
              label="보너스 지급 횟수"
              value={bonusPayments}
              onChange={setBonusPayments}
              suffix="회"
              min={1}
              step={1}
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              나이
            </label>

            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                value={age}
                min={18}
                max={100}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-right text-lg outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-200"
              />

              <span className="text-gray-500">세</span>
            </div>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              40~64세는 개호보험료가 추가됩니다.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              거주 지역
            </label>

            <select
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-200"
            >
              {PREFECTURES.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              협회けんぽ 기준입니다. 건강보험조합 가입자는 실제 보험료가 다를 수
              있습니다.
            </p>
          </div>

          <Input
            label="부양가족"
            value={dependents}
            onChange={setDependents}
            suffix="명"
            min={0}
            step={1}
          />

          <div>
            <Input
              label="전년도 연봉"
              value={previousAnnualIncome}
              onChange={setPreviousAnnualIncome}
              suffix="円"
              step={10000}
            />

            <p className="mt-2 text-xs leading-5 text-gray-500">
              주민세는 전년도 소득을 기준으로 계산되므로, 올해 연봉과 다를 수
              있습니다.
            </p>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full rounded-xl bg-gray-900 px-5 py-4 font-bold text-white transition hover:bg-gray-700 active:scale-[0.99]"
          >
            실수령액 계산하기
          </button>
        </div>
      </div>

      {/* 결과 */}
      {result && (
        <div className="space-y-6">
          {/* 메인 결과 */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="bg-gray-900 px-6 py-10 text-center text-white">
              <p className="text-sm text-gray-300">예상 월 실수령액</p>

              <p className="mt-3 text-4xl font-bold tracking-tight">
                ¥{formatYen(result.monthlyTakeHome)}
              </p>

              <p className="mt-3 text-sm text-gray-400">
                연간 실수령액을 12개월로 나눈 평균
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <ResultRow label="연간 총급여" value={result.annualIncome} />

                <div className="border-t pt-4">
                  <p className="mb-3 text-sm font-bold text-gray-900">
                    사회보험
                  </p>

                  <div className="space-y-3">
                    <ResultRow
                      label="건강보험"
                      value={result.healthInsurance}
                      negative
                    />

                    {result.nursingInsurance > 0 && (
                      <ResultRow
                        label="개호보험"
                        value={result.nursingInsurance}
                        negative
                      />
                    )}

                    <ResultRow
                      label="후생연금"
                      value={result.pension}
                      negative
                    />

                    <ResultRow
                      label="고용보험"
                      value={result.employmentInsurance}
                      negative
                    />

                    <ResultRow
                      label="자녀·육아지원금"
                      value={result.childCareSupport}
                      negative
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="mb-3 text-sm font-bold text-gray-900">세금</p>

                  <div className="space-y-3">
                    <ResultRow
                      label="소득세"
                      value={result.incomeTax}
                      negative
                    />

                    <ResultRow
                      label="주민세 예상액"
                      value={result.residentTax}
                      negative
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <ResultRow
                    label="연간 사회보험"
                    value={result.totalSocialInsurance}
                    negative
                  />

                  <div className="mt-3">
                    <ResultRow
                      label="연간 세금"
                      value={result.totalTax}
                      negative
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-gray-50 p-5">
                  <ResultRow
                    label="연간 예상 실수령액"
                    value={result.annualTakeHome}
                    strong
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 설명 */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">
              계산 결과를 어떻게 봐야 하나요?
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600">
              <p>
                <strong className="text-gray-900">월 실수령액</strong>은 연간
                예상 실수령액을 12개월로 나눈 평균 금액입니다.
              </p>

              <p>
                일본의 주민세는 전년도 소득을 기준으로 계산되기 때문에 이직이나
                취업 첫해에는 실제 급여명세서와 차이가 발생할 수 있습니다.
              </p>

              <p>
                또한 실제 건강보험과 후생연금은 표준보수월액 및 표준상여액을
                기준으로 계산되므로 이 계산 결과는
                <strong className="text-gray-900">예상치</strong>
                입니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 주의사항 */}
      <div className="rounded-xl bg-gray-50 p-5 text-xs leading-6 text-gray-500">
        ※ 본 계산 결과는 2026년 일본의 세금 및 사회보험 제도를 바탕으로 일반적인
        회사원 조건을 가정한 예상치입니다. 실제 금액은 건강보험조합,
        표준보수월액, 표준상여액, 부양가족의 조건, 각종 공제 및 전년도 소득 등에
        따라 달라질 수 있습니다.
      </div>
    </div>
  );
}
