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
 *
 * 2026년 3월분(4월 납부분)부터 적용되는 보험료율.
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

/**
 * 2026년도 일반 사업 고용보험 근로자 부담
 */
const EMPLOYMENT_INSURANCE_RATE = 0.005;

/**
 * 표준보수월액
 *
 * 일반적인 급여 구간을 기준으로 한 예상 계산.
 *
 * 실제 보험료는 협회けんぽ의 보험료액표와
 * 실제 표준보수월액 결정 방식에 따라 달라질 수 있음.
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
 * 보너스 표준상여액
 *
 * 실제 제도에서는 1,000엔 미만을 버림.
 */
function getStandardBonus(bonus: number) {
  return Math.floor(bonus / 1_000) * 1_000;
}

/**
 * 2026년 급여소득공제
 *
 * 2025년분 이후 급여소득공제 개정 반영.
 */
function calculateEmploymentIncomeDeduction(annualIncome: number) {
  if (annualIncome <= 650_000) {
    return annualIncome;
  }

  if (annualIncome <= 1_900_000) {
    return 650_000;
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
 * 2026년분 기준.
 */
function calculateBasicDeduction(income: number) {
  if (income <= 1_320_000) {
    return 950_000;
  }

  if (income <= 3_360_000) {
    return 880_000;
  }

  if (income <= 4_890_000) {
    return 680_000;
  }

  if (income <= 6_550_000) {
    return 630_000;
  }

  if (income <= 23_500_000) {
    return 580_000;
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
  /**
   * 과세소득은 1,000엔 미만 절사
   */
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
   * 復興特別所得税 2.1%
   *
   * 실제 연말정산에서는 100엔 미만 절사 등이 적용되므로
   * 여기서는 예상값으로 계산.
   */
  return Math.max(0, tax * 1.021);
}

/**
 * 월급 사회보험료
 */
function calculateMonthlySocialInsurance(
  monthlySalary: number,
  age: number,
  prefecture: string,
) {
  const standard = getStandardMonthlyRemuneration(monthlySalary);

  const healthRate = HEALTH_RATES[prefecture] ?? HEALTH_RATES["東京"];

  /**
   * 건강보험
   * 회사와 본인이 절반씩 부담
   */
  const healthInsurance = (standard * healthRate) / 2;

  /**
   * 介護保険
   *
   * 40~64세만 부담
   */
  const nursingInsurance =
    age >= 40 && age <= 64 ? (standard * NURSING_RATE) / 2 : 0;

  /**
   * 후생연금
   */
  const pension = (standard * PENSION_RATE) / 2;

  /**
   * 子ども・子育て支援金
   */
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
 * 급여수입 → 급여소득공제 후 급여소득
 *
 * 중요:
 * 이전 코드에서는 이 함수가 "급여소득공제액"을 반환하고 있었음.
 *
 * 예:
 * 576만엔
 * → 급여소득공제 약 159.2만엔
 * → 실제 급여소득 416.8만엔
 *
 * 따라서 여기서는 최종 "급여소득"을 반환.
 */
function calculateSalaryIncome(annualIncome: number) {
  const deduction = calculateEmploymentIncomeDeduction(annualIncome);

  return Math.max(0, annualIncome - deduction);
}

/**
 * 전년도 사회보험료 예상
 *
 * 주민세는 전년도 소득을 기준으로 계산하기 때문에
 * 전년도 사회보험료도 필요하다.
 *
 * 하지만 사용자는 전년도 연봉만 입력하므로
 * 실제 전년도 급여명세서를 알 수 없다.
 *
 * 따라서:
 *
 * 전년도 연봉 ÷ 12
 * → 평균 월급으로 가정
 * → 표준보수월액 추정
 * → 건강보험/후생연금 등을 계산
 *
 * 실제 주민세와 약간 차이가 날 수 있다.
 */
function calculateEstimatedPreviousSocialInsurance(
  previousAnnualIncome: number,
  age: number,
  prefecture: string,
) {
  if (previousAnnualIncome <= 0) {
    return 0;
  }

  /**
   * 전년도 연봉을 12개월로 나누어
   * 평균 월급으로 간주한다.
   */
  const estimatedMonthlySalary = previousAnnualIncome / 12;

  const monthlyInsurance = calculateMonthlySocialInsurance(
    estimatedMonthlySalary,
    age,
    prefecture,
  );

  const healthInsurance = monthlyInsurance.healthInsurance * 12;

  const nursingInsurance = monthlyInsurance.nursingInsurance * 12;

  const pension = monthlyInsurance.pension * 12;

  /**
   * 고용보험은 전년도 총급여 기준으로 추정
   */
  const employmentInsurance = previousAnnualIncome * EMPLOYMENT_INSURANCE_RATE;

  const childCareSupport = monthlyInsurance.childCareSupport * 12;

  return (
    healthInsurance +
    nursingInsurance +
    pension +
    employmentInsurance +
    childCareSupport
  );
}

/**
 * 2026년도 주민세 계산
 *
 * 주민세는 기본적으로 전년도 소득을 기준으로 계산한다.
 *
 * 여기서는:
 *
 * 전년도 연봉
 * → 급여소득
 * → 전년도 사회보험료 추정
 * → 주민세 공제
 * → 과세소득
 * → 소득할
 * → 균등할
 * → 森林環境税
 *
 * 순서로 계산한다.
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
   * ① 전년도 급여소득
   */
  const previousSalaryIncome = calculateSalaryIncome(previousAnnualIncome);

  /**
   * ② 전년도 사회보험료 예상
   */
  const previousSocialInsurance = calculateEstimatedPreviousSocialInsurance(
    previousAnnualIncome,
    age,
    prefecture,
  );

  /**
   * ③ 주민세 기초공제
   *
   * 합계소득 2,400만엔 이하라면 43만엔.
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
   * ④ 부양공제
   *
   * 일반적인 부양가족을 단순화해서 계산.
   *
   * 실제로는 연령에 따라
   * 일반扶養 / 特定扶養 / 老人扶養 등
   * 공제액이 달라진다.
   */
  const residentDependentDeduction = dependents * 330_000;

  /**
   * ⑤ 주민세 과세소득
   *
   * 1,000엔 미만 절사.
   */
  const residentTaxableIncomeRaw =
    previousSalaryIncome -
    previousSocialInsurance -
    residentBasicDeduction -
    residentDependentDeduction;

  const residentTaxableIncome = Math.max(
    0,
    Math.floor(residentTaxableIncomeRaw / 1_000) * 1_000,
  );

  if (residentTaxableIncome <= 0) {
    return 0;
  }

  /**
   * ⑥ 주민세 소득할
   *
   * 대부분의 지역은 합계 약 10%.
   *
   * 神奈川県은 2026년도까지
   * 수원환경보전세 때문에 0.025%가 추가된다.
   *
   * 일반 지역:
   * 10.000%
   *
   * 神奈川県:
   * 10.025%
   */
  const residentIncomeRate = prefecture === "神奈川" ? 0.10025 : 0.1;

  const incomeBasedTax = residentTaxableIncome * residentIncomeRate;

  /**
   * ⑦ 調整控除
   *
   * 주민세와 소득세의 인적공제 차이를
   * 조정하기 위한 공제.
   *
   * 이 계산기는 일반적인 회사원을 기준으로
   * 기초공제 + 일반 부양가족을 단순 반영한다.
   */
  const personalDeductionDifference = 50_000 + dependents * 50_000;

  let adjustmentDeductionBase: number;

  if (residentTaxableIncome <= 2_000_000) {
    adjustmentDeductionBase = Math.min(
      personalDeductionDifference,
      residentTaxableIncome,
    );
  } else {
    adjustmentDeductionBase = Math.max(
      50_000,
      personalDeductionDifference - (residentTaxableIncome - 2_000_000),
    );
  }

  const adjustmentDeduction = adjustmentDeductionBase * 0.05;

  /**
   * ⑧ 균등할
   *
   * 기본:
   * 시정촌 3,000
   * 도도부현 1,000
   *
   * + 森林環境税 1,000
   *
   * 神奈川県은 2026년도까지
   * 水源環境保全税 300엔 추가.
   */
  const municipalityPerCapitaTax = 3_000;

  const prefecturePerCapitaTax = prefecture === "神奈川" ? 1_300 : 1_000;

  const forestEnvironmentalTax = 1_000;

  /**
   * ⑨ 최종 주민세
   *
   * 실제 지방세 계산은 시/도별로
   * 세부적인 1엔/100엔 단위 절사가 존재하므로
   * 여기서는 예상 계산을 위해
   * 최종 세액을 100엔 미만 절사한다.
   */
  const residentTaxBeforeRounding =
    incomeBasedTax -
    adjustmentDeduction +
    municipalityPerCapitaTax +
    prefecturePerCapitaTax +
    forestEnvironmentalTax;

  return Math.floor(Math.max(0, residentTaxBeforeRounding) / 100) * 100;
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

  /**
   * 연간 총급여
   */
  const annualSalary = monthlySalary * 12;

  const annualIncome = annualSalary + annualBonus;

  /**
   * -------------------------
   * 월급 사회보험
   * -------------------------
   */
  const monthlyInsurance = calculateMonthlySocialInsurance(
    monthlySalary,
    age,
    prefecture,
  );

  /**
   * -------------------------
   * 보너스 사회보험
   * -------------------------
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

  /**
   * -------------------------
   * 고용보험
   * -------------------------
   */
  const employmentInsurance = annualIncome * EMPLOYMENT_INSURANCE_RATE;

  /**
   * -------------------------
   * 사회보험 합계
   * -------------------------
   */
  const totalSocialInsurance =
    healthInsurance +
    nursingInsurance +
    pension +
    childCareSupport +
    employmentInsurance;

  /**
   * -------------------------
   * 소득세
   * -------------------------
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
   * 기초공제
   */
  const basicDeduction = calculateBasicDeduction(employmentIncome);

  /**
   * 부양공제
   *
   * 일반적인 부양가족을 기준으로
   * 단순화한 계산.
   */
  const dependentDeduction = dependents * 380_000;

  /**
   * 과세소득
   */
  const taxableIncome = Math.max(
    0,
    employmentIncome -
      totalSocialInsurance -
      basicDeduction -
      dependentDeduction,
  );

  /**
   * 소득세
   */
  const incomeTax = calculateIncomeTax(taxableIncome);

  /**
   * -------------------------
   * 주민세
   * -------------------------
   *
   * 중요:
   *
   * 주민세는 현재 연봉이 아니라
   * 전년도 연봉을 기준으로 계산.
   */
  const residentTax = calculateResidentTax(
    previousAnnualIncome,
    age,
    prefecture,
    dependents,
  );

  /**
   * -------------------------
   * 세금 합계
   * -------------------------
   */
  const totalTax = incomeTax + residentTax;

  /**
   * -------------------------
   * 실수령액
   * -------------------------
   */
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
