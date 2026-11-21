---
title: Get started connecting your shop
description: From turning on invitations to the first invitation from your shop, using the test key.
---

Your shop (or your developer) calls Reviewit as soon as an order is completed. We send the email to the customer, after the delay you set.

:::note
Steps 2 to 5 are done by the **owner** of the business, on the page **My business → Connect your shop** (Η επιχείρησή μου → Σύνδεση καταστήματος).
:::

## 1. Turn on invitations {#enable-invitations}

In **Collecting reviews** (Συλλογή κριτικών) turn on «Send invitations» (Αποστολή προσκλήσεων) and confirm that you tell your customers. Without it, every call is answered with `invitations_disabled`.

## 2. Create the key {#create-key}

In **Connect your shop** click **Create key** (Δημιουργία κλειδιού). The key starts with `rvk_` and is **shown once**: copy it right away and keep it as you would a password.

- Use it only from your shop's **server**, never from code that runs in the customer's browser.
- If you lose it, or you suspect it leaked, create a new one: the old one stops working at once.

## 3. Try it with the test key {#test-key}

Also create a **test key** (it starts with `rvk_test_`) and give it to your developer. With it the answer is exactly the same, with `"test": true` added, but **no email is sent, no invitation is created and nothing counts against your plan's limit**. So you can try as many times as you like.

A test key is checked against the real invitations: if the order number already has a real invitation, you get `skipped`.

## 4. See the result {#see-result}

In **Recent calls** (Πρόσφατες κλήσεις) you see your shop's calls for the last 30 days, with the time, whether they were made with the test key or the live one, the order number and what we answered. We do not keep the customer's email or name. If something does not work, this is where you see it first: you see whether the call arrives at all. See also [responses and errors](/en/connect/responses-and-errors/).

## 5. Switch to the live key {#go-live}

When the test goes well, put the live key in the shop. The code sample for your language is [here](/en/connect/code-samples/).

## Good practice {#best-practices}

- **Call it after the order is completed**, not before. If you only want to invite those who received their order, call it when the order is shipped.
- **Do not let an error or a slow answer stop the customer's order.** Set a time limit (for example 10 seconds) and ignore or log the error.
- **Retrying is safe.** The same order is not sent twice. If you are not sure the call went through, send it again.
- **Send only what is needed:** email, first name, order number.
