# Input Validation Engine

## What This Library Does

This is a small tool that checks if information typed into a form is correct (like an email or password). It tells you exactly what went wrong, not just "yes" or "no". It needs no other tools to work.

## Installation

Copy the `src` folder into your project. Make sure you have Node.js and TypeScript. Then import it:

```typescript
import { validate, rules } from "./src/index";
```

## Running Tests

```bash
npm test
```

To build the code:

```bash
npm run build
```

## Basic Usage

```typescript
import { validate, rules } from "./src/index";

const result = validate("user@example.com", [rules.isEmail]);

if (result.valid) {
  console.log("This input is correct!");
}
```

## Available Rules

| Rule | What It Checks |
|------|-----------------|
| `rules.isRequired` | Input is not empty or blank. |
| `rules.isEmail` | Input looks like a real email. |
| `rules.isPhoneNumber` | Input looks like a real phone number (e.g. `+254712345678`). |
| `rules.isURL` | Input is a full link starting with `http://` or `https://`. |
| `rules.isISODate` | Input is a date like `YYYY-MM-DD`. |
| `rules.isUUID` | Input is a properly formatted unique ID. |
| `rules.isStrongPassword` | Password has 8+ characters with uppercase, numbers, and special characters. |

## What You Get Back When Something Is Wrong

```json
{
  "valid": false,
  "value": "bad-email",
  "originalValue": "bad-email",
  "errors": [
    {
      "rule": "isEmail",
      "message": "Value must be a valid email format.",
      "code": "INVALID_EMAIL_FORMAT"
    }
  ]
}
```

## Checking More Than One Rule

```typescript
import { validate, rules } from "./src/index";

const verification = validate(" ", [rules.isRequired, rules.isEmail]);
```

## Using Coercion (Auto-Fixing Input)

Add `coerce: true` to clean up input before checking:

```typescript
import { validate, rules } from "./src/index";

const formatPass = validate("  INFO@DOMAIN.COM  ", [rules.isEmail], { coerce: true });

console.log(formatPass.value); // Outputs: "info@domain.com"
console.log(formatPass.originalValue); // Outputs: "  INFO@DOMAIN.COM  "
```

- **Removes Extra Spaces:** Trims spaces at the start/end.
- **Makes Emails Lowercase:** For easier searching and storage.
- **Off by Default:** Only happens if you set `coerce: true`.

## Examples

### 1. Signup Form

```typescript
const registerForm = validate("  weak123 ", [rules.isRequired, rules.isStrongPassword], { coerce: true });

if (!registerForm.valid) {
  console.error("Form parameters invalid:", registerForm.errors);
}
```

### 2. Phone Number

```typescript
const phoneData = "+254712345678";
const subscriberCheck = validate(phoneData, [rules.isRequired, rules.isPhoneNumber]);

if (subscriberCheck.valid) {
  console.log("Verified E.164 target number:", subscriberCheck.value);
}
```

### 3. Website Link

```typescript
const networkUrl = "https://api.internal";
const urlCheck = validate(networkUrl, [rules.isRequired, rules.isURL]);

if (!urlCheck.valid) {
  throw new Error(`Critical routing interface failure code: ${urlCheck.errors[0].code}`);
}
```

## Limitations

- **Short Links Don't Work:** Links without `http://` or `https://` (e.g. `/profile/edit`) will fail, even if real.
- **Extra Spaces Inside Emails:** Multiple spaces in the middle of an email may not be caught right away, but will fail later.# validator-engine
