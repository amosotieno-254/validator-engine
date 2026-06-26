import * as assert from "assert";
import { validate, rules } from "../src/index";

console.log("🧪 Running Validation Orchestrator Engine Tests...");

// Test Composable validation rules
const failedResult = validate(" ", [rules.isRequired, rules.isEmail]);
assert.strictEqual(failedResult.valid, false);
assert.strictEqual(
  failedResult.errors.length,
  2,
  "Expected multiple failed rules to be reported together",
);
assert.strictEqual(failedResult.errors[0].rule, "isRequired");
assert.ok(
  failedResult.errors[0].code,
  "Expected errors to contain a machine-readable error code",
);

// Test Coercion Engine options
const coercedResult = validate(
  "   STUDENT@EXAMPLE.COM   ",
  [rules.isRequired, rules.isEmail],
  { coerce: true },
);
assert.strictEqual(coercedResult.valid, true);
assert.strictEqual(
  coercedResult.value,
  "student@example.com",
  "Should trim whitespace and downcase email",
);
assert.strictEqual(coercedResult.originalValue, "   STUDENT@EXAMPLE.COM   ");

console.log(
  " Validation engine pipelines & coercion tests passed successfully.",
);
