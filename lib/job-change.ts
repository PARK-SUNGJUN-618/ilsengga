import { calculateSalary, validateSalaryInput, type SalaryInput, type SalaryInputErrors, type SalaryResult } from "./salary";

export type CommonInput = Pick<SalaryInput, "age" | "dependents" | "previousAnnualIncome">;
export type JobCondition = Omit<SalaryInput, keyof CommonInput>;
export type JobChangeInput = { common: CommonInput; current: JobCondition; after: JobCondition };
export type JobChangeErrors = {
  common: Partial<Record<keyof CommonInput, string>>;
  current: Partial<Record<keyof JobCondition, string>>;
  after: Partial<Record<keyof JobCondition, string>>;
};
export type JobChangeResult = {
  current: SalaryResult;
  after: SalaryResult;
  difference: Pick<SalaryResult, "annualIncome" | "annualTakeHome" | "monthlyTakeHome">;
  annualIncomeChangeRate: number | null;
};

function salaryInput(common: CommonInput, condition: JobCondition): SalaryInput {
  return { ...condition, ...common, bonusPayments: condition.annualBonus === 0 ? 0 : condition.bonusPayments };
}

export function validateJobChangeInput(input: JobChangeInput): JobChangeErrors {
  const errors: JobChangeErrors = { common: {}, current: {}, after: {} };
  for (const side of ["current", "after"] as const) {
    const salaryErrors: SalaryInputErrors = validateSalaryInput(salaryInput(input.common, input[side]));
    for (const field of ["age", "dependents", "previousAnnualIncome"] as const) {
      if (salaryErrors[field]) errors.common[field] = salaryErrors[field];
    }
    for (const field of ["monthlySalary", "annualBonus", "bonusPayments", "prefecture"] as const) {
      if (salaryErrors[field]) errors[side][field] = salaryErrors[field];
    }
  }
  return errors;
}

export function hasJobChangeErrors(errors: JobChangeErrors): boolean {
  return Object.values(errors).some((group) => Object.keys(group).length > 0);
}

export function calculateJobChange(input: JobChangeInput): JobChangeResult {
  const errors = validateJobChangeInput(input);
  if (hasJobChangeErrors(errors)) {
    throw new RangeError("공통 입력과 현재·이직 후 조건의 오류를 확인해주세요.");
  }
  const current = calculateSalary(salaryInput(input.common, input.current));
  const after = calculateSalary(salaryInput(input.common, input.after));
  const difference = {
    annualIncome: after.annualIncome - current.annualIncome,
    annualTakeHome: after.annualTakeHome - current.annualTakeHome,
    // 이미 반올림된 salary 반환값을 직접 비교합니다.
    monthlyTakeHome: after.monthlyTakeHome - current.monthlyTakeHome,
  };
  return {
    current,
    after,
    difference,
    annualIncomeChangeRate: current.annualIncome === 0 ? null : difference.annualIncome / current.annualIncome * 100,
  };
}
