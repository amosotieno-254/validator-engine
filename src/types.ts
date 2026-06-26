export interface ValidationError {
  rule: string;
  message: string;
  code: string;
  details?: string[];
}

export interface ValidationResult {
  valid: boolean;
  value: any;
  originalValue: any;
  errors: ValidationError[];
}

export interface ValidationOptions {
  coerce?: boolean;
}

export interface RuleResult {
  valid: boolean;
  rule?: string;
  message?: string;
  code?: string;
  errors?: string[];
}

export type ValidationRule = (value: any) => RuleResult;
