---
title: Send with a form or a CSV file
description: Send one invitation or many at once from the «My business» page, without a shop and without a developer.
---

If you have no online shop, or you want to invite customers who did not buy through it, send the invitations from **My business → Collecting reviews → Send invitations now** (Η επιχείρησή μου → Συλλογή κριτικών → Στείλτε προσκλήσεις τώρα).

The same [rules](/en/business/invite-customers/#rules) apply as for automatic invitations: the email is sent after the delay you set, and it is not sent to anyone who asked not to receive them, who has already written a review, or who was invited by you in the last 90 days.

## One customer {#one-customer}

On the **One customer** tab (Ένας πελάτης) fill in:

- **Customer email** (required),
- **Name** (optional),
- **Order number** (optional).

If you have no order number, leave the field empty and we make one. Click **Send invitation** (Αποστολή πρόσκλησης).

## Many customers, from a CSV file {#csv-file}

On the **CSV file** tab (Αρχείο CSV):

1. Make a CSV file, from Excel or Google Sheets (**File → Download → CSV**), with one row per customer. You can download an example from the «Download an example» link (Κατεβάστε ένα παράδειγμα) on the page.
2. Choose the file. You will see how many customers we found.
3. Click **Send invitations** (Αποστολή προσκλήσεων).

Up to **500 rows** at a time.

### The columns {#columns}

With titles in the first row, the columns can be in any order:

```csv
email,name,order
maria@example.gr,Maria,1001
nikos@example.gr,Nikos,
```

Without titles, the first column has the emails, the second the names and the third the order numbers. The name and the order number can be missing. The separator can be a comma, a semicolon (as Greek Excel writes it) or a tab.

The file is read in your browser, and we only send the rows.

## After sending {#after-sending}

You see how many invitations were queued and how many were not. The rows that were not sent are shown in a table, with the reason:

- the email is not valid, or the name or the order number is too long,
- there is already an invitation for this order,
- the customer was already invited in the last 90 days,
- the customer has already written a review of your business,
- the customer has asked not to receive invitations,
- the monthly limit of your plan has been reached.

### If the file has more customers than the limit {#too-many-rows}

Before you send, the page warns you: «Your plan still allows 300 invitations this month. The first 300 will be sent and the rest will not.» The remaining rows are not sent. Try again next month or upgrade your plan.
