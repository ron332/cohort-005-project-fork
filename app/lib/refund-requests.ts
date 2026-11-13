import { RefundRequestStatus } from "~/db/schema";

// Terms follow GLOSSARY.md: a refund request is the learner's ask; a refund is
// the money.

/** The 14 calendar days after purchase in which a refund request may be raised. */
export const REFUND_WINDOW_DAYS = 14;

/** The refundable amount always equals the amount paid. */
export function getRefundableAmount(purchase: { amountPaid: number }) {
  return purchase.amountPaid;
}

/**
 * Why a purchase cannot take a new refund request, or null if it can.
 * - "open": a refund request on it has not been decided yet.
 * - "refunded": a refund request on it was approved (a refunded purchase).
 * A declined refund request does not block a new one.
 */
export function getRefundRequestBlocker(
  statuses: RefundRequestStatus[]
): "open" | "refunded" | null {
  if (statuses.includes(RefundRequestStatus.Approved)) return "refunded";
  if (statuses.includes(RefundRequestStatus.Open)) return "open";
  return null;
}
