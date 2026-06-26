import { ValidationRule, RuleResult } from "../types";

export const isURL: ValidationRule = (value: any): RuleResult => {
  if (typeof value !== "string") {
    return {
      valid: false,
      rule: "isURL",
      message: "Value must be a string.",
      code: "INVALID_TYPE",
    };
  }

  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) {
      return {
        valid: false,
        rule: "isURL",
        message: "URL protocol must be http:// or https://.",
        code: "INVALID_PROTOCOL",
      };
    }
    return { valid: true };
  } catch {
    return {
      valid: false,
      rule: "isURL",
      message: "Value must be a properly formatted absolute URL.",
      code: "INVALID_URL",
    };
  }
};
