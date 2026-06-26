import { ValidationRule, RuleResult } from "../types";

export const isEmail: ValidationRule = (value: any): RuleResult => {
  if (typeof value !== "string")
    return {
      valid: false,
      rule: "isEmail",
      message: "Value must be a string.",
      code: "INVALID_TYPE",
    };

  if (value.includes(" "))
    return {
      valid: false,
      rule: "isEmail",
      message: "Email address cannot contain spaces.",
      code: "INVALID_EMAIL_SPACES",
    };

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(value))
    return {
      valid: false,
      rule: "isEmail",
      message: "Value must be a valid email format.",
      code: "INVALID_EMAIL_FORMAT",
    };

  return { valid: true };
};
