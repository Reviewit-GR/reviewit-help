---
title: Responses and errors
description: What each response of POST /v1/invitations means and what to do.
---

`POST /v1/invitations` always answers with JSON. The HTTP code tells you what happened. With the test key the responses are the same, with `"test": true` added.

## Success {#success}

| Code | Response | What it means |
|---|---|---|
| `202` | `{"state": "queued"}` | The invitation was queued and will be sent after the delay you set. |
| `200` | `{"state": "skipped", "reason": "duplicate"}` | There is already an invitation for this order number. You do not need to do anything. |
| `200` | `{"state": "skipped", "reason": "repeat"}` | The customer was invited by you in the last 90 days. |

`skipped` is not an error. Do not retry.

If the customer has already written a review of your business or has asked not to receive invitations, the response is still `202`, but nothing is sent: Reviewit does not tell any business who has reviewed it or opted out.

## Errors {#errors}

| Code | `error` | What to do |
|---|---|---|
| `401` | `unauthorized` | The key is missing, wrong or has been revoked. Check the `Authorization: Bearer …` header and that you are using the right key. |
| `403` | `invitations_disabled` | The owner has not turned on invitations, or has not confirmed that they tell their customers. It is done in «Collecting reviews». |
| `403` | `plan_required` | The business has no active plan. |
| `422` | `validation_failed` | A field is not valid. `field` says which: `email`, `firstName` (up to 80 characters) or `orderRef` (required, up to 100 characters). |
| `429` | `monthly_limit` | The monthly limit of your plan has been reached. Try again next month or upgrade your plan. |
| `500` | `internal_error` | An error on our side. Try again in a moment. Retrying is safe. |

The body of an error is `{"error": "<code>"}`. For `422` it also has `field` and `message`.

The `orderRef` field is required in calls from a shop. Only the form on the «My business» page can leave it out.

See also the full [API reference](/en/api/invitations/).
