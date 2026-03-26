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

/**
 * 2026년도 협회けんぽ 건강보험료율
 */
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

/**
 * 2026년도 보험 관련 상수
 */
const PENSION_RATE = 0.183;
const NURSING_RATE = 0.0162;
const CHILD_CARE_SUPPORT_RATE = 0.0023;

// 2026년도 일반 사업 고용보험 근로자 부담
const EMPLOYMENT_INSURANCE_RATE = 0.005;

/**
 * 표준보수월액을 결정하기 위한 구간
 *
 * 일반적인 급여 구간에서는 1만원 단위로
 * 표준보수월액을 결정하는 형태로 계산한다.
 *
 * 실제 협회けんぽ 보험료액표를 기반으로 한
 * "예상 계산"이며, 건강보험조합 가입자는
 * 실제 금액이 다를 수 있다.
 */
function getStandardMonthlyRemuneration(monthlySalary: number) {
  if (monthlySalary <= 63_000) return 58_000;
  if (monthlySalary <= 73_000) return 68_000;
  if (monthlySalary <= 83_000) return 78_000;
  if (monthlySalary <= 93_000) return 88_000;
  if (monthlySalary <= 101_000) return 98_000;
  if (monthlySalary <= 107_000) return 104_000;
  if (monthlySalary <= 114_000) return 110_000;
  if (monthlySalary <= 122_000) return 118_000;
  if (monthlySalary <= 130_000) return 126_000;
  if (monthlySalary <= 138_000) return 134_000;
  if (monthlySalary <= 146_000) return 142_000;
  if (monthlySalary <= 155_000) return 150_000;
  if (monthlySalary <= 165_000) return 160_000;
  if (monthlySalary <= 175_000) return 170_000;
  if (monthlySalary <= 185_000) return 180_000;
  if (monthlySalary <= 195_000) return 190_000;
  if (monthlySalary <= 210_000) return 200_000;
  if (monthlySalary <= 230_000) return 220_000;
  if (monthlySalary <= 250_000) return 240_000;
  if (monthlySalary <= 270_000) return 260_000;
  if (monthlySalary <= 290_000) return 280_000;
  if (monthlySalary <= 310_000) return 300_000;
  if (monthlySalary <= 330_000) return 320_000;
  if (monthlySalary <= 350_000) return 340_000;
  if (monthlySalary <= 370_000) return 360_000;
  if (monthlySalary <= 395_000) return 380_000;
  if (monthlySalary <= 425_000) return 410_000;
  if (monthlySalary <= 455_000) return 440_000;
  if (monthlySalary <= 485_000) return 470_000;
  if (monthlySalary <= 515_000) return 500_000;
  if (monthlySalary <= 545_000) return 530_000;
  if (monthlySalary <= 575_000) return 560_000;
  if (monthlySalary <= 605_000) return 590_000;
  if (monthlySalary <= 635_000) return 620_000;

  return 650_000;
}

/**
 * 보너스의 표준상여액
 *
 * 실제 제도에서는 보너스 지급액을 1,000엔 미만
 * 버린 금액을 사용한다.
 */
function getStandardBonus(bonus: number) {
  return Math.floor(bonus / 1_000) * 1_000;
}

/**
 * 2026년 급여소득공제
 */
function calculateEmploymentIncomeDeduction(annualIncome: number) {
  if (annualIncome <= 740_000) {
    return 0;
  }

  if (annualIncome <= 1_900_000) {
    return Math.max(740_000, annualIncome * 0.3 + 80_000);
  }

  if (annualIncome <= 3_600_000) {
    const base = Math.floor(annualIncome / 4_000) * 1_000;

    return base * 0.3 + 80_000;
  }

  if (annualIncome <= 6_600_000) {
    const base = Math.floor(annualIncome / 4_000) * 1_000;

    return base * 0.2 + 440_000;
  }

  if (annualIncome <= 8_500_000) {
    return annualIncome * 0.1 + 1_100_000;
  }

  return 1_950_000;
}

/**
 * 2026년 소득세 기초공제
 *
 * 2026년분은 12월 시행 개정의 영향을
 * 연말정산에 반영한다.
 */
function calculateBasicDeduction(income: number) {
  if (income <= 1_320_000) {
    return 1_040_000;
  }

  if (income <= 3_360_000) {
    return 880_000;
  }

  if (income <= 4_890_000) {
    return 680_000;
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
 * 소득세
 */
function calculateIncomeTax(taxableIncome: number) {
  const income = Math.floor(taxableIncome / 1_000) * 1_000;

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

  // 復興特別所得税 2.1%
  return Math.max(0, tax * 1.021);
}

/**
 * 표준보수월액으로 월 사회보험료 계산
 */
function calculateMonthlySocialInsurance(
  monthlySalary: number,
  age: number,
  prefecture: string,
) {
  const standard = getStandardMonthlyRemuneration(monthlySalary);

  const healthRate = HEALTH_RATES[prefecture] ?? HEALTH_RATES["東京"];

  const healthInsurance = (standard * healthRate) / 2;

  const nursingInsurance =
    age >= 40 && age <= 64 ? (standard * NURSING_RATE) / 2 : 0;

  const pension = (standard * PENSION_RATE) / 2;

  const childCareSupport = (standard * CHILD_CARE_SUPPORT_RATE) / 2;

  return {
    standard,
    healthInsurance,
    nursingInsurance,
    pension,
    childCareSupport,
  };
}

/**
 * 보너스 사회보험료
 */
function calculateBonusSocialInsurance(
  bonus: number,
  age: number,
  prefecture: string,
) {
  if (bonus <= 0) {
    return {
      healthInsurance: 0,
      nursingInsurance: 0,
      pension: 0,
      childCareSupport: 0,
    };
  }

  const standardBonus = getStandardBonus(bonus);

  const healthRate = HEALTH_RATES[prefecture] ?? HEALTH_RATES["東京"];

  const healthInsurance = (standardBonus * healthRate) / 2;

  const nursingInsurance =
    age >= 40 && age <= 64 ? (standardBonus * NURSING_RATE) / 2 : 0;

  const pension = (standardBonus * PENSION_RATE) / 2;

  const childCareSupport = (standardBonus * CHILD_CARE_SUPPORT_RATE) / 2;

  return {
    healthInsurance,
    nursingInsurance,
    pension,
    childCareSupport,
  };
}

/**
 * 주민세용 급여소득공제
 *
 * 주민세는 소득세와 일부 계산 방식이 다르므로
 * 여기서는 예상치로 계산한다.
 */
function calculateResidentSalaryIncome(annualIncome: number) {
  if (annualIncome <= 650_999) {
    return 0;
  }

  if (annualIncome <= 1_900_000) {
    return annualIncome - 650_000;
  }

  if (annualIncome <= 3_600_000) {
    const base = Math.floor(annualIncome / 4_000) * 1_000;

    return base * 0.3 + 80_000;
  }

  if (annualIncome <= 6_600_000) {
    const base = Math.floor(annualIncome / 4_000) * 1_000;

    return base * 0.2 + 440_000;
  }

  if (annualIncome <= 8_500_000) {
    return annualIncome * 0.1 + 1_100_000;
  }

  return 1_950_000;
}

/**
 * 메인 계산
 */
export function calculateSalary(input: SalaryInput): SalaryResult {
  const {
    monthlySalary,
    annualBonus,
    bonusPayments,
    age,
    prefecture,
    dependents,
    previousAnnualIncome,
  } = input;

  const annualSalary = monthlySalary * 12;

  const annualIncome = annualSalary + annualBonus;

  /*
   * 월급 사회보험
   */
  const monthlyInsurance = calculateMonthlySocialInsurance(
    monthlySalary,
    age,
    prefecture,
  );

  /*
   * 보너스 사회보험
   *
   * 보너스를 지급 횟수로 나누어
   * 각각의 지급액을 계산한다.
   */
  const bonusPerPayment = bonusPayments > 0 ? annualBonus / bonusPayments : 0;

  let bonusHealth = 0;
  let bonusNursing = 0;
  let bonusPension = 0;
  let bonusChildCare = 0;

  for (let i = 0; i < bonusPayments; i++) {
    const bonusInsurance = calculateBonusSocialInsurance(
      bonusPerPayment,
      age,
      prefecture,
    );

    bonusHealth += bonusInsurance.healthInsurance;

    bonusNursing += bonusInsurance.nursingInsurance;

    bonusPension += bonusInsurance.pension;

    bonusChildCare += bonusInsurance.childCareSupport;
  }

  const healthInsurance = monthlyInsurance.healthInsurance * 12 + bonusHealth;

  const nursingInsurance =
    monthlyInsurance.nursingInsurance * 12 + bonusNursing;

  const pension = monthlyInsurance.pension * 12 + bonusPension;

  const childCareSupport =
    monthlyInsurance.childCareSupport * 12 + bonusChildCare;

  /*
   * 고용보험
   *
   * 일반 사업 2026년도 근로자 부담 0.5%
   */
  const employmentInsurance = annualIncome * EMPLOYMENT_INSURANCE_RATE;

  const totalSocialInsurance =
    healthInsurance +
    nursingInsurance +
    pension +
    childCareSupport +
    employmentInsurance;

  /*
   * 소득세
   */
  const employmentIncomeDeduction =
    calculateEmploymentIncomeDeduction(annualIncome);

  const employmentIncome = Math.max(
    0,
    annualIncome - employmentIncomeDeduction,
  );

  const basicDeduction = calculateBasicDeduction(employmentIncome);

  const dependentDeduction = dependents * 380_000;

  const taxableIncome = Math.max(
    0,
    employmentIncome -
      totalSocialInsurance -
      basicDeduction -
      dependentDeduction,
  );

  const incomeTax = calculateIncomeTax(taxableIncome);

  /*
   * 주민세
   *
   * 주민세는 전년도 소득 기준이므로
   * 전년도 연봉을 별도로 사용한다.
   *
   * 전년도 사회보험은 정확한 과거 급여명세가
   * 없기 때문에 여기서는 현재 조건을 이용한
   * 예상치로 계산한다.
   */
  const previousSalaryIncome =
    calculateResidentSalaryIncome(previousAnnualIncome);

  const residentBasicDeduction = 430_000;

  const residentDependentDeduction = dependents * 330_000;

  const residentTaxableIncome = Math.max(
    0,
    previousSalaryIncome -
      residentBasicDeduction -
      residentDependentDeduction -
      totalSocialInsurance,
  );

  /*
   * 주민세 소득할
   * 도민세/都民税 + 特別区民税 등을 합쳐
   * 기본 10%로 계산
   */
  const residentIncomeTax = residentTaxableIncome * 0.1;

  /*
   * 균등할 + 森林環境税
   * 일반적인 경우를 단순화하여 5,000엔
   */
  const residentPerCapitaTax = residentTaxableIncome > 0 ? 5_000 : 0;

  const residentTax = residentIncomeTax + residentPerCapitaTax;

  const totalTax = incomeTax + residentTax;

  const annualTakeHome = annualIncome - totalSocialInsurance - totalTax;

  const monthlyTakeHome = annualTakeHome / 12;

  return {
    annualIncome,

    healthInsurance,

    nursingInsurance,

    pension,

    employmentInsurance,

    childCareSupport,

    incomeTax,

    residentTax,

    totalSocialInsurance,

    totalTax,

    annualTakeHome,

    monthlyTakeHome,
  };
}
