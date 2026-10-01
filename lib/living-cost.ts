export const EXPENSE_FIELDS = [
  { key: "rent", label: "월세", placeholder: "90000", description: "" },
  { key: "food", label: "식비", placeholder: "40000", description: "장보기·일상적인 식사 비용을 입력해주세요." },
  { key: "utilities", label: "전기·가스·수도", placeholder: "12000", description: "" },
  { key: "communication", label: "통신비", placeholder: "5000", description: "" },
  { key: "transport", label: "교통비", placeholder: "8000", description: "" },
  { key: "supplies", label: "생활용품", placeholder: "5000", description: "" },
  { key: "leisure", label: "취미·외식", placeholder: "20000", description: "취미·여가 목적의 외식이나 활동 비용입니다. 식비와 중복되지 않게 입력해주세요." },
  { key: "other", label: "기타", placeholder: "5000", description: "" },
] as const;

export type ExpenseKey = (typeof EXPENSE_FIELDS)[number]["key"];
export type LivingCostInput = { income: number } & Record<ExpenseKey, number>;
export type LivingCostDraft = Record<keyof LivingCostInput, string>;
export type LivingCostErrors = Partial<Record<keyof LivingCostInput, string>>;
export type LivingCostResult = {
  income: number;
  monthlyExpenses: number;
  balance: number;
  expenseRatio: number | null;
  savingsRatio: number | null;
  annualExpenses: number;
  annualBalance: number;
  expenses: { key: ExpenseKey; amount: number; ratio: number | null }[];
};

const fields = [{ key: "income", label: "월 실수령액" }, ...EXPENSE_FIELDS] as const;

export function createLivingCostDraft(initialIncome?: number): LivingCostDraft {
  return { income: initialIncome === undefined ? "" : String(initialIncome), rent: "", food: "", utilities: "", communication: "", transport: "", supplies: "", leisure: "", other: "" };
}

export function validateLivingCostInput(input: LivingCostInput): LivingCostErrors {
  const errors: LivingCostErrors = {};
  for (const { key, label } of fields) {
    if (!Number.isSafeInteger(input[key]) || input[key] < 0) {
      errors[key] = `${label}은 계산 가능한 범위의 0 이상 정수로 입력해주세요.`;
    }
  }
  if (Object.keys(errors).length) return errors;

  const total = EXPENSE_FIELDS.reduce((sum, { key }) => sum + input[key], 0);
  if (!Number.isSafeInteger(input.income * 12)) {
    errors.income = "월 실수령액의 연간 환산 금액이 계산 가능한 범위를 초과합니다.";
  }
  if (!Number.isSafeInteger(total) || !Number.isSafeInteger(total * 12)) {
    for (const { key } of EXPENSE_FIELDS) {
      if (input[key] > 0) errors[key] = "지출 합계 또는 연간 생활비가 계산 가능한 범위를 초과합니다. 금액을 줄여주세요.";
    }
  }
  if (!Object.keys(errors).length && !Number.isSafeInteger((input.income - total) * 12)) {
    errors.income = "연간 잔액이 계산 가능한 범위를 초과합니다.";
  }
  return errors;
}

export function parseLivingCostDraft(draft: LivingCostDraft): { input: LivingCostInput | null; errors: LivingCostErrors } {
  const errors: LivingCostErrors = {};
  const input = {} as LivingCostInput;
  for (const { key, label } of fields) {
    const raw = draft[key];
    if (raw === "" && key !== "income") {
      input[key] = 0;
    } else if (raw === "") {
      errors[key] = "월 실수령액을 입력해주세요. 수입이 없으면 0을 입력할 수 있습니다.";
    } else if (/[^0-9]/.test(raw)) {
      errors[key] = `${label}은 쉼표 없이 0 이상의 정수로 입력해주세요.`;
    } else {
      input[key] = Number(raw);
    }
  }
  if (Object.keys(errors).length) return { input: null, errors };
  const validationErrors = validateLivingCostInput(input);
  return { input: Object.keys(validationErrors).length ? null : input, errors: validationErrors };
}

export function parseIncomeQuery(value: string | string[] | undefined): number | undefined {
  if (typeof value !== "string" || value.length === 0 || /[^0-9]/.test(value)) return undefined;
  const income = Number(value);
  return Number.isSafeInteger(income) && Number.isSafeInteger(income * 12) ? income : undefined;
}

export function calculateLivingCost(input: LivingCostInput): LivingCostResult {
  if (Object.keys(validateLivingCostInput(input)).length) {
    throw new RangeError("생활비 입력값을 확인해주세요.");
  }
  const monthlyExpenses = EXPENSE_FIELDS.reduce((sum, { key }) => sum + input[key], 0);
  const balance = input.income - monthlyExpenses;
  return {
    income: input.income,
    monthlyExpenses,
    balance,
    expenseRatio: input.income === 0 ? null : monthlyExpenses / input.income * 100,
    savingsRatio: input.income === 0 ? null : balance / input.income * 100,
    annualExpenses: monthlyExpenses * 12,
    annualBalance: balance * 12,
    expenses: EXPENSE_FIELDS.map(({ key }) => ({ key, amount: input[key], ratio: monthlyExpenses === 0 ? null : input[key] / monthlyExpenses * 100 })),
  };
}
