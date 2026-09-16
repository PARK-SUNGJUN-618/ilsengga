// Run: node --experimental-strip-types --test lib/salary.test.mjs
import assert from "node:assert/strict";
import test from "node:test";
import { calculateSalary, validateSalaryInput } from "./salary.ts";

const base = {
  monthlySalary: 300_000, annualBonus: 0, bonusPayments: 0,
  age: 45, prefecture: "東京", dependents: 0, previousAnnualIncome: 0,
};

// Expected remuneration and premiums transcribed from the 2026 official table.
// https://www.kyoukaikenpo.or.jp/~/media/Files/shared/hokenryouritu/r8/ippan/R8_13tokyo.pdf
const monthlyCases = [
  [0, 58_000, 8_052],
  [62_999, 58_000, 8_052], [63_000, 68_000, 8_052],
  [82_999, 78_000, 8_052], [83_000, 88_000, 8_052],
  [87_999, 88_000, 8_052], [88_000, 88_000, 8_052],
  [92_999, 88_000, 8_052], [93_000, 98_000, 8_967],
  [93_001, 98_000, 8_967],
  [309_999, 300_000, 27_450], [310_000, 320_000, 29_280],
  [634_999, 620_000, 56_730], [635_000, 650_000, 59_475],
  [635_001, 650_000, 59_475], [649_999, 650_000, 59_475],
  [650_000, 650_000, 59_475], [650_001, 650_000, 59_475],
  [664_999, 650_000, 59_475], [665_000, 680_000, 59_475],
  [1_354_999, 1_330_000, 59_475], [1_355_000, 1_390_000, 59_475],
  [2_000_000, 1_390_000, 59_475],
];
for (const [salary, healthStandard, monthlyPension] of monthlyCases) {
  test(`monthly salary ${salary}: separate health and pension grades`, () => {
    const result = calculateSalary({ ...base, monthlySalary: salary });
    assert.equal(result.pension, monthlyPension * 12);
    assert.equal(result.healthInsurance, Math.round(healthStandard * 0.0985 / 2 * 12));
    assert.equal(result.nursingInsurance, Math.round(healthStandard / 2 * (0.0159 * 2 + 0.0162 * 10)));
    assert.equal(result.childCareSupport, Math.round(healthStandard * 0.0023 / 2 * 9));
  });
}

const bonusCases = [
  // annual amount, distinct payment months, health assessment, pension assessment
  [999, 1, 0, 0], [1_000, 1, 1_000, 1_000],
  [1_499_999, 1, 1_499_000, 1_499_000],
  [1_500_000, 1, 1_500_000, 1_500_000],
  [1_500_001, 1, 1_500_000, 1_500_000],
  [1_501_000, 1, 1_501_000, 1_500_000],
  [3_002_000, 2, 3_002_000, 3_000_000],
  [5_729_999, 1, 5_729_000, 1_500_000],
  [5_730_000, 1, 5_730_000, 1_500_000],
  [5_730_001, 1, 5_730_000, 1_500_000],
  [5_731_000, 1, 5_730_000, 1_500_000],
  [6_000_000, 2, 5_730_000, 3_000_000],
  [9_000_000, 3, 5_730_000, 4_500_000],
  [5_729_999, 3, 5_727_000, 4_500_000],
  [5_730_000, 3, 5_730_000, 4_500_000],
];
for (const [annualBonus, bonusPayments, health, pension] of bonusCases) {
  test(`bonus ${annualBonus} in ${bonusPayments} distinct months`, () => {
    const result = calculateSalary({ ...base, annualBonus, bonusPayments });
    assert.equal(result.pension, Math.round(329_400 + pension * 0.183 / 2));
    assert.equal(result.healthInsurance, Math.round(177_300 + health * 0.0985 / 2));
    assert.equal(result.nursingInsurance, Math.round(29_070 + health * 0.0162 / 2));
    assert.equal(result.childCareSupport, Math.round(3_105 + health * 0.0023 / 2));
  });
}

test("zero bonus and zero payments are valid and produce finite results", () => {
  assert.deepEqual(validateSalaryInput(base), {});
  assert.ok(Object.values(calculateSalary(base)).every(Number.isFinite));
});

for (const field of ["monthlySalary", "annualBonus", "bonusPayments", "age", "dependents", "previousAnnualIncome"]) {
  for (const value of [NaN, Infinity, -Infinity, -1, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
    test(`reject ${field}=${value} before calculating`, () => {
      const input = { ...base, [field]: value };
      assert.ok(validateSalaryInput(input)[field]);
      assert.throws(() => calculateSalary(input), RangeError);
    });
  }
}

for (const patch of [
  { annualBonus: 1_000_000, bonusPayments: 0 },
  { bonusPayments: 4 }, { bonusPayments: 12 }, { bonusPayments: 13 },
  { age: 17 }, { age: 101 }, { prefecture: "invalid" },
  { prefecture: "toString" },
  { monthlySalary: Number.MAX_SAFE_INTEGER },
  { annualBonus: Number.MAX_SAFE_INTEGER, bonusPayments: 1 },
  { dependents: Number.MAX_SAFE_INTEGER },
]) {
  test(`reject unsupported input ${JSON.stringify(patch)}`, () => {
    const input = { ...base, ...patch };
    assert.notDeepEqual(validateSalaryInput(input), {});
    assert.throws(() => calculateSalary(input), RangeError);
  });
}

test("previous-year insurance also uses separate grades", () => {
  const result = calculateSalary({ ...base, age: 33, previousAnnualIncome: 24_000_000 });
  // Previous salary income 22,050,000; insurance 821,490 + 713,700 + 132,000.
  // Existing resident tax formula remains unchanged.
  // Taxable income is rounded down to 19,952,000 before applying the rate.
  assert.equal(result.residentTax, 2_002_988);
});
