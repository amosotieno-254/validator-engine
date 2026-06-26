import {
  ValidationRule,
  ValidationOptions,
  ValidationResult,
  ValidationError,
} from "./types";
import { isRequired } from "./rules/isRequired";
import { isEmail } from "./rules/isEmail";
import { isPhoneNumber } from "./rules/isPhoneNumber";
import { isURL } from "./rules/isURL";
import { isISODate } from "./rules/isIsoDate";
import { isUUID } from "./rules/isUUID";
import { isStrongPassword } from "./rules/isStrongPassword";

export * from "./types";

export const rules = {
  isRequired,
  isEmail,
  isPhoneNumber,
  isURL,
  isISODate,
  isUUID,
  isStrongPassword,
};

export const validate = (
  value: any,
  ruleFunctions: ValidationRule[],
  options: ValidationOptions = { coerce: false },
): ValidationResult => {
  let processedValue = value;
  const originalValue = value;

  if (options.coerce && typeof processedValue === "string") {
    processedValue = processedValue.trim();
    if (ruleFunctions.includes(isEmail)) {
      processedValue = processedValue.toLowerCase();
    }
  }

  const errors: ValidationError[] = [];

  ruleFunctions.forEach((rule) => {
    const result = rule(processedValue);
    if (!result.valid) {
      errors.push({
        rule: result.rule || "unknown",
        message: result.message || "Validation failed.",
        code: result.code || "VALIDATION_ERROR",
        ...(result.errors && { details: result.errors }),
      });
    }
  });

  return {
    valid: errors.length === 0,
    value: processedValue,
    originalValue,
    errors,
  };
};
