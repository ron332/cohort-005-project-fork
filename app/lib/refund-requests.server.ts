import { eq } from "drizzle-orm";
import { db } from "~/db";
import { refundRequests } from "~/db/schema";
import { getRefundRequestBlocker } from "./refund-requests";

/** Why this purchase cannot take a new refund request, or null if it can. */
export function getRefundRequestBlockerForPurchase(purchaseId: number) {
  const statuses = db
    .select({ status: refundRequests.status })
    .from(refundRequests)
    .where(eq(refundRequests.purchaseId, purchaseId))
    .all()
    .map((row) => row.status);

  return getRefundRequestBlocker(statuses);
}
