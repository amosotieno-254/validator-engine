import { ValidationRule, RuleResult } from "../types";

export const isISODate: ValidationRule = (value: any): RuleResult => {
  if (
    value === null ||
    value === undefined ||
    typeof value !== "string" ||
    value.trim() === ""
  ) {
    return {
      valid: false,
      rule: "isISODate",
      message: "Value must be a non-empty ISO 8601 string.",
      code: "EMPTY_ISO_DATE",
    };
  }

  const date = new Date(value);
  if (isNaN(date.getTime()) || !/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return {
      valid: false,
      rule: "isISODate",
      message: "Value must be a valid calendar date in ISO 8601 format.",
      code: "INVALID_ISO_DATE",
    };
  }

  return { valid: true };
};
