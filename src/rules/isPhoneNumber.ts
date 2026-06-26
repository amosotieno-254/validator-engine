import { ValidationRule, RuleResult } from "../types";

export const isPhoneNumber: ValidationRule = (value: any): RuleResult => {
  if (typeof value !== "string") {
    return {
      valid: false,
      rule: "isPhoneNumber",
      message: "Value must be a string.",
      code: "INVALID_TYPE",
    };
  }

  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(value)) {
    return {
      valid: false,
      rule: "isPhoneNumber",
      message: "Value must be in E.164 phone format (e.g. +254712345678).",
      code: "INVALID_PHONE",
    };
  }

  return { valid: true };
};
