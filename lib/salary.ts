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
 * ============================================================
 * 2026년 협회けんぽ 건강보험료율
 * ============================================================
 *
 * 2026년도 기준
 *
 * 건강보험:
 * - 가나가와 9.92%
 *
 * 개호보험:
 * - 2026년 2월분까지: 1.59%
 * - 2026년 3월분부터: 1.62%
 *
 * 자녀·육아지원금:
 * - 2026년 4월분부터: 0.23%
 *
 * 모두 근로자와 회사가 절반씩 부담.
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
 * ============================================================
 * 保険료율
 * ============================================================
 */

const PENSION_RATE = 0.183;

// 2026년 2월분까지
const NURSING_RATE_2025 = 0.0159;

// 2026년 3월분부터
const NURSING_RATE_2026 = 0.0162;

// 2026년 4월분부터
const CHILD_CARE_SUPPORT_RATE = 0.0023;

// 고용보험
//
// 2025년도 일반사업 근로자 부담: 0.55%
// 2026년도 일반사업 근로자 부담: 0.50%
const EMPLOYMENT_INSURANCE_RATE_2025 = 0.0055;
const EMPLOYMENT_INSURANCE_RATE_2026 = 0.005;

/**
 * ============================================================
 * 표준보수월액
 * ============================================================
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
 * ============================================================
 * 표준상여액
 * ============================================================
 */

function getStandardBonus(bonus: number) {
  return Math.floor(bonus / 1_000) * 1_000;
}

/**
 * ============================================================
 * 2026년 급여소득공제
 * ============================================================
 *
 * 2026년 소득세 기준.
 *
 * 220만원 초과 구간에서는 기존 방식과 동일하며,
 * 2026년에는 급여소득공제 최저보장액이 74만원으로 변경됨.
 */

function calculateEmploymentIncomeDeduction(annualIncome: number) {
  if (annualIncome <= 0) {
    return 0;
  }

  // 190만원 이하
  if (annualIncome <= 1_900_000) {
    return Math.max(740_000, annualIncome * 0.3 + 80_000);
  }

  // 190만원 초과 ~ 360만원 이하
  if (annualIncome <= 3_600_000) {
    return annualIncome * 0.3 + 80_000;
  }

  // 360만원 초과 ~ 660만원 이하
  if (annualIncome <= 6_600_000) {
    return annualIncome * 0.2 + 440_000;
  }

  // 660만원 초과 ~ 850만원 이하
  if (annualIncome <= 8_500_000) {
    return annualIncome * 0.1 + 1_100_000;
  }

  // 850만원 초과
  return 1_950_000;
}

/**
 * ============================================================
 * 2026년 소득세 기초공제
 * ============================================================
 *
 * 2026년분 소득세.
 *
 * 합계소득금액 기준:
 *
 * 132만원 이하             → 104만원
 * 132만원 초과~336만원     → 88만원
 * 336만원 초과~489만원     → 68만원
 * 489만원 초과~655만원     → 67만원
 * 655만원 초과~2350만원    → 62만원
 * ...
 */

function calculateIncomeTaxBasicDeduction(totalIncome: number) {
  if (totalIncome <= 1_320_000) {
    return 1_040_000;
  }

  if (totalIncome <= 3_360_000) {
    return 880_000;
  }

  if (totalIncome <= 4_890_000) {
    return 680_000;
  }

  if (totalIncome <= 6_550_000) {
    return 670_000;
  }

  if (totalIncome <= 23_500_000) {
    return 620_000;
  }

  if (totalIncome <= 24_000_000) {
    return 480_000;
  }

  if (totalIncome <= 24_500_000) {
    return 320_000;
  }

  if (totalIncome <= 25_000_000) {
    return 160_000;
  }

  return 0;
}

/**
 * ============================================================
 * 소득세 계산
 * ============================================================
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

  /**
   * 2026년분은 현재 부흥특별소득세 2.1% 적용.
   *
   * 1.1%로 변경되는 것은 2027년분부터.
   */
  return Math.max(0, Math.floor(tax * 1.021));
}

/**
 * ============================================================
 * 월급 사회보험료
 * ============================================================
 *
 * 2026년:
 *
 * 건강보험
 * → 12개월 모두 2026년 요율
 *
 * 개호보험
 * → 1~2월: 1.59%
 * → 3~12월: 1.62%
 *
 * 자녀·육아지원금
 * → 4~12월: 0.23%
 */

function calculateMonthlySocialInsurance2026(
  monthlySalary: number,
  age: number,
  prefecture: string,
) {
  const standard = getStandardMonthlyRemuneration(monthlySalary);

  const healthRate = HEALTH_RATES[prefecture] ?? HEALTH_RATES["東京"];

  // 건강보험은 2026년 가나가와의 경우 9.92%
  const monthlyHealth = (standard * healthRate) / 2;

  // 2026년 개호보험
  const monthlyNursing2025 =
    age >= 40 && age <= 64 ? (standard * NURSING_RATE_2025) / 2 : 0;

  const monthlyNursing2026 =
    age >= 40 && age <= 64 ? (standard * NURSING_RATE_2026) / 2 : 0;

  // 1~2월은 2025년도 개호보험료율
  const nursingInsurance = monthlyNursing2025 * 2 + monthlyNursing2026 * 10;

  // 2026년 4월부터 자녀·육아지원금
  const monthlyChildCare = (standard * CHILD_CARE_SUPPORT_RATE) / 2;

  const childCareSupport = monthlyChildCare * 9;

  // 후생연금
  const monthlyPension = (standard * PENSION_RATE) / 2;

  const pension = monthlyPension * 12;

  const healthInsurance = monthlyHealth * 12;

  return {
    standard,
    healthInsurance,
    nursingInsurance,
    pension,
    childCareSupport,
  };
}

/**
 * ============================================================
 * 보너스 사회보험료
 * ============================================================
 *
 * 보너스는 1,000엔 미만 절사 후 계산.
 *
 * 실제로는 지급일에 따라 보험료율 적용 시점이 달라질 수 있기
 * 때문에, 이 계산기에서는 2026년도 기준을 적용한 예상치로 계산.
 *
 * 건강보험 / 개호보험 / 자녀·육아지원금:
 * → 근로자 절반 부담
 *
 * 후생연금:
 * → 근로자 절반 부담
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
    age >= 40 && age <= 64 ? (standardBonus * NURSING_RATE_2026) / 2 : 0;

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
 * ============================================================
 * 2025년 주민세용 급여소득 계산
 * ============================================================
 *
 * 2026년도 주민세는 기본적으로 2025년 소득을 기준으로 계산.
 *
 * 따라서 previousAnnualIncome을 이용한다.
 *
 * 5.76M처럼 일반적인 소득 구간에서는:
 *
 * 연봉 × 20% + 44만원
 *
 * 을 사용.
 */

function calculatePreviousYearSalaryIncome(annualIncome: number) {
  if (annualIncome <= 0) {
    return 0;
  }

  if (annualIncome <= 1_900_000) {
    return Math.max(650_000, annualIncome * 0.3 + 80_000);
  }

  if (annualIncome <= 3_600_000) {
    return Math.floor(annualIncome * 0.3 + 80_000);
  }

  if (annualIncome <= 6_600_000) {
    return Math.floor(annualIncome * 0.2 + 440_000);
  }

  if (annualIncome <= 8_500_000) {
    return Math.floor(annualIncome * 0.1 + 1_100_000);
  }

  return 1_950_000;
}

/**
 * ============================================================
 * 2025년 사회보험료 예상
 * ============================================================
 *
 * 주민세는 전년도 소득을 기준으로 하므로,
 * previousAnnualIncome에 대한 전년도 사회보험료를
 * 별도로 추정한다.
 *
 * 입력 화면에서는 전년도 보너스/실제 보험료를 받지 않으므로
 * "전년도 연봉 ÷ 12를 월급으로 받았다"라고 가정.
 */

function calculatePreviousYearSocialInsurance(
  previousAnnualIncome: number,
  age: number,
  prefecture: string,
) {
  if (previousAnnualIncome <= 0) {
    return 0;
  }

  const previousMonthlySalary = previousAnnualIncome / 12;

  const standard = getStandardMonthlyRemuneration(previousMonthlySalary);

  const healthRate = HEALTH_RATES[prefecture] ?? HEALTH_RATES["東京"];

  /**
   * 2025년도:
   *
   * 건강보험: 해당 지역 요율
   * 개호보험: 1.59%
   * 후생연금: 18.3%
   * 고용보험: 일반사업 0.55%
   */

  const healthInsurance = ((standard * healthRate) / 2) * 12;

  const nursingInsurance =
    age >= 40 && age <= 64 ? ((standard * NURSING_RATE_2025) / 2) * 12 : 0;

  const pension = ((standard * PENSION_RATE) / 2) * 12;

  const employmentInsurance =
    previousAnnualIncome * EMPLOYMENT_INSURANCE_RATE_2025;

  return healthInsurance + nursingInsurance + pension + employmentInsurance;
}

/**
 * ============================================================
 * 주민세 계산
 * ============================================================
 *
 * 2026년도 주민세
 * = 2025년 소득을 기준으로 계산
 *
 * 기본적인 구조:
 *
 * 급여소득
 * - 사회보험료
 * - 기초공제 43만원
 * - 부양공제
 * = 과세소득
 *
 * 이후:
 * 시·군·구민세 + 도·현민세
 *
 * 가나가와현:
 * - 정령지정도시: 8% + 2.025%
 * - 그 외: 6% + 4.025%
 *
 * 합계는 10.025%.
 *
 * 여기에 조정공제 및 균등할,
 * 산림환경세 등을 반영.
 *
 * 주의:
 * 실제 주민세는 시/구별 세액공제 및
 * 개인별 공제 등에 따라 달라질 수 있다.
 */

function calculateResidentTax(
  previousAnnualIncome: number,
  age: number,
  prefecture: string,
  dependents: number,
) {
  if (previousAnnualIncome <= 0) {
    return 0;
  }

  /**
   * 전년도 급여소득
   */
  const previousSalaryIncome =
    previousAnnualIncome >= 0
      ? previousAnnualIncome -
        calculatePreviousYearSalaryIncome(previousAnnualIncome)
      : 0;

  /**
   * 전년도 사회보험료
   */
  const previousSocialInsurance = calculatePreviousYearSocialInsurance(
    previousAnnualIncome,
    age,
    prefecture,
  );

  /**
   * 주민세 기초공제
   *
   * 2026년도 주민세 기준 43만원.
   */
  const residentBasicDeduction =
    previousSalaryIncome <= 24_000_000
      ? 430_000
      : previousSalaryIncome <= 24_500_000
        ? 290_000
        : previousSalaryIncome <= 25_000_000
          ? 150_000
          : 0;

  /**
   * 일반 부양가족 공제
   *
   * 현재 UI에서는 부양가족의 나이를 구분하지 않으므로
   * 일반적인 16세 이상 부양가족이라고 가정.
   */
  const residentDependentDeduction = dependents * 330_000;

  /**
   * 주민세 과세소득
   *
   * 실제 주민세는 1,000엔 미만 절사.
   */
  const residentTaxableIncomeBeforeRounding = Math.max(
    0,
    previousSalaryIncome -
      previousSocialInsurance -
      residentBasicDeduction -
      residentDependentDeduction,
  );

  const residentTaxableIncome =
    Math.floor(residentTaxableIncomeBeforeRounding / 1_000) * 1_000;

  if (residentTaxableIncome <= 0) {
    return 0;
  }

  /**
   * 가나가와현의 주민세 소득할 합계
   *
   * 2026년도:
   * 10.025%
   *
   * = 시·군·구민세 + 현민세
   */
  const residentIncomeTax = residentTaxableIncome * 0.10025;

  /**
   * 조정공제
   *
   * 소득세와 주민세의 인적공제 차이를 반영.
   *
   * 이 계산기에서는 가장 일반적인
   * 기초공제 차이 25만원을 기준으로 예상.
   */
  const basicDeductionDifference = 680_000 - 430_000;

  let adjustmentDeduction = 0;

  if (residentTaxableIncome <= 2_000_000) {
    adjustmentDeduction = Math.max(50_000, basicDeductionDifference) * 0.05;
  } else {
    const difference =
      basicDeductionDifference - (residentTaxableIncome - 2_000_000);

    adjustmentDeduction = Math.max(50_000, difference) * 0.05;
  }

  /**
   * 균등할
   *
   * 일반적인 가나가와현 기준 예상값:
   *
   * 현민세 1,300엔
   * 시·군·구민세 3,000엔
   * 산림환경세 1,000엔
   *
   * = 5,300엔
   *
   * 단, 요코하마 등 일부 지자체는 별도의 초과과세가
   * 있기 때문에 실제 고지액과 차이가 날 수 있음.
   */
  const residentPerCapitaTax = 5_300;

  const residentTax =
    residentIncomeTax - adjustmentDeduction + residentPerCapitaTax;

  return Math.max(0, Math.floor(residentTax));
}

/**
 * ============================================================
 * 메인 계산 함수
 * ============================================================
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

  /**
   * ==========================================================
   * 총급여
   * ==========================================================
   */

  const annualSalary = monthlySalary * 12;

  const annualIncome = annualSalary + annualBonus;

  /**
   * ==========================================================
   * 월급 사회보험
   * ==========================================================
   */

  const monthlyInsurance = calculateMonthlySocialInsurance2026(
    monthlySalary,
    age,
    prefecture,
  );

  /**
   * ==========================================================
   * 보너스 사회보험
   * ==========================================================
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

  /**
   * ==========================================================
   * 사회보험료
   * ==========================================================
   */

  const healthInsurance = monthlyInsurance.healthInsurance + bonusHealth;

  const nursingInsurance = monthlyInsurance.nursingInsurance + bonusNursing;

  const pension = monthlyInsurance.pension + bonusPension;

  const childCareSupport = monthlyInsurance.childCareSupport + bonusChildCare;

  /**
   * ==========================================================
   * 고용보험
   * ==========================================================
   *
   * 2026년 1~3월:
   * 0.55%
   *
   * 2026년 4~12월:
   * 0.50%
   *
   * 월급 + 보너스를 연간 기준으로
   * 평균적인 비율을 적용.
   */

  const annualEmploymentInsuranceRate =
    (EMPLOYMENT_INSURANCE_RATE_2025 * 3 + EMPLOYMENT_INSURANCE_RATE_2026 * 9) /
    12;

  const employmentInsurance = annualIncome * annualEmploymentInsuranceRate;

  /**
   * ==========================================================
   * 사회보험 합계
   * ==========================================================
   */

  const totalSocialInsurance =
    healthInsurance +
    nursingInsurance +
    pension +
    employmentInsurance +
    childCareSupport;

  /**
   * ==========================================================
   * 소득세
   * ==========================================================
   */

  /**
   * 급여소득공제
   */
  const employmentIncomeDeduction =
    calculateEmploymentIncomeDeduction(annualIncome);

  /**
   * 급여소득
   */
  const employmentIncome = Math.max(
    0,
    annualIncome - employmentIncomeDeduction,
  );

  /**
   * 소득세 기초공제
   */
  const incomeTaxBasicDeduction =
    calculateIncomeTaxBasicDeduction(employmentIncome);

  /**
   * 부양가족 공제
   *
   * 현재 UI에서는 나이를 받지 않으므로
   * 일반 부양공제 38만원으로 계산.
   */
  const dependentDeduction = dependents * 380_000;

  /**
   * 과세소득
   */
  const taxableIncome = Math.max(
    0,
    employmentIncome -
      totalSocialInsurance -
      incomeTaxBasicDeduction -
      dependentDeduction,
  );

  /**
   * 소득세
   */
  const incomeTax = calculateIncomeTax(taxableIncome);

  /**
   * ==========================================================
   * 주민세
   * ==========================================================
   *
   * 전년도 연봉을 기준으로 계산.
   */

  const residentTax = calculateResidentTax(
    previousAnnualIncome,
    age,
    prefecture,
    dependents,
  );

  /**
   * ==========================================================
   * 세금 합계
   * ==========================================================
   */

  const totalTax = incomeTax + residentTax;

  /**
   * ==========================================================
   * 실수령액
   * ==========================================================
   */

  const annualTakeHome = Math.max(
    0,
    annualIncome - totalSocialInsurance - totalTax,
  );

  const monthlyTakeHome = annualTakeHome / 12;

  /**
   * ==========================================================
   * 결과 반환
   * ==========================================================
   */

  return {
    annualIncome,

    healthInsurance: Math.round(healthInsurance),

    nursingInsurance: Math.round(nursingInsurance),

    pension: Math.round(pension),

    employmentInsurance: Math.round(employmentInsurance),

    childCareSupport: Math.round(childCareSupport),

    incomeTax: Math.round(incomeTax),

    residentTax: Math.round(residentTax),

    totalSocialInsurance: Math.round(totalSocialInsurance),

    totalTax: Math.round(totalTax),

    annualTakeHome: Math.round(annualTakeHome),

    monthlyTakeHome: Math.round(monthlyTakeHome),
  };
}
