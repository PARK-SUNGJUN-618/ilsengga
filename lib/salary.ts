export type SalaryInput = {
  monthlySalary: number;
  annualBonus: number;
  bonusPayments: number;
  age: number;
  prefecture: string;
  dependents: number;
  previousAnnualIncome: number;
};

export type SalaryResult = {
  annualIncome: number;

  healthInsurance: number;
  nursingInsurance: number;
  pension: number;
  employmentInsurance: number;
  childCareSupport: number;

  incomeTax: number;
  residentTax: number;

  totalSocialInsurance: number;
  totalTax: number;

  annualTakeHome: number;
  monthlyTakeHome: number;
};

export const HEALTH_RATES: Record<string, number> = {
  北海道: 0.1028,
  青森: 0.0985,
  岩手: 0.0951,
  宮城: 0.101,
  秋田: 0.1001,
  山形: 0.0975,
  福島: 0.095,
  茨城: 0.0952,
  栃木: 0.0982,
  群馬: 0.0968,
  埼玉: 0.0967,
  千葉: 0.0973,
  東京: 0.0985,
  神奈川: 0.0992,
  新潟: 0.0921,
  富山: 0.0959,
  石川: 0.097,
  福井: 0.0971,
  山梨: 0.0955,
  長野: 0.0963,
  岐阜: 0.098,
  静岡: 0.0961,
  愛知: 0.0993,
  三重: 0.0977,
  滋賀: 0.0988,
  京都: 0.0989,
  大阪: 0.1013,
  兵庫: 0.1012,
  奈良: 0.0991,
  和歌山: 0.1006,
  鳥取: 0.0986,
  島根: 0.0994,
  岡山: 0.1005,
  広島: 0.0978,
  山口: 0.1015,
  徳島: 0.1024,
  香川: 0.1002,
  愛媛: 0.0998,
  高知: 0.1005,
  福岡: 0.1011,
  佐賀: 0.1055,
  長崎: 0.1006,
  熊本: 0.1008,
  大分: 0.1008,
  宮崎: 0.0977,
  鹿児島: 0.1013,
  沖縄: 0.0944,
};

export const PREFECTURES = Object.keys(HEALTH_RATES);

// 2026年度
const PENSION_RATE = 0.183;
const EMPLOYMENT_INSURANCE_RATE = 0.005;
const NURSING_INSURANCE_RATE = 0.0162;
const CHILD_CARE_SUPPORT_RATE = 0.0023;

function floorTo1000(value: number) {
  return Math.floor(value / 1000) * 1000;
}

/**
 * 2026년 소득세용 급여소득 계산
 *
 * 2026년부터 급여소득공제 최소보장액이 74만엔.
 */
export function calculateIncomeSalary(annualIncome: number) {
  if (annualIncome <= 740_000) {
    return 0;
  }

  if (annualIncome <= 2_190_999) {
    return annualIncome - 740_000;
  }

  if (annualIncome <= 3_599_999) {
    const base = Math.floor(annualIncome / 4000) * 1000;

    return base * 2.8 - 80_000;
  }

  if (annualIncome <= 6_599_999) {
    const base = Math.floor(annualIncome / 4000) * 1000;

    return base * 3.2 - 440_000;
  }

  if (annualIncome <= 8_499_999) {
    return annualIncome * 0.9 - 1_100_000;
  }

  return annualIncome - 1_950_000;
}

/**
 * 2026년 소득세 기초공제
 */
function calculateBasicDeduction(income: number) {
  if (income <= 4_890_000) {
    return 1_040_000;
  }

  if (income <= 6_550_000) {
    return 670_000;
  }

  if (income <= 23_500_000) {
    return 620_000;
  }

  if (income <= 24_000_000) {
    return 480_000;
  }

  if (income <= 24_500_000) {
    return 320_000;
  }

  if (income <= 25_000_000) {
    return 160_000;
  }

  return 0;
}

/**
 * 소득세 계산
 */
function calculateIncomeTax(taxableIncome: number) {
  const income = Math.floor(taxableIncome / 1000) * 1000;

  if (income <= 0) {
    return 0;
  }

  let tax = 0;

  if (income <= 1_950_000) {
    tax = income * 0.05;
  } else if (income <= 3_300_000) {
    tax = income * 0.1 - 97_500;
  } else if (income <= 6_950_000) {
    tax = income * 0.2 - 427_500;
  } else if (income <= 9_000_000) {
    tax = income * 0.23 - 636_000;
  } else if (income <= 18_000_000) {
    tax = income * 0.33 - 1_536_000;
  } else if (income <= 40_000_000) {
    tax = income * 0.4 - 2_796_000;
  } else {
    tax = income * 0.45 - 4_796_000;
  }

  // 부흥특별소득세 2.1%
  return Math.max(0, tax * 1.021);
}

/**
 * 2026년도 주민세 계산용 급여소득
 *
 * 주민세는 전년도 소득을 기준으로 계산되므로
 * 전년도 연봉을 사용한다.
 */
function calculateResidentSalary(annualIncome: number) {
  if (annualIncome <= 650_999) {
    return 0;
  }

  if (annualIncome <= 1_900_000) {
    return annualIncome - 650_000;
  }

  if (annualIncome <= 3_599_999) {
    const base = Math.floor(annualIncome / 4000) * 1000;

    return base * 2.8 - 80_000;
  }

  if (annualIncome <= 6_599_999) {
    const base = Math.floor(annualIncome / 4000) * 1000;

    return base * 3.2 - 440_000;
  }

  if (annualIncome <= 8_499_999) {
    return annualIncome * 0.9 - 1_100_000;
  }

  return annualIncome - 1_950_000;
}

/**
 * 메인 계산 함수
 */
export function calculateSalary(input: SalaryInput): SalaryResult {
  const {
    monthlySalary,
    annualBonus,
    age,
    prefecture,
    dependents,
    previousAnnualIncome,
  } = input;

  const annualSalary = monthlySalary * 12;

  const annualIncome = annualSalary + annualBonus;

  const healthRate = HEALTH_RATES[prefecture] ?? HEALTH_RATES["東京"];

  /*
   * 실제 건강보험/후생연금은
   * 표준보수월액을 사용한다.
   *
   * 현재 버전은 예상 계산기이므로
   * 월급을 기준으로 계산한다.
   */
  const monthlyHealth = (monthlySalary * healthRate) / 2;

  const monthlyPension = (monthlySalary * PENSION_RATE) / 2;

  const monthlyChildCare = (monthlySalary * CHILD_CARE_SUPPORT_RATE) / 2;

  const monthlyNursing =
    age >= 40 && age <= 64 ? (monthlySalary * NURSING_INSURANCE_RATE) / 2 : 0;

  const annualHealth = monthlyHealth * 12;

  const annualPension = monthlyPension * 12;

  const annualChildCare = monthlyChildCare * 12;

  const annualNursing = monthlyNursing * 12;

  const employmentInsurance = annualIncome * EMPLOYMENT_INSURANCE_RATE;

  /*
   * 보너스에도 사회보험료가 발생하지만
   * 표준상여액 등의 상세 규정을 모두 반영하지 않은
   * 예상 계산이다.
   */
  const bonusHealth = (annualBonus * healthRate) / 2;

  const bonusPension = (annualBonus * PENSION_RATE) / 2;

  const bonusChildCare = (annualBonus * CHILD_CARE_SUPPORT_RATE) / 2;

  const bonusNursing =
    age >= 40 && age <= 64 ? (annualBonus * NURSING_INSURANCE_RATE) / 2 : 0;

  const totalHealth = annualHealth + bonusHealth;

  const totalPension = annualPension + bonusPension;

  const totalChildCare = annualChildCare + bonusChildCare;

  const totalNursing = annualNursing + bonusNursing;

  const totalSocialInsurance =
    totalHealth +
    totalPension +
    totalChildCare +
    totalNursing +
    employmentInsurance;

  /*
   * 소득세
   */
  const incomeSalary = calculateIncomeSalary(annualIncome);

  const basicDeduction = calculateBasicDeduction(incomeSalary);

  // 일반 부양가족 기준 1인 38万円
  const dependentDeduction = dependents * 380_000;

  const taxableIncome = Math.max(
    0,
    incomeSalary - totalSocialInsurance - basicDeduction - dependentDeduction,
  );

  const incomeTax = calculateIncomeTax(taxableIncome);

  /*
   * 주민세
   *
   * 전년도 소득을 기준으로
   * 대략적인 다음년도 주민세를 계산.
   */
  const previousSalaryIncome = calculateResidentSalary(previousAnnualIncome);

  const residentBasicDeduction = 430_000;

  const residentDependentDeduction = dependents * 330_000;

  const residentTaxableIncome = Math.max(
    0,
    previousSalaryIncome -
      residentBasicDeduction -
      residentDependentDeduction -
      totalSocialInsurance,
  );

  // 도민세 4% + 구민세/시민세 6%
  const residentIncomeTax = residentTaxableIncome * 0.1;

  // 균등할 + 森林環境税의 간이 반영
  const residentPerCapitaTax = residentTaxableIncome > 0 ? 5_000 : 0;

  const residentTax = residentIncomeTax + residentPerCapitaTax;

  const totalTax = incomeTax + residentTax;

  const annualTakeHome = annualIncome - totalSocialInsurance - totalTax;

  const monthlyTakeHome = annualTakeHome / 12;

  return {
    annualIncome,

    healthInsurance: totalHealth,

    nursingInsurance: totalNursing,

    pension: totalPension,

    employmentInsurance,

    childCareSupport: totalChildCare,

    incomeTax,

    residentTax,

    totalSocialInsurance,

    totalTax,

    annualTakeHome,

    monthlyTakeHome,
  };
}
