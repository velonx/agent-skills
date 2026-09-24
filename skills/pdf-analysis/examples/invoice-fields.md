# Example — invoice field extraction

**Field spec**

| Field | Type | Rule |
|---|---|---|
| `invoice_number` | string | As printed, keep prefixes |
| `invoice_date` | date | ISO `YYYY-MM-DD` |
| `vendor` | string | Legal name from the header |
| `currency` | string | ISO 4217 code |
| `total` | number | Grand total incl. tax |
| `page` | number | Page the total was found on |

**Output (one object per file)**

```json
{
  "file": "acme-0931.pdf",
  "invoice_number": "INV-0931",
  "invoice_date": "2026-08-14",
  "vendor": "Acme Supplies Pvt Ltd",
  "currency": "INR",
  "total": 48260.0,
  "page": 2,
  "notes": null
}
```

Files where any field is `null` are listed separately at the end with the reason (e.g. "scanned page, OCR confidence low").
