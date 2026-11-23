---
title: Platforms
description: Which e-commerce platforms can send invitations to Reviewit.
---

There is a ready-made plugin for WooCommerce. For everything else Reviewit needs no plugin: one HTTP request that sends the email, the name and the order number is enough. Anything that can send such a request with an `Authorization` header can send invitations.

## What works today {#available-now}

| Platform | How |
|---|---|
| **WooCommerce** | Install the plugin [Reviewit Review Invitations for WooCommerce](https://wordpress.org/plugins/reviewit-invitations/) from WordPress.org and activate it. [Create a key](/en/connect/get-started/) on the «My business» page (Η επιχείρησή μου) and paste it in **WooCommerce → Reviewit**. The invitation is sent when an order becomes «Completed». |
| **Any shop with its own code** (OpenCart, PrestaShop, your own) | Call the API from your server. See the [code samples](/en/connect/code-samples/). |
| **Anyone without a shop or a developer** | The [form or CSV file](/en/business/send-csv/) on the «My business» page. |
