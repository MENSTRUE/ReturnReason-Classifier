# Screenshot evidence (manual UI cases, 26 October 2026)

These screenshots were provided during interactive testing and are **not** official model evaluation metrics. They document selected failures and UI behavior:

| File | Meaning |
|---|---|
| `00-dashboard-empty.png` | React dashboard and health badge |
| `01-broken-item-misclassified.png` | Broken item incorrectly predicted `missing_item` |
| `02-missing-item-misclassified.png` | Missing quantity incorrectly predicted `wrong_item` |
| `03-negation-zipper-misclassified.png` | Broken zipper incorrectly predicted `size` |
| `04-negation-size-misclassified.png` | Oversized but undamaged item incorrectly predicted `defect` |
| `05-multi-intent-size.png` | Two simultaneous issues collapsed into one size label |
| `06-out-of-scope-misclassified.png` | Opening-hours question incorrectly predicted as return reason |
| `07-multi-intent-review.png` | Multiple explicit issues, still reduced to one top class |

No successful-case screenshot is claimed unless explicitly captured and verified. Do not use these images to estimate customer accuracy.
