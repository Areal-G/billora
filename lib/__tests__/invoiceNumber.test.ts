import { describe, expect, it } from "vitest";
import type { InvoiceType } from "@/types";
import {
    FALLBACK_INVOICE_NUMBER,
    incrementInvoiceNumber,
    nextInvoiceNumber,
} from "@/lib/invoiceNumber";

const saved = (...numbers: string[]) =>
    numbers.map((invoiceNumber) => ({
        details: { invoiceNumber },
    })) as unknown as InvoiceType[];

describe("incrementInvoiceNumber", () => {
    it("keeps prefix and zero padding", () => {
        expect(incrementInvoiceNumber("INV0007")).toBe("INV0008");
    });

    it("increments the last run of digits and keeps the suffix", () => {
        expect(incrementInvoiceNumber("2026-14")).toBe("2026-15");
        expect(incrementInvoiceNumber("A-009/EU")).toBe("A-010/EU");
    });

    it("lets the number outgrow its padding", () => {
        expect(incrementInvoiceNumber("INV99")).toBe("INV100");
    });

    it("appends a counter when there are no digits", () => {
        expect(incrementInvoiceNumber("DRAFT")).toBe("DRAFT-2");
        expect(incrementInvoiceNumber("   ")).toBe(FALLBACK_INVOICE_NUMBER);
    });
});

describe("nextInvoiceNumber", () => {
    it("starts from the fallback when nothing is saved", () => {
        expect(nextInvoiceNumber([])).toBe(FALLBACK_INVOICE_NUMBER);
    });

    it("uses the most recently saved non-empty number", () => {
        expect(nextInvoiceNumber(saved("INV0001", "INV0002", ""))).toBe(
            "INV0003"
        );
    });
});
