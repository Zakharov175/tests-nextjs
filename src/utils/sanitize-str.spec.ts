import { sanitizeStr } from "./sanitize-str";

describe("sanitizeStr function (tests unit)", () => {
  test("sanitizes a string", () => {
    expect(sanitizeStr("  a  ")).toBe("a");
  });
  test("returns empty string for falsy value", () => {
    //@ts-expect-error testing without value
    expect(sanitizeStr()).toBe("");
  });

  test("returns empty string for number value", () => {
    //@ts-expect-error testing with number value
    expect(sanitizeStr(123)).toBe("");
  });
  test("formats string using NFC normalize", () => {
    const originalValue = "e\u0301";
    const expected = "é";
    expect(expected).toBe(sanitizeStr(originalValue));
  });
});
