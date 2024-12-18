"use strict";

/**
 * Validates if the given data (`arg`) matches the defined `structure`.
 * If validation fails, it returns an Error, otherwise it returns nothing (void).
 *
 * @param structure - The structure to validate against, can be a string, array, or object.
 * @param arg - The data to be validated.
 * @param path - The current path in the structure for error reporting.
 * @returns An Error if validation fails, otherwise nothing (void).
 */
function validateByStructure(
  structure,
  arg,
  path = "" // `path` is used to track the current location within the structure for error reporting
) {
  if (typeof structure === "string") {
    // If the structure is a string, check if the type of the argument matches the expected type (string)
    if (typeof arg !== structure) {
      return new Error(
        `Expected type ${structure} at path "${path}", but got ${typeof arg}`
      );
    }
  } else if (Array.isArray(structure)) {
    // If the structure is an array, ensure the argument is also an array
    if (!Array.isArray(arg)) {
      return new Error(
        `Expected an array at path "${path}", but got ${typeof arg}`
      );
    }
    // Validate each item in the array based on its respective structure
    for (let i = 0; i < structure.length; i++) {
      for (let j = 0; j < arg.length; j++) {
        const error = validateByStructure(
          structure[i],
          arg[j],
          `${path}[${j}]` // The path includes the index to specify the exact location in the array
        );
        if (error) return error; // If there's an error, return it immediately
      }
    }
  } else if (typeof structure === "object") {
    // If the structure is an object, ensure the argument is also an object
    if (typeof arg !== "object" || arg === null) {
      return new Error(
        `Expected an object at path "${path}", but got ${typeof arg}`
      );
    }
    // Validate each key-value pair in the object
    for (const key in structure) {
      if (structure.hasOwnProperty(key)) {
        if (arg.hasOwnProperty(key)) {
          const error = validateByStructure(
            structure[key], // Validate the value corresponding to the current key
            arg[key],
            `${path}.${key}` // Append the key to the path for detailed error reporting
          );
          if (error) return error; // Return error immediately if found
        } else {
          return new Error(`Missing key "${key}" at path "${path}"`);
        }
      }
    }
  } else {
    // If the structure type is unknown, return an error
    return new Error(`Unknown structure type at path "${path}"`);
  }
}
/**
 * Validates the type of a value against a given type.
 * If the types do not match, an error is thrown.
 *
 * @param type - The type that the value should match.
 * @param value - The value whose type is being validated.
 * @returns Throws an error if the types do not match.
 */
function validateType(type, value) {
  // If either type or value is null, check if both are null
  if (type === null || value === null) {
    if (type !== value) {
      throw new Error(`Type of ${type} does not match ${value}`);
    }
    return;
  }
  // If type is Object, validate that the value is an object but not an array
  if (type === Object) {
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      return;
    }
    throw new Error(`Type of ${type} does not match ${value}`);
  }
  // If type is Array, ensure the value is an array
  if (type === Array) {
    if (Array.isArray(value)) {
      return;
    }
    throw new Error(`Type of ${type} does not match ${value}`);
  }
  // If type is a function (constructor), check if the value is an instance of that function
  if (typeof type === "function") {
    if (value instanceof type) return;
    // Additional checks for common types like String, Number, and Boolean
    if (type === String && typeof value === "string") return;
    if (type === Number && typeof value === "number") return;
    if (type === Boolean && typeof value === "boolean") return;
  } else {
    // If type is a primitive type, check if the types match
    if (typeof type === typeof value) return;
    // If type is an array, check if the value is also an array
    if (Array.isArray(type) && Array.isArray(value)) return;
    throw new Error(`Type of ${type} does not match ${typeof value}`);
  }
  // If no condition was met, throw an error
  throw new Error(`Type of ${type} does not match ${typeof value}`);
}
/**
 * Validates if the provided email address is in a valid format and adheres to specific length constraints.
 * Throws an error if the email is invalid or does not meet the length requirements.
 *
 * @param email - The email address to be validated.
 * @param possibleEmailMinLength - The minimum length of the email (default 5).
 * @param possibleEmailLength - The maximum length of the email (default 64).
 * @throws Error if the email format or length is invalid.
 */
function validateEmail(
  email,
  possibleEmailMinLength = 5,
  possibleEmailLength = 64
) {
  console.log(`Email: ${email}, Length: ${email.length}`); // Добавим логирование
  if (email.length < possibleEmailMinLength) {
    throw new Error(
      `Email must be at least ${possibleEmailMinLength} characters long.`
    );
  }
  if (email.length > possibleEmailLength) {
    throw new Error(`Email must not exceed ${possibleEmailLength} characters.`);
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Email must be a valid email address.");
  }
}
/**
 * Validates if the provided username follows specific length constraints and contains only allowed characters (letters and numbers).
 * Throws an error if the username is invalid.
 *
 * @param userName - The username to be validated.
 * @param possibleUserNameMinLength - The minimum length of the username (default 5).
 * @param possibleUserNameLength - The maximum length of the username (default 32).
 * @throws Error if the username format or length is invalid.
 */
function validateUserName(
  userName,
  possibleUserNameMinLength = 5,
  possibleUserNameLength = 32
) {
  const userNameRegex = /^[a-zA-Z0-9]+$/;
  if (!userNameRegex.test(userName)) {
    throw new Error("Username must contain only letters and numbers.");
  }
  if (userName.length < possibleUserNameMinLength) {
    throw new Error(
      `Username must be at least ${possibleUserNameMinLength} characters long.`
    );
  }
  if (userName.length > possibleUserNameLength) {
    throw new Error(
      `Username must not exceed ${possibleUserNameLength} characters.`
    );
  }
}
/**
 * Validates if the provided password meets strength requirements (length, character types).
 * Throws an error if the password does not meet the criteria.
 *
 * @param password - The password to be validated.
 * @param possiblePasswordMinLength - The minimum length of the password (default 8).
 * @param possiblePasswordLength - The maximum length of the password (default 128).
 * @throws Error if the password format or length is invalid.
 */
function validatePassword(
  password,
  possiblePasswordMinLength = 8,
  possiblePasswordLength = 128
) {
  if (password.length < possiblePasswordMinLength) {
    throw new Error(
      `Password must be at least ${possiblePasswordMinLength} characters long.`
    );
  }
  if (password.length > possiblePasswordLength) {
    throw new Error(
      `Password must not exceed ${possiblePasswordLength} characters.`
    );
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
    );
  }
}
/**
 * isSqlInjection - Function to prevent SQL injections.
 * Checks the string for potentially dangerous SQL commands and escapes them.
 *
 * @param input - The string to be checked for SQL injection.
 * @returns The string with SQL keywords escaped if found.
 */
const isSqlInjection = (input) => {
  const sqlInjectionRegex =
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|TRUNCATE|EXEC|EXECUTE|UNION|OR|AND|LIMIT|OFFSET|HAVING|WAITFOR|LIKE|IN|BETWEEN|CONCAT|--|\/\*|\*\/|#|;|--|\bDROP\s+TABLE|\bSHOW\s+TABLES|\bUNION\s+SELECT|\bINSERT\s+INTO)\b)/gi;
  input = input.replace(sqlInjectionRegex, (match) => {
    return match.replace(/([;#\/*\-])/g, "\\$1");
  });
  return input;
};
exports.isSqlInjection = isSqlInjection;
/**
 * isJsScript - Function to prevent JavaScript injections.
 * Checks the string for <script> tags and escapes them.
 *
 * @param input - The string to check for <script> tags.
 * @returns The string with <script> tags replaced with escaped versions.
 */
const isJsScript = (input) => {
  const scriptRegex = /<\s*script[^>]*>([\s\S]*?)<\/\s*script>/gi;
  input = input.replace(scriptRegex, (_, scriptContent) => scriptContent);
  const escapeHtml = (str) => {
    return str.replace(/[&<>"']/g, (char) => {
      switch (char) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#39;";
        default:
          return char;
      }
    });
  };
  return escapeHtml(input);
};
exports.isJsScript = isJsScript;
/**
 * validateURL - Function to validate the URL format.
 * Ensures the URL follows the correct format, does not exceed the maximum length,
 * and optionally belongs to one of the allowed domains.
 *
 * @param url - The URL to validate.
 * @param maxLength - Maximum allowed length of the URL (default is 2048).
 * @param allowedDomains - List of allowed domains. If not provided, no domain check is performed.
 * @throws Error if the URL does not meet the requirements.
 */
function validateURL(url, maxLength = 2048, allowedDomains = []) {
  const urlRegex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-]*)*(\?[a-zA-Z0-9=&]*)?(#[a-zA-Z0-9-_]*)?$/;
  if (!urlRegex.test(url)) {
    throw new Error("Invalid URL.");
  }
  if (url.length > maxLength) {
    throw new Error(
      `URL exceeds the maximum length of ${maxLength} characters.`
    );
  }
  if (allowedDomains.length > 0) {
    const domain = new URL(url).hostname;
    if (
      !allowedDomains.some((allowedDomain) => domain.endsWith(allowedDomain))
    ) {
      throw new Error(
        `URL must belong to one of the allowed domains: ${allowedDomains.join(
          ", "
        )}.`
      );
    }
  }
}
/**
 * validateNonEmptyFields - Recursive function to check that no fields in an object or array are empty.
 * Ensures no field is null, undefined, or an empty string.
 * Supports nested objects and arrays up to the specified depth.
 *
 * @param data - The object or array to check for empty fields.
 * @param depth - Maximum depth of recursion (default is 10).
 * @param currentDepth - Current recursion depth (default is 0).
 * @throws Error if a field is empty at the specified depth.
 */
function validateNonEmptyFields(data, depth = 10, currentDepth = 0) {
  if (currentDepth >= depth) {
    return;
  }
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      validateNonEmptyFields(item, depth, currentDepth + 1);
    });
  } else if (typeof data === "object" && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        throw new Error(
          `Field "${key}" cannot be null, undefined, or empty at depth ${currentDepth}.`
        );
      }
      if (typeof value === "object" || Array.isArray(value)) {
        validateNonEmptyFields(value, depth, currentDepth + 1);
      }
    });
  } else {
    if (data === null || data === undefined || data === "") {
      throw new Error(
        `Value cannot be null, undefined, or empty at depth ${currentDepth}.`
      );
    }
  }
}
/**
 * isNull - Function to check for null, undefined, empty values, and empty objects/arrays.
 * Checks if values are null, undefined, empty strings, arrays, or objects.
 *
 * @param value - The value to check.
 * @throws Error if the value is empty or has an invalid type.
 */
function isNull(value) {
  // Check if the value is falsy (excluding 0 and false), null, undefined, or empty
  if (!value && value !== 0 && value !== false) {
    throw new Error("Value is null, undefined, or falsy");
  }
  // Check if the value is an empty object, array, or class instance
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value) && value.length === 0) {
      throw new Error("Value is an empty array");
    }
    if (!Array.isArray(value) && Object.keys(value).length === 0) {
      throw new Error(
        value instanceof Object
          ? "Value is an empty class instance"
          : "Value is an empty object"
      );
    }
    return;
  }
  // Check if the value is a non-empty string, number, or bigint
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint"
  ) {
    if (!value && value !== 0) {
      throw new Error("Value is empty");
    }
    return;
  }
  // Handle invalid value types
  throw new Error("Invalid value type");
}

module.exports = {
  validateByStructure,
  validateType,
  validateEmail,
  validatePassword,
  validateUserName,
  validateURL,
  validateNonEmptyFields,
  isNull,
};
