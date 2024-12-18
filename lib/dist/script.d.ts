type Structure =
  | string
  | {
      [key: string]: Structure;
    }
  | Structure[];
type Throwing = Error | void;
/**
 * Validates if the given data (`arg`) matches the defined `structure`.
 * If validation fails, it returns an Error, otherwise it returns nothing (void).
 *
 * @param structure - The structure to validate against, can be a string, array, or object.
 * @param arg - The data to be validated.
 * @param path - The current path in the structure for error reporting.
 * @returns An Error if validation fails, otherwise nothing (void).
 */
declare function validateByStructure(
  structure: Structure,
  arg: any,
  path?: string
): Throwing;
/**
 * Validates the type of a value against a given type.
 * If the types do not match, an error is thrown.
 *
 * @param type - The type that the value should match.
 * @param value - The value whose type is being validated.
 * @returns Throws an error if the types do not match.
 */
declare function validateType(type: any, value: any): void;
/**
 * Validates if the provided email address is in a valid format and adheres to specific length constraints.
 * Throws an error if the email is invalid or does not meet the length requirements.
 *
 * @param email - The email address to be validated.
 * @param possibleEmailMinLength - The minimum length of the email (default 5).
 * @param possibleEmailLength - The maximum length of the email (default 64).
 * @throws Error if the email format or length is invalid.
 */
declare function validateEmail(
  email: string,
  possibleEmailMinLength?: number,
  possibleEmailLength?: number
): void;
/**
 * Validates if the provided username follows specific length constraints and contains only allowed characters (letters and numbers).
 * Throws an error if the username is invalid.
 *
 * @param userName - The username to be validated.
 * @param possibleUserNameMinLength - The minimum length of the username (default 5).
 * @param possibleUserNameLength - The maximum length of the username (default 32).
 * @throws Error if the username format or length is invalid.
 */
declare function validateUserName(
  userName: string,
  possibleUserNameMinLength?: number,
  possibleUserNameLength?: number
): void;
/**
 * Validates if the provided password meets strength requirements (length, character types).
 * Throws an error if the password does not meet the criteria.
 *
 * @param password - The password to be validated.
 * @param possiblePasswordMinLength - The minimum length of the password (default 8).
 * @param possiblePasswordLength - The maximum length of the password (default 128).
 * @throws Error if the password format or length is invalid.
 */
declare function validatePassword(
  password: string,
  possiblePasswordMinLength?: number,
  possiblePasswordLength?: number
): void;
type InputValidation = (input: string) => string;
/**
 * isSqlInjection - Function to prevent SQL injections.
 * Checks the string for potentially dangerous SQL commands and escapes them.
 *
 * @param input - The string to be checked for SQL injection.
 * @returns The string with SQL keywords escaped if found.
 */
declare const isSqlInjection: InputValidation;
/**
 * isJsScript - Function to prevent JavaScript injections.
 * Checks the string for <script> tags and escapes them.
 *
 * @param input - The string to check for <script> tags.
 * @returns The string with <script> tags replaced with escaped versions.
 */
declare const isJsScript: (input: string) => string;
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
declare function validateURL(
  url: string,
  maxLength?: number,
  allowedDomains?: string[]
): void;
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
declare function validateNonEmptyFields(
  data: any,
  depth?: number,
  currentDepth?: number
): void;
/**
 * isNull - Function to check for null, undefined, empty values, and empty objects/arrays.
 * Checks if values are null, undefined, empty strings, arrays, or objects.
 *
 * @param value - The value to check.
 * @throws Error if the value is empty or has an invalid type.
 */
declare function isNull(value: any): Throwing;
export {
  validateByStructure,
  isSqlInjection,
  validateType,
  validateEmail,
  validatePassword,
  validateUserName,
  isJsScript,
  validateURL,
  validateNonEmptyFields,
  isNull,
};
