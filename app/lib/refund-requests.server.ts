import { eq } from "drizzle-orm";
import { db } from "~/db";
import { refunds } from "~/db/schema";
import { getRefundRequestBlocker } from "./refund-requests";

/** Why this purchase cannot take a new refund request, or null if it can. */
export function getRefundRequestBlockerForPurchase(purchaseId: number) {
  const statuses = db
    .select({ status: refunds.status })
    .from(refunds)
    .where(eq(refunds.purchaseId, purchaseId))
    .all()
    .map((row) => row.status);

  return getRefundRequestBlocker(statuses);
}
