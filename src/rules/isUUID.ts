import { ValidationRule, RuleResult } from "../types";

export const isUUID: ValidationRule = (value: any): RuleResult => {
  if (typeof value !== "string") {
    return {
      valid: false,
      rule: "isUUID",
      message: "Value must be a string.",
      code: "INVALID_TYPE",
    };
  }

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(value)) {
    return {
      valid: false,
      rule: "isUUID",
      message:
        "Value must be a valid standard UUID with correct hyphen positions.",
      code: "INVALID_UUID",
    };
  }

  return { valid: true };
};
