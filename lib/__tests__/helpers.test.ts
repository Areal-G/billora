import { describe, expect, it } from "vitest";
import {
    formatNumberWithCommas,
    formatPriceToString,
    isDataUrl,
    isValidEmail,
} from "@/lib/helpers";

describe("formatNumberWithCommas", () => {
    it("adds thousands separators and two decimals", () => {
        expect(formatNumberWithCommas(1234567.5)).toBe("1,234,567.50");
        expect(formatNumberWithCommas(0)).toBe("0.00");
    });
});

describe("formatPriceToString", () => {
    it("spells out zero", () => {
        expect(formatPriceToString(0, "USD")).toBe("Zero");
    });

    it("spells out whole and fractional parts", () => {
        const words = formatPriceToString(1250.75, "USD");
        expect(words).toMatch(/^One thousand, two hundred fifty/);
        expect(words).toContain("seventy-five");
    });
});

describe("validators", () => {
    it("accepts plausible emails only", () => {
        expect(isValidEmail("billing@example.com")).toBe(true);
        expect(isValidEmail("not-an-email")).toBe(false);
        expect(isValidEmail("a@b")).toBe(false);
    });

    it("detects data URLs", () => {
        expect(isDataUrl("data:image/png;base64,AAAA")).toBe(true);
        expect(isDataUrl("https://example.com/logo.png")).toBe(false);
    });
});
