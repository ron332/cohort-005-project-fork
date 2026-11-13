import { describe, it, expect } from "vitest";
import { RefundRequestStatus } from "~/db/schema";
import { getRefundableAmount, getRefundRequestBlocker } from "./refund-requests";

describe("getRefundableAmount", () => {
  it("is the amount paid, even when a coupon made it lower than the list price", () => {
    expect(getRefundableAmount({ amountPaid: 2000 })).toBe(2000);
  });
});

describe("getRefundRequestBlocker", () => {
  it("allows a first refund request", () => {
    expect(getRefundRequestBlocker([])).toBeNull();
  });

  it("allows a new refund request after a declined one", () => {
    expect(getRefundRequestBlocker([RefundRequestStatus.Declined])).toBeNull();
  });

  it("blocks while a refund request is open", () => {
    expect(
      getRefundRequestBlocker([RefundRequestStatus.Declined, RefundRequestStatus.Open])
    ).toBe("open");
  });

  it("blocks once a refund request has been approved (a refunded purchase)", () => {
    expect(
      getRefundRequestBlocker([RefundRequestStatus.Declined, RefundRequestStatus.Approved])
    ).toBe("refunded");
  });
});
