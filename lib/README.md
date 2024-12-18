# Basic Input Validation

This project provides a set of utility functions for validating and sanitizing various data types such as strings, emails, usernames, passwords, and more. The utilities include checks for type validation, length constraints, SQL injection prevention, JavaScript injection prevention, and other security measures.

## Functions Overview

### `validateByStructure`

Validates if the given data matches the defined structure.

#### Parameters:

- `structure`: The structure to validate against. It can be a string, array, or object.
- `arg`: The data to be validated.
- `path`: The current path in the structure for error reporting (default: `""`).

#### Returns:

- Throws an error if validation fails, otherwise returns `void`.

---

### `validateType`

Validates the type of a value against a given type.

#### Parameters:

- `type`: The type that the value should match.
- `value`: The value whose type is being validated.

#### Returns:

- Throws an error if the types do not match.

---

### `validateEmail`

Validates an email address based on a specific format and length constraints.

#### Parameters:

- `email`: The email address to validate.
- `possibleEmailMinLength`: Minimum length of the email (default: `5`).
- `possibleEmailLength`: Maximum length of the email (default: `64`).

#### Returns:

- Throws an error if the email format or length is invalid.

---

### `validateUserName`

Validates a username based on length constraints and allowed characters.

#### Parameters:

- `userName`: The username to validate.
- `possibleUserNameMinLength`: Minimum length of the username (default: `5`).
- `possibleUserNameLength`: Maximum length of the username (default: `32`).

#### Returns:

- Throws an error if the username format or length is invalid.

---

### `validatePassword`

Validates a password to ensure it meets strength requirements (length, character types).

#### Parameters:

- `password`: The password to validate.
- `possiblePasswordMinLength`: Minimum length of the password (default: `8`).
- `possiblePasswordLength`: Maximum length of the password (default: `128`).

#### Returns:

- Throws an error if the password does not meet the required criteria.

---

### `isSqlInjection`

Prevents SQL injections by checking and escaping dangerous SQL keywords and patterns.

#### Parameters:

- `input`: The string to check for SQL injection.

#### Returns:

- The sanitized string with SQL keywords escaped.

---

### `isJsScript`

Prevents JavaScript injections by checking and sanitizing `<script>` tags in a string.

#### Parameters:

- `input`: The string to check for JavaScript injections.

#### Returns:

- The sanitized string with `<script>` tags replaced by escaped versions.

---

## Example Usage

```javascript
import { validateEmail, validateUserName, validatePassword, isSqlInjection, isJsScript } from 'basic-input-validation';

try {
  validateEmail('example@example.com');
  validateUserName('user123');
  validatePassword('StrongP@ssw0rd!');
} catch (error) {
  console.error('Validation error:', error.message);
}

const sanitizedInput = isSqlInjection("SELECT * FROM users WHERE name = 'admin';");
const safeInput = isJsScript("<script>alert('Hello!');</script>");

console.log(sanitizedInput);  // Sanitized SQL input
console.log(safeInput);       // Safe JavaScript input
Installation
You can install the package using npm:

bash
Копировать код
npm install basic-input-validation
License
This project is licensed under the MIT License - see the LICENSE file for details.
```
