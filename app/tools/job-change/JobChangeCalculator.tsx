"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { PREFECTURES } from "@/lib/salary";
import { calculateJobChange, hasJobChangeErrors, validateJobChangeInput, type CommonInput, type JobCondition, type JobChangeInput, type JobChangeErrors, type JobChangeResult } from "@/lib/job-change";

const yen = (value: number) => `${new Intl.NumberFormat("ja-JP").format(value)}엔`;
const signedYen = (value: number) => `${value > 0 ? "+" : ""}${yen(value)}`;
const percent = (value: number) => new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1, signDisplay: "exceptZero" }).format(value) + "%";
const fieldClass = "min-w-0 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-lg outline-none focus-visible:border-gray-700 focus-visible:ring-2 focus-visible:ring-gray-200";

function NumberInput({ label, value, onChange, error, suffix = "엔", min = 0, max, description }: {
  label: string; value: number; onChange: (value: number) => void; error?: string; suffix?: string; min?: number; max?: number; description?: string;
}) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-2 flex items-center gap-2">
        <input id={id} type="number" value={Number.isFinite(value) ? value : ""} min={min} max={max} step={1}
          onChange={(event) => onChange(event.target.valueAsNumber)}
          aria-invalid={error ? true : undefined}
          aria-describedby={[`${id}-unit`, description && `${id}-description`, error && `${id}-error`].filter(Boolean).join(" ")}
          className={`${fieldClass} text-right`} />
        <span id={`${id}-unit`} className="shrink-0 text-gray-500">{suffix}</span>
      </div>
      {description && <p id={`${id}-description`} className="mt-2 text-xs leading-5 text-gray-500">{description}</p>}
      {error && <p id={`${id}-error`} className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}

function ConditionFields({ title, value, errors, onChange }: {
  title: string; value: JobCondition; errors: JobChangeErrors["current"]; onChange: (value: JobCondition) => void;
}) {
  const id = useId();
  function update<K extends keyof JobCondition>(key: K, next: JobCondition[K]) {
    onChange({ ...value, [key]: next });
  }
  return (
    <fieldset className="min-w-0 space-y-6">
      <legend className="mb-4 font-bold text-gray-900">{title}</legend>
      <NumberInput label="월급" value={value.monthlySalary} onChange={(next) => update("monthlySalary", next)} error={errors.monthlySalary} />
      <NumberInput label="연간 보너스 총액" value={value.annualBonus} onChange={(next) => update("annualBonus", next)} error={errors.annualBonus} description="1회 지급액이 아닌 1년 동안 받는 보너스의 합계입니다." />
      {value.annualBonus > 0 && <NumberInput label="보너스 지급 횟수" value={value.bonusPayments} onChange={(next) => update("bonusPayments", next)} error={errors.bonusPayments} suffix="회" min={1} max={3} />}
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">거주 지역</label>
        <select id={id} value={value.prefecture} onChange={(event) => update("prefecture", event.target.value)}
          aria-invalid={errors.prefecture ? true : undefined}
          aria-describedby={`${id}-description${errors.prefecture ? ` ${id}-error` : ""}`}
          className={`mt-2 ${fieldClass}`}>
          {PREFECTURES.map((prefecture) => <option key={prefecture} value={prefecture}>{prefecture}</option>)}
        </select>
        <p id={`${id}-description`} className="mt-2 text-xs leading-5 text-gray-500">협회けんぽ 가입자 기준입니다. 건강보험조합 가입자는 실제 금액이 다를 수 있습니다.</p>
        {errors.prefecture && <p id={`${id}-error`} className="mt-2 text-sm text-red-700">{errors.prefecture}</p>}
      </div>
    </fieldset>
  );
}

function ComparisonRow({ label, current, after, emphasizeDifference = false }: { label: string; current: number; after: number; emphasizeDifference?: boolean }) {
  return (
    <div className="min-w-0">
      <h3 className="text-sm font-bold text-gray-900">{label}</h3>
      <dl className="mt-3 grid gap-2 sm:grid-cols-3 sm:gap-4">
        {[
          { label: "현재", value: yen(current) },
          { label: "이직 후", value: yen(after) },
          { label: "차이", value: signedYen(after - current) },
        ].map((item) => (
          <div key={item.label} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 sm:block">
            <dt className="text-sm text-gray-500">{item.label}</dt>
            <dd className={`min-w-0 break-all text-right text-gray-900 sm:mt-1 sm:text-left ${emphasizeDifference && item.label === "차이" ? "font-semibold" : "font-medium"}`}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const initialCondition: JobCondition = { monthlySalary: 300000, annualBonus: 0, bonusPayments: 2, prefecture: "東京" };

export default function JobChangeCalculator() {
  const formRef = useRef<HTMLFormElement>(null);
  const [input, setInput] = useState<JobChangeInput>({
    common: { age: 33, dependents: 0, previousAnnualIncome: 3600000 },
    current: { ...initialCondition },
    after: { ...initialCondition },
  });
  const [errors, setErrors] = useState<JobChangeErrors>({ common: {}, current: {}, after: {} });
  const [result, setResult] = useState<JobChangeResult | null>(null);
  const [lastInput, setLastInput] = useState<JobChangeInput | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const isStale = lastInput !== null && (
    (Object.keys(input.common) as (keyof CommonInput)[]).some((key) => !Object.is(input.common[key], lastInput.common[key])) ||
    (["current", "after"] as const).some((side) =>
      (Object.keys(input[side]) as (keyof JobCondition)[]).some((key) => !Object.is(input[side][key], lastInput[side][key])))
  );

  function update<K extends keyof JobChangeInput>(group: K, value: JobChangeInput[K]) {
    setInput((previous) => ({ ...previous, [group]: value }));
    setAnnouncement("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateJobChangeInput(input);
    setErrors(nextErrors);
    if (hasJobChangeErrors(nextErrors)) {
      setAnnouncement("입력값을 확인해주세요. 공통 입력과 현재·이직 후 조건에 오류를 표시했습니다.");
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    const calculated = calculateJobChange(input);
    setResult(calculated);
    setLastInput(input);
    setAnnouncement(`비교가 완료되었습니다. 연간 예상 실수령액 차이 ${signedYen(calculated.difference.annualTakeHome)}, 월평균 차이 ${signedYen(calculated.difference.monthlyTakeHome)}입니다.`);
  }

  return (
    <div className="space-y-6">
      <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <fieldset className="space-y-6">
          <legend className="mb-4 text-lg font-bold text-gray-900">공통 입력</legend>
          <p className="text-sm leading-6 text-gray-500">같은 사람의 두 급여 조건을 비교합니다. 아래 정보는 양쪽에 동일하게 적용됩니다.</p>
          <NumberInput label="나이" value={input.common.age} onChange={(age) => update("common", { ...input.common, age })} error={errors.common.age} suffix="세" min={18} max={100} description="40~64세는 개호보험료가 추가됩니다." />
          <NumberInput label="부양가족 수" value={input.common.dependents} onChange={(dependents) => update("common", { ...input.common, dependents })} error={errors.common.dependents} suffix="명" />
          <NumberInput label="전년도 연봉" value={input.common.previousAnnualIncome} onChange={(previousAnnualIncome) => update("common", { ...input.common, previousAnnualIncome })} error={errors.common.previousAnnualIncome} description="주민세와 그 계산에 필요한 전년도 사회보험료 추정에 사용됩니다. 현재·이직 후 조건 모두 같은 전년도 연봉을 기준으로 비교합니다." />
        </fieldset>
        <div className="grid gap-8 border-t border-gray-200 pt-6 md:grid-cols-2">
          <ConditionFields title="현재 조건" value={input.current} errors={errors.current} onChange={(value) => update("current", value)} />
          <ConditionFields title="이직 후 조건" value={input.after} errors={errors.after} onChange={(value) => update("after", value)} />
        </div>
        <p className="text-xs leading-6 text-gray-500">보너스는 같은 보험연도(4월 1일~다음해 3월 31일)의 서로 다른 달에 같은 금액으로 지급된다고 가정합니다. 연 4회 이상, 같은 달 여러 번 지급하거나 보험연도를 걸치는 경우는 지원하지 않습니다.</p>
        <button type="submit" className="min-h-11 w-full rounded-xl bg-gray-900 px-5 py-4 font-bold text-white transition hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900">비교하기</button>
      </form>
      <p role="status" aria-atomic="true" className="sr-only">{announcement}</p>
      <div role="status">{isStale && <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">입력값이 변경되었습니다. 다시 비교해주세요.</p>}</div>
      {result && (
        <section aria-label={isStale ? "이전 입력 기준 비교 결과" : "이직 연봉 비교 결과"} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-gray-900 px-5 py-8 text-center text-white sm:px-6">
            <h2 className="text-sm text-gray-300">{isStale ? "이전 입력 기준 · " : ""}연간 예상 실수령액 {result.difference.annualTakeHome > 0 ? "증가" : result.difference.annualTakeHome < 0 ? "감소" : "동일"}</h2>
            <p className="mt-3 break-all text-3xl font-bold tracking-tight sm:text-4xl">{signedYen(result.difference.annualTakeHome)}</p>
            <p className="mt-3 text-sm text-gray-300">월평균 차이 <span className="break-all">{signedYen(result.difference.monthlyTakeHome)}</span></p>
            <p className="mt-3 text-xs leading-5 text-gray-400">세금·사회보험을 반영한 예상 실수령액 기준</p>
          </div>
          <div className="space-y-6 p-5 sm:p-6">
            <ComparisonRow label="예상 연 실수령액" current={result.current.annualTakeHome} after={result.after.annualTakeHome} emphasizeDifference />
            <ComparisonRow label="예상 월평균 실수령액" current={result.current.monthlyTakeHome} after={result.after.monthlyTakeHome} emphasizeDifference />
            <div className="border-t border-gray-200 pt-6">
              <ComparisonRow label="세전 예상 연봉" current={result.current.annualIncome} after={result.after.annualIncome} emphasizeDifference />
              <p className="mt-3 break-all text-sm text-gray-600">{result.annualIncomeChangeRate === null ? "기준 연봉이 0엔이므로 증감률을 계산하지 않습니다." : `현재 대비 증감률 ${percent(result.annualIncomeChangeRate)}`}</p>
            </div>
            <details className="border-t border-gray-200 pt-4">
              <summary className="min-h-11 cursor-pointer rounded py-3 text-sm font-bold text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-4">공제 내역 비교</summary>
              <div className="mt-4 space-y-6">
                <ComparisonRow label="사회보험 합계 (연간)" current={result.current.totalSocialInsurance} after={result.after.totalSocialInsurance} />
                <ComparisonRow label="소득세 (연간)" current={result.current.incomeTax} after={result.after.incomeTax} />
                <ComparisonRow label="주민세 (연간)" current={result.current.residentTax} after={result.after.residentTax} />
                <ComparisonRow label="세금 합계 (연간)" current={result.current.totalTax} after={result.after.totalTax} />
                <p className="text-xs leading-6 text-gray-500">공제 차이의 +는 공제액 증가, -는 공제액 감소입니다.</p>
              </div>
            </details>
            {!isStale && (
              <div className="border-t border-gray-200 pt-6">
                <Link href={`/tools/living-cost?income=${result.after.monthlyTakeHome}`} className="flex min-h-11 items-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900">이직 후 실수령액으로 생활비 계산하기 →</Link>
                <Link href={`/tools/living-cost?income=${result.current.monthlyTakeHome}`} className="mt-2 inline-flex min-h-11 items-center rounded text-sm text-gray-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">현재 실수령액으로 생활비 계산하기 →</Link>
                <p className="mt-2 text-xs leading-6 text-gray-500">보너스를 포함한 연 실수령액을 12개월로 나눈 월평균 기준입니다.</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
