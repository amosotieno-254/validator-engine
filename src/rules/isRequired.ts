import { ValidationRule, RuleResult } from "../types";

export const isRequired: ValidationRule = (value: any): RuleResult => {
  if (typeof value === "string" && value.trim() === "") {
    return {
      valid: false,
      rule: "isRequired",
      message: "Value cannot be an empty string or whitespace only.",
      code: "REQUIRED_FAILED",
    };
  }
  if (value === null || value === undefined) {
    return {
      valid: false,
      rule: "isRequired",
      message: "Value is required and cannot be null or undefined.",
      code: "REQUIRED_FAILED",
    };
  }

  return { valid: true };
};
