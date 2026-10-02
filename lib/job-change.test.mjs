// Run: node --experimental-strip-types --test lib/salary.test.mjs lib/living-cost.test.mjs lib/job-change.test.mjs
import assert from "node:assert/strict";
import test from "node:test";
import { registerHooks } from "node:module";
import { calculateSalary, validateSalaryInput } from "./salary.ts";

// Node 22.17: resolve this one extensionless production import to the real TS
// source. No mocks, transpiled copies, dependencies, or tsconfig changes.
const jobChangeURL = new URL("./job-change.ts", import.meta.url).href;
const hook = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (context.parentURL === jobChangeURL && specifier === "./salary") {
      return nextResolve(new URL("./salary.ts", import.meta.url).href, context);
    }
    return nextResolve(specifier, context);
  },
});
let calculateJobChange, validateJobChangeInput, hasJobChangeErrors;
try {
  ({ calculateJobChange, validateJobChangeInput, hasJobChangeErrors } = await import("./job-change.ts"));
} finally {
  hook.deregister();
}

const condition = { monthlySalary: 300_000, annualBonus: 0, bonusPayments: 0, prefecture: "東京" };
function input() {
  return {
    common: { age: 33, dependents: 0, previousAnnualIncome: 3_600_000 },
    current: { ...condition },
    after: { ...condition },
  };
}

function assertSalaryAgreement(value) {
  const result = calculateJobChange(value);
  for (const side of ["current", "after"]) {
    assert.deepEqual(result[side], calculateSalary({
      ...value[side], ...value.common,
      bonusPayments: value[side].annualBonus === 0 ? 0 : value[side].bonusPayments,
    }));
  }
  for (const field of ["annualIncome", "annualTakeHome", "monthlyTakeHome"]) {
    assert.equal(result.difference[field], result.after[field] - result.current[field]);
  }
  return result;
}

test("identical conditions have zero differences", () => {
  const value = input();
  assert.equal(hasJobChangeErrors(validateJobChangeInput(value)), false);
  const result = assertSalaryAgreement(value);
  assert.deepEqual(result.difference, { annualIncome: 0, annualTakeHome: 0, monthlyTakeHome: 0 });
  assert.equal(result.annualIncomeChangeRate, 0);
});

for (const [name, monthlySalary, sign] of [["increase", 400_000, 1], ["decrease", 200_000, -1]]) {
  test(`salary ${name} has the correct signed differences and rate`, () => {
    const value = input();
    value.after.monthlySalary = monthlySalary;
    const result = assertSalaryAgreement(value);
    for (const difference of Object.values(result.difference)) assert.equal(Math.sign(difference), sign);
    assert.equal(result.annualIncomeChangeRate, result.difference.annualIncome / result.current.annualIncome * 100);
  });
}

test("bonus amount difference reuses salary results", () => {
  const value = input();
  value.after.annualBonus = 600_000;
  value.after.bonusPayments = 2;
  const result = assertSalaryAgreement(value);
  assert.equal(result.difference.annualIncome, 600_000);
  assert.ok(result.difference.annualTakeHome > 0);
});

test("bonus payment count can change take-home without changing gross income", () => {
  const value = input();
  value.current = { ...condition, annualBonus: 3_002_000, bonusPayments: 1 };
  value.after = { ...value.current, bonusPayments: 2 };
  const result = assertSalaryAgreement(value);
  assert.equal(result.difference.annualIncome, 0);
  assert.notEqual(result.difference.annualTakeHome, 0);
});

test("residence difference uses each salary calculation", () => {
  const value = input();
  value.after.prefecture = "大阪";
  const result = assertSalaryAgreement(value);
  assert.equal(result.difference.annualIncome, 0);
  assert.notEqual(result.current.healthInsurance, result.after.healthInsurance);
});

test("common age, dependents and previous income reach both calculations unchanged", () => {
  const value = input();
  value.common = { age: 45, dependents: 2, previousAnnualIncome: 7_200_000 };
  value.after.monthlySalary = 500_000;
  const result = assertSalaryAgreement(value);
  assert.ok(result.current.nursingInsurance > 0);
  assert.ok(result.after.nursingInsurance > 0);
  assert.equal(result.current.residentTax, result.after.residentTax);
  assert.ok(result.current.residentTax > 0);
});

for (const side of ["current", "after"]) {
  test(`${side} validation errors stay in that group`, () => {
    const value = input();
    value[side].monthlySalary = -1;
    const errors = validateJobChangeInput(value);
    assert.equal(errors[side].monthlySalary, validateSalaryInput({ ...value[side], ...value.common }).monthlySalary);
    assert.deepEqual(errors[side === "current" ? "after" : "current"], {});
    assert.deepEqual(errors.common, {});
    assert.equal(hasJobChangeErrors(errors), true);
    assert.throws(() => calculateJobChange(value), RangeError);
  });
}

test("both invalid conditions report both groups", () => {
  const value = input();
  value.current.monthlySalary = NaN;
  value.after.prefecture = "invalid";
  const errors = validateJobChangeInput(value);
  assert.ok(errors.current.monthlySalary);
  assert.ok(errors.after.prefecture);
  assert.throws(() => calculateJobChange(value), RangeError);
});

for (const [field, invalid] of [["age", 17], ["dependents", -1], ["previousAnnualIncome", NaN]]) {
  test(`invalid common ${field} is reported once in the common group`, () => {
    const value = input();
    value.common[field] = invalid;
    const errors = validateJobChangeInput(value);
    assert.ok(errors.common[field]);
    assert.deepEqual(errors.current, {});
    assert.deepEqual(errors.after, {});
    assert.throws(() => calculateJobChange(value), RangeError);
  });
}

test("zero bonus ignores hidden payment counts without mutating input", () => {
  const value = input();
  value.current.bonusPayments = 2;
  value.after.bonusPayments = NaN;
  const snapshot = structuredClone(value);
  assert.equal(hasJobChangeErrors(validateJobChangeInput(value)), false);
  const result = assertSalaryAgreement(value);
  assert.equal(result.difference.annualTakeHome, 0);
  assert.deepEqual(value, snapshot);
});

for (const bonusPayments of [0, 4, NaN]) {
  test(`positive bonus rejects payment count ${bonusPayments}`, () => {
    const value = input();
    value.after.annualBonus = 100_000;
    value.after.bonusPayments = bonusPayments;
    assert.ok(validateJobChangeInput(value).after.bonusPayments);
    assert.throws(() => calculateJobChange(value), RangeError);
  });
}

for (const monthlySalary of [0, 300_000]) {
  test(`zero current annual income has null rate with after salary ${monthlySalary}`, () => {
    const value = input();
    value.current.monthlySalary = 0;
    value.after.monthlySalary = monthlySalary;
    const result = assertSalaryAgreement(value);
    assert.equal(result.annualIncomeChangeRate, null);
    assert.ok(Object.values(result.difference).every(Number.isFinite));
  });
}

test("large accepted amounts retain finite safe integer differences", () => {
  const value = input();
  value.current.monthlySalary = 1;
  value.after.monthlySalary = Math.floor(Number.MAX_SAFE_INTEGER / 12);
  const result = assertSalaryAgreement(value);
  assert.ok(Object.values(result.difference).every(Number.isSafeInteger));
  assert.ok(Number.isFinite(result.annualIncomeChangeRate));
});

for (const invalid of [Infinity, -Infinity, NaN, -1, 1.5, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER + 1]) {
  test(`unsafe or invalid monthly salary ${invalid} is rejected`, () => {
    const value = input();
    value.after.monthlySalary = invalid;
    assert.ok(validateJobChangeInput(value).after.monthlySalary);
    assert.throws(() => calculateJobChange(value), RangeError);
  });
}

test("combined salary and bonus overflow uses salary validation", () => {
  const value = input();
  value.after.annualBonus = Number.MAX_SAFE_INTEGER;
  value.after.bonusPayments = 1;
  const errors = validateJobChangeInput(value);
  assert.ok(errors.after.monthlySalary);
  assert.ok(errors.after.annualBonus);
  assert.throws(() => calculateJobChange(value), RangeError);
});

test("monthly difference uses returned monthly amounts even across a rounding boundary", () => {
  let foundBoundary = false;
  for (let extra = 1; extra <= 100; extra++) {
    const value = input();
    value.after.monthlySalary += extra;
    const result = assertSalaryAgreement(value);
    if (result.difference.monthlyTakeHome !== Math.round(result.difference.annualTakeHome / 12)) {
      foundBoundary = true;
      assert.equal(result.difference.monthlyTakeHome, result.after.monthlyTakeHome - result.current.monthlyTakeHome);
      break;
    }
  }
  assert.ok(foundBoundary, "fixture range must exercise independently rounded salary returns");
});
