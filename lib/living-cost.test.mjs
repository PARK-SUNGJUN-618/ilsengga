// Run: node --experimental-strip-types --test lib/salary.test.mjs lib/living-cost.test.mjs
import assert from "node:assert/strict";
import test from "node:test";
import { calculateLivingCost, createLivingCostDraft, EXPENSE_FIELDS, parseIncomeQuery, parseLivingCostDraft, validateLivingCostInput } from "./living-cost.ts";

const base = { income: 300000, rent: 90000, food: 45000, utilities: 15000, communication: 5000, transport: 10000, supplies: 10000, leisure: 30000, other: 10000 };
const zeroExpenses = { income: 300000, ...Object.fromEntries(EXPENSE_FIELDS.map(({ key }) => [key, 0])) };

test("normal calculation includes all eight expenses, ratios and annual totals", () => {
  assert.deepEqual(validateLivingCostInput(base), {});
  const result = calculateLivingCost(base);
  assert.equal(result.income, 300000);
  assert.equal(result.monthlyExpenses, 215000);
  assert.equal(result.balance, 85000);
  assert.ok(Math.abs(result.savingsRatio - 28.33333333333333) < 1e-12);
  assert.ok(Math.abs(result.expenseRatio - 71.66666666666667) < 1e-12);
  assert.equal(result.annualExpenses, 2580000);
  assert.equal(result.annualBalance, 1020000);
  assert.equal(result.expenses.length, 8);
  assert.ok(Math.abs(result.expenses[0].ratio - 41.86046511627907) < 1e-12);
  assert.ok(Math.abs(result.expenses.reduce((sum, entry) => sum + entry.ratio, 0) - 100) < 1e-12);
});

for (const { key } of EXPENSE_FIELDS) {
  test(`${key} contributes to total and composition`, () => {
    const result = calculateLivingCost({ ...zeroExpenses, [key]: 1000 });
    assert.equal(result.monthlyExpenses, 1000);
    assert.deepEqual(result.expenses.find((entry) => entry.key === key), { key, amount: 1000, ratio: 100 });
  });
}

test("deficit retains signed balances and ratios", () => {
  const result = calculateLivingCost({ ...zeroExpenses, income: 250000, rent: 280000 });
  assert.equal(result.balance, -30000);
  assert.equal(result.annualBalance, -360000);
  assert.equal(result.savingsRatio, -12);
  assert.ok(Math.abs(result.expenseRatio - 112) < 1e-12);
});
test("zero income disables income ratios but preserves composition", () => {
  const result = calculateLivingCost({ ...zeroExpenses, income: 0, rent: 1000 });
  assert.equal(result.savingsRatio, null);
  assert.equal(result.expenseRatio, null);
  assert.equal(result.balance, -1000);
  assert.equal(result.annualExpenses, 12000);
  assert.equal(result.annualBalance, -12000);
  assert.equal(result.expenses[0].ratio, 100);
});
test("zero expenses have no composition ratios", () => {
  const result = calculateLivingCost(zeroExpenses);
  assert.equal(result.monthlyExpenses, 0);
  assert.equal(result.balance, 300000);
  assert.equal(result.savingsRatio, 100);
  assert.equal(result.expenseRatio, 0);
  assert.ok(result.expenses.every((entry) => entry.ratio === null));
});
test("all zero amounts remain finite or null", () => {
  const result = calculateLivingCost({ ...zeroExpenses, income: 0 });
  assert.equal(result.balance, 0);
  assert.equal(result.annualBalance, 0);
  assert.equal(result.savingsRatio, null);
  assert.equal(result.expenseRatio, null);
  assert.ok(result.expenses.every((entry) => entry.ratio === null));
});
test("equal income and expenses produce zero savings", () => {
  const result = calculateLivingCost({ ...zeroExpenses, rent: 300000 });
  assert.equal(result.balance, 0);
  assert.equal(result.savingsRatio, 0);
  assert.equal(result.expenseRatio, 100);
});
test("empty expenses normalize to zero without mutating the draft", () => {
  const draft = createLivingCostDraft(300000);
  const original = { ...draft };
  assert.deepEqual(parseLivingCostDraft(draft), { input: zeroExpenses, errors: {} });
  assert.deepEqual(draft, original);
});
test("empty income is required; explicit zero is valid", () => {
  assert.ok(parseLivingCostDraft(createLivingCostDraft()).errors.income);
  assert.equal(parseLivingCostDraft(createLivingCostDraft(0)).input.income, 0);
});
for (const raw of ["-1", "1.5", "NaN", "Infinity", "1e6", "0x10", "1,000", "12abc", " ", " 12", "12\n", "9007199254740992", "9".repeat(400)]) {
  test(`reject malformed draft amount ${raw.slice(0, 30)}`, () => {
    for (const key of ["income", ...EXPENSE_FIELDS.map((field) => field.key)]) {
      const result = parseLivingCostDraft({ ...createLivingCostDraft(300000), [key]: raw });
      assert.equal(result.input, null);
      assert.ok(result.errors[key]);
    }
  });
}
for (const value of [-1, 1.5, NaN, Infinity, -Infinity, Number.MAX_SAFE_INTEGER + 1]) {
  test(`production calculator rejects invalid numeric input ${value}`, () => {
    for (const key of Object.keys(base)) {
      const input = { ...base, [key]: value };
      assert.ok(validateLivingCostInput(input)[key]);
      assert.throws(() => calculateLivingCost(input), RangeError);
    }
  });
}
test("reject expense sum overflow", () => {
  const input = { ...zeroExpenses, rent: Number.MAX_SAFE_INTEGER, food: 1 };
  assert.ok(validateLivingCostInput(input).rent);
  assert.throws(() => calculateLivingCost(input), RangeError);
});
for (const key of ["income", "rent"]) {
  test(`reject annual overflow for ${key}`, () => {
    const input = { ...zeroExpenses, [key]: Math.floor(Number.MAX_SAFE_INTEGER / 12) + 1 };
    assert.ok(validateLivingCostInput(input)[key]);
    assert.throws(() => calculateLivingCost(input), RangeError);
  });
}
test("accept safe annual boundary", () => {
  const limit = Math.floor(Number.MAX_SAFE_INTEGER / 12);
  assert.deepEqual(validateLivingCostInput({ ...zeroExpenses, income: limit, rent: limit }), {});
  assert.equal(calculateLivingCost({ ...zeroExpenses, income: limit, rent: limit }).balance, 0);
});
for (const [raw, expected] of [["300000", 300000], ["0", 0], ["00042", 42], [String(Math.floor(Number.MAX_SAFE_INTEGER / 12)), Math.floor(Number.MAX_SAFE_INTEGER / 12)]]) {
  test(`accept income query ${raw}`, () => assert.equal(parseIncomeQuery(raw), expected));
}
for (const raw of [undefined, "", "-1", "1.5", ["1", "2"], ["1"], "1e6", "0x10", "1,000", "123abc", "NaN", "Infinity", " ", "12\n", "9007199254740992", String(Math.floor(Number.MAX_SAFE_INTEGER / 12) + 1)]) {
  test(`ignore invalid income query ${JSON.stringify(raw)}`, () => assert.equal(parseIncomeQuery(raw), undefined));
}
