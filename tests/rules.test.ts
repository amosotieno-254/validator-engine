import * as assert from "assert";
import { rules } from "../src/index";

console.log("🧪 Running 35+ Edge Case Validation Rule Tests...");

// 1. isRequired
const reqPass = ["valid-text", "0", 0, false].map(
  (v) => rules.isRequired(v).valid,
);
const reqFail = ["", "      ", null, undefined].map(
  (v) => rules.isRequired(v).valid,
);
assert.ok(
  reqPass.every((v) => v === true),
  "isRequired: Expected inputs to pass",
);
assert.ok(
  reqFail.every((v) => v === false),
  "isRequired: Expected empty items to fail",
);

// 2. isEmail
assert.strictEqual(rules.isEmail("user@example.com").valid, true);
assert.strictEqual(rules.isEmail("userexample.com").valid, false);
assert.strictEqual(rules.isEmail("user@").valid, false);
assert.strictEqual(rules.isEmail("@example.com").valid, false);
assert.strictEqual(rules.isEmail("user name@example.com").valid, false);

// 3. isPhoneNumber
assert.strictEqual(rules.isPhoneNumber("+254712345678").valid, true);
assert.strictEqual(rules.isPhoneNumber("254712345678").valid, false);
assert.strictEqual(rules.isPhoneNumber("+2547123ABC78").valid, false);
assert.strictEqual(rules.isPhoneNumber("+254 712 3456").valid, false);
assert.strictEqual(rules.isPhoneNumber("+1").valid, false);

// 4. isURL
assert.strictEqual(rules.isURL("https://example.com").valid, true);
assert.strictEqual(rules.isURL("http://example.com").valid, true);
assert.strictEqual(rules.isURL("example.com").valid, false);
assert.strictEqual(rules.isURL("not-a-link").valid, false);
assert.strictEqual(rules.isURL("http://%%invalid").valid, false);

// 5. isISODate
assert.strictEqual(rules.isISODate("2026-06-19").valid, true);
assert.strictEqual(rules.isISODate("2026-06-19T10:30:00Z").valid, true);
assert.strictEqual(rules.isISODate("19-06-2026").valid, false);
assert.strictEqual(rules.isISODate("2026-99-99").valid, false);
assert.strictEqual(rules.isISODate("not-a-date").valid, false);

// 6. isUUID
assert.strictEqual(
  rules.isUUID("123e4567-e89b-12d3-a456-426614174000").valid,
  true,
);
assert.strictEqual(rules.isUUID("123e4567-e89b-12d3").valid, false);
assert.strictEqual(
  rules.isUUID("123e4567-e89b-12d3-a456-42661417400z").valid,
  false,
);
assert.strictEqual(
  rules.isUUID("123e4567e89b-12d3-a456-426614174000-").valid,
  false,
);
assert.strictEqual(rules.isUUID("random-string-id").valid, false);

// 7. isStrongPassword
assert.strictEqual(rules.isStrongPassword("P@ssword1").valid, true);
assert.strictEqual(rules.isStrongPassword("P@s1").valid, false);
assert.strictEqual(rules.isStrongPassword("p@ssword1").valid, false);
assert.strictEqual(rules.isStrongPassword("P@ssword").valid, false);
assert.strictEqual(rules.isStrongPassword("Password123").valid, false);

console.log(" All individual rule tests passed successfully.");
