# Refunds Glossary

The canonical language for how learners get money back for a course. Code, UI copy, and emails all use these terms.

## Rule

_Open / Approved / Declined_ describe **refund requests**. _Pending / Issued / Failed_ describe **refunds**.
Say "open refund request", "approved refund request", "pending refund".
Never "open refund", "approved refund", or "pending refund request".

## Purchases

**Purchase**:
A learner's payment for one course, at one Amount paid.
_Avoid_: Order, sale

**Amount paid**:
What the learner actually paid for a Purchase, after any coupon or PPP price.
_Avoid_: Price, list price (the list price belongs to the course, not the Purchase)

**PPP price**:
A purchasing-power-parity discounted price, based on the learner's country at purchase time.
_Avoid_: Regional price, country discount

**Claimed team seat**:
A Purchase that came from a team licence and has been redeemed by a learner. It belongs to the team, so no Refund request can be raised on it.
_Avoid_: Team purchase, used coupon

**Refunded purchase**:
A Purchase with an Approved Refund request. No further Refund requests can be raised on it.
_Avoid_: Cancelled purchase, reversed purchase

## Refund requests

**Refund request**:
A learner's ask to get the Refundable amount back for one Purchase. A Purchase may have several Refund requests, but at most one Open and at most one Approved.
_Avoid_: Refund (for the ask), reversal, chargeback, cancellation
In code, the `refunds` table holds refund requests. This is a known naming exception.

**Open**:
The state of a Refund request no one has decided yet. Code value: `requested`.
_Avoid_: Pending, awaiting review, requested (in copy)
Approved and Declined Refund requests may be called "closed" informally. "Closed" is not a state.

**Approved**:
The final state of a Refund request that staff accepted. It creates exactly one Refund and ends course access. It never changes afterwards.

**Declined**:
The final state of a Refund request that staff rejected. No Refund is created, and the learner may raise a new Refund request.
_Avoid_: Rejected, denied

**Refund window**:
The 14 calendar days after purchase in which a Refund request may be raised. It limits raising a Refund request, not issuing a Refund.
_Avoid_: Cancel window, cancellation period

**Watch limit**:
Two hours of watched course video. Once a learner reaches it, they can no longer raise a Refund request.

**Refundable amount**:
The money a Refund request asks for. It always equals the Amount paid and is fixed when the Refund request is raised.
_Avoid_: Refund amount, reversal amount

## Refunds

**Refund**:
Money given back to a learner for the full Refundable amount. A Refund is created only when a Refund request is Approved. There are no partial Refunds and no Refunds without a Refund request.
_Avoid_: Reversal, chargeback, payback

**Pending**:
The state of a Refund that the payment provider has not yet confirmed.
_Avoid_: Processing, in progress

**Issued**:
The final state of a Refund that the payment provider has confirmed. It does not mean the money has reached the learner's card.
_Avoid_: Paid, completed, succeeded, settled

**Failed**:
The state of a Refund that the payment provider rejected. Staff retry the same Refund, which returns to Pending.
_Avoid_: Bounced, errored

**Amount refunded**:
The money actually given back, recorded when a Refund is Issued.

## Out of scope

- **Chargeback** (a dispute the learner raises with their bank or card issuer): not modelled.
- Partial Refunds, goodwill Refunds without a Refund request, and withdrawing a Refund request: not supported.
- Pending and Failed are defined but not built until a payment provider is integrated. Until then, an Approved Refund request creates its Refund already Issued.
