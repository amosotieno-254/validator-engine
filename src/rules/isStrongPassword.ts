import { ValidationRule, RuleResult } from "../types";

export const isStrongPassword: ValidationRule = (value: any): RuleResult => {
  if (typeof value !== "string") {
    return {
      valid: false,
      rule: "isStrongPassword",
      message: "Value must be a string.",
      code: "INVALID_TYPE",
    };
  }

  const errors: string[] = [];
  if (value.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[A-Z]/.test(value)) {
    errors.push("Password must contain at least 1 uppercase letter.");
  }
  if (!/\d/.test(value)) {
    errors.push("Password must contain at least 1 digit.");
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
    errors.push("Password must contain at least 1 special character.");
  }

  if (errors.length > 0) {
    return {
      valid: false,
      rule: "isStrongPassword",
      message: errors.join(" "),
      code: "WEAK_PASSWORD",
    };
  }

  return { valid: true };
};
