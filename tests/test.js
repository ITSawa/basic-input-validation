const {
  validateByStructure,
  validateType,
  validateEmail,
  validatePassword,
  validateUserName,
  isSqlInjection,
  isJsScript,
  validateURL,
} = require("../lib/dist/script.js"); // adjust the import according to your file structure

describe("Library Tests", () => {
  describe("validateByStructure", () => {
    it("should validate a string type", () => {
      const result = validateByStructure("string", "Hello");
      expect(result).toBeUndefined(); // No error means valid
    });

    it("should throw an error for wrong type", () => {
      const result = validateByStructure("string", 123);
      expect(result).toBeInstanceOf(Error);
    });

    it("should validate array of numbers", () => {
      const result = validateByStructure(["number"], [1, 2, 3]);
      expect(result).toBeUndefined();
    });

    it("should throw error for invalid array", () => {
      const result = validateByStructure(["number"], ["one", "two"]);
      expect(result).toBeInstanceOf(Error);
    });

    it("should validate object structure", () => {
      const result = validateByStructure(
        { name: "string", age: "number" },
        { name: "Alice", age: 30 }
      );
      expect(result).toBeUndefined();
    });

    it("should throw error for missing key in object", () => {
      const result = validateByStructure(
        { name: "string", age: "number" },
        { name: "Alice" }
      );
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe("validateType", () => {
    it("should validate correct type", () => {
      validateType(String, "Hello"); // Should not throw
      validateType(Number, 123); // Should not throw
    });

    it("should throw error for incorrect type", () => {
      expect(() => validateType(String, 123)).toThrowError();
      expect(() => validateType(Array, "test")).toThrowError();
    });

    it("should validate complex types like objects and arrays", () => {
      const obj = { key: "value" };
      validateType(Object, obj); // Should not throw
      expect(() => validateType(Array, obj)).toThrowError();
    });
  });

  describe("validateEmail", () => {
    it("should validate a correct email", () => {
      expect(() => validateEmail("test@example.com")).not.toThrow();
    });

    it("should throw an error for invalid email format", () => {
      expect(() => validateEmail("invalidemail.com")).toThrowError(
        "Email must be a valid email address."
      );
    });

    it("should throw an error for too short email", () => {
      expect(() => validateEmail("a@b", 5)).toThrowError(
        "Email must be at least 5 characters long."
      );
    });

    it("should throw an error for too long email", () => {
      const longEmail = "a".repeat(65) + "@example.com";
      expect(() => validateEmail(longEmail)).toThrowError(
        "Email must not exceed 64 characters."
      );
    });
  });

  describe("validatePassword", () => {
    it("should validate a correct password", () => {
      expect(() => validatePassword("Password1!")).not.toThrow();
    });

    it("should throw error for missing special character", () => {
      expect(() => validatePassword("Password123")).toThrowError(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
      );
    });

    it("should throw error for too short password", () => {
      expect(() => validatePassword("Pass1!")).toThrowError(
        "Password must be at least 8 characters long."
      );
    });

    it("should throw error for too long password", () => {
      const longPassword = "P".repeat(129) + "1!";
      expect(() => validatePassword(longPassword)).toThrowError(
        "Password must not exceed 128 characters."
      );
    });
  });

  describe("validateUserName", () => {
    it("should validate a correct username", () => {
      expect(() => validateUserName("user123")).not.toThrow();
    });

    it("should throw error for invalid characters in username", () => {
      expect(() => validateUserName("user@123")).toThrowError(
        "Username must contain only letters and numbers."
      );
    });

    it("should throw error for too short username", () => {
      expect(() => validateUserName("usr")).toThrowError(
        "Username must be at least 5 characters long."
      );
    });

    it("should throw error for too long username", () => {
      const longUsername = "u".repeat(33);
      expect(() => validateUserName(longUsername)).toThrowError(
        "Username must not exceed 32 characters."
      );
    });
  });

  describe("isSqlInjection", () => {
    it("should escape dangerous SQL keywords", () => {
      const input = "SELECT * FROM users WHERE name = 'admin';";
      const result = isSqlInjection(input);
      expect(result).toBe("SELECT * FROM users WHERE name = 'admin';"); // Should escape the SQL keywords
    });

    it("should not escape safe inputs", () => {
      const input = "hello world";
      const result = isSqlInjection(input);
      expect(result).toBe(input); // No modification
    });
  });

  describe("isJsScript", () => {
    it("should remove <script> tags", () => {
      const input = '<script>alert("XSS")</script>';
      const result = isJsScript(input);
      expect(result).toBe("alert(&quot;XSS&quot;)"); // Script tags should be removed
    });

    it("should escape HTML entities in the input", () => {
      const input = "<div onclick=\"alert('XSS')\">Click me</div>";
      const result = isJsScript(input);
      expect(result).toBe(
        "&lt;div onclick=&quot;alert(&#39;XSS&#39;)&quot;&gt;Click me&lt;/div&gt;"
      ); // HTML entities should be escaped
    });

    it("should escape special characters", () => {
      const input = "<img src=\"javascript:alert('XSS')\" />";
      const result = isJsScript(input);
      expect(result).toBe(
        "&lt;img src=&quot;javascript:alert(&#39;XSS&#39;)&quot; /&gt;"
      ); // Special characters should be escaped
    });

    it("should handle mixed content correctly", () => {
      const input = '<div>Hello <script>alert("XSS")</script> World</div>';
      const result = isJsScript(input);
      expect(result).toBe(
        "&lt;div&gt;Hello alert(&quot;XSS&quot;) World&lt;/div&gt;"
      ); // Mixed content should be handled correctly
    });
  });

  describe("validateURL", () => {
    it("should validate a correct URL", () => {
      expect(() => validateURL("https://example.com")).not.toThrow();
    });

    it("should throw an error for invalid URL format", () => {
      expect(() => validateURL("invalid-url")).toThrowError("Invalid URL.");
    });

    it("should throw an error for too long URL", () => {
      const longURL = "https://" + "a".repeat(2050) + ".com";
      expect(() => validateURL(longURL)).toThrowError(
        "URL exceeds the maximum length of 2048 characters."
      );
    });
  });
});
