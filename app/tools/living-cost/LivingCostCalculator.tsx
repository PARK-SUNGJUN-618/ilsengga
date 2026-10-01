"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { calculateLivingCost, createLivingCostDraft, EXPENSE_FIELDS, parseLivingCostDraft, type LivingCostDraft, type LivingCostErrors, type LivingCostResult } from "@/lib/living-cost";

const yen = (value: number) => `${new Intl.NumberFormat("ja-JP").format(value)}엔`;
const percent = (value: number) => `${new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value)}%`;

function MoneyInput({ label, value, onChange, placeholder, description, error, required = false }: {
  label: string; value: string; onChange: (value: string) => void; placeholder: string; description?: string; error?: string; required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}{required && " (필수)"}</label>
      <div className="mt-2 flex items-center gap-2">
        <input id={id} name={id} type="text" inputMode="numeric" required={required} value={value} placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={[`${id}-unit`, description && `${id}-description`, error && `${id}-error`].filter(Boolean).join(" ")}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-right text-lg outline-none transition focus-visible:border-gray-700 focus-visible:ring-2 focus-visible:ring-gray-200" />
        <span id={`${id}-unit`} className="shrink-0 text-gray-500">엔</span>
      </div>
      {description && <p id={`${id}-description`} className="mt-2 text-xs leading-5 text-gray-500">{description}</p>}
      {error && <p id={`${id}-error`} className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"><dt className="text-sm text-gray-600">{label}</dt><dd className="min-w-0 break-all text-right font-medium text-gray-900">{value}</dd></div>;
}

export default function LivingCostCalculator({ initialIncome }: { initialIncome?: number }) {
  const [draft, setDraft] = useState(() => createLivingCostDraft(initialIncome));
  const [errors, setErrors] = useState<LivingCostErrors>({});
  const [result, setResult] = useState<LivingCostResult | null>(null);
  const [lastDraft, setLastDraft] = useState<LivingCostDraft | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const isStale = lastDraft !== null && (Object.keys(draft) as (keyof LivingCostDraft)[]).some((key) => draft[key] !== lastDraft[key]);

  function update(key: keyof LivingCostDraft, value: string) {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setAnnouncement("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseLivingCostDraft(draft);
    setErrors(parsed.errors);
    if (!parsed.input) {
      setAnnouncement("입력값을 확인해주세요. 오류가 있는 항목에 안내를 표시했습니다.");
      requestAnimationFrame(() => {
        document.querySelector<HTMLInputElement>('input[aria-invalid="true"]')?.focus();
      });
      return;
    }
    const calculated = calculateLivingCost(parsed.input);
    setResult(calculated);
    setLastDraft({ ...draft });
    setAnnouncement(`계산이 완료되었습니다. 월 생활비 ${yen(calculated.monthlyExpenses)}, 매달 ${calculated.balance < 0 ? "부족한" : "남는"} 돈 ${yen(Math.abs(calculated.balance))}입니다.`);
  }

  return (
    <div className="space-y-6">
      <form noValidate onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold text-gray-900">한 달 수입과 지출을 입력해주세요</h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">금액은 엔 단위 정수로 입력해주세요. 빈 지출 항목은 0엔으로 계산하며, 입력란의 예시는 계산에 포함되지 않습니다.</p>
        <div className="mt-6 space-y-6">
          <MoneyInput label="월 실수령액" value={draft.income} onChange={(value) => update("income", value)} placeholder="300000" required error={errors.income}
            description="급여 계산기에서 가져온 금액은 보너스를 포함한 연간 실수령액을 12개월로 나눈 월평균입니다. 실제 월 수입에 맞게 수정할 수 있습니다." />
          <p className="text-sm leading-6 text-gray-600">월 실수령액을 모르시나요?<br /><Link href="/tools/salary" className="inline-flex min-h-11 items-center rounded font-medium text-gray-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">일본 월급 실수령액 계산하기 →</Link></p>
          <fieldset className="space-y-6">
            <legend className="mb-4 font-bold text-gray-900">월 지출</legend>
            {EXPENSE_FIELDS.map(({ key, ...field }) => <MoneyInput key={key} {...field} value={draft[key]} onChange={(value) => update(key, value)} error={errors[key]} />)}
          </fieldset>
          <button type="submit" className="min-h-11 w-full rounded-xl bg-gray-900 px-5 py-4 font-bold text-white transition hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900">생활비 계산하기</button>
        </div>
      </form>
      <p role="status" aria-atomic="true" className="sr-only">{announcement}</p>
      <div role="status">{isStale && <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">입력값이 변경되었습니다. 다시 계산해주세요.</p>}</div>
      {result && (
        <section aria-label={isStale ? "이전 입력 기준 계산 결과" : "생활비 계산 결과"} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-gray-900 px-5 py-8 text-center text-white sm:px-6">
            <h2 className="text-sm text-gray-300">{isStale ? "이전 입력 기준 · " : ""}{result.balance < 0 ? "매달 부족한 돈" : "매달 남는 돈"}</h2>
            <p className="mt-3 break-all text-3xl font-bold tracking-tight sm:text-4xl">{yen(Math.abs(result.balance))}</p>
            {result.balance < 0 && <p className="mt-3 text-sm text-gray-300">월 생활비가 월 실수령액보다 많습니다.</p>}
          </div>
          <div className="space-y-6 p-5 sm:p-6">
            <dl className="space-y-4">
              <ResultRow label="월 실수령액" value={yen(result.income)} />
              <ResultRow label="월 생활비" value={yen(result.monthlyExpenses)} />
              {result.savingsRatio !== null && result.balance >= 0 && <ResultRow label="저축 가능 비율" value={percent(result.savingsRatio)} />}
              {result.expenseRatio !== null && <ResultRow label="수입 대비 지출" value={percent(result.expenseRatio)} />}
              <ResultRow label="연간 예상 생활비" value={yen(result.annualExpenses)} />
              <ResultRow label={result.annualBalance < 0 ? "연간 예상 부족액" : "연간 예상 잔액"} value={yen(Math.abs(result.annualBalance))} />
            </dl>
            {result.income === 0 && <p className="text-sm leading-6 text-gray-600">수입이 0엔이므로 비율을 계산하지 않습니다.</p>}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-gray-900">지출 구성</h3>
              {result.monthlyExpenses === 0 ? <p className="mt-3 text-sm text-gray-500">지출 없음</p> : (
                <ul className="mt-4 space-y-4">
                  {result.expenses.filter((expense) => expense.amount > 0).map((expense) => (
                    <li key={expense.key}>
                      <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm">
                        <span className="text-gray-700">{EXPENSE_FIELDS.find((field) => field.key === expense.key)?.label}</span>
                        <span className="min-w-0 break-all text-gray-600">{yen(expense.amount)} · {percent(expense.ratio!)}</span>
                      </div>
                      <div aria-hidden="true" className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-gray-700" style={{ width: `${expense.ratio}%` }} /></div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
