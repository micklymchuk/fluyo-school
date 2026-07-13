# Content Gate

Launch-sensitive content records use `sourceStatus` plus a route-selected render mode.

## Render Modes

- `preview`: local implementation mode. Records with `approved`, `mock`, `needs_input`, and `needs_review` can render so unfinished sections remain visible during development.
- `production`: public mode. Only `approved` records can render. `mock`, `needs_input`, `needs_review`, and `hidden` records are filtered before route components receive them.

`hidden` records never render in either mode.

## Status Handling

| Status | Preview | Production | Route handling |
| --- | --- | --- | --- |
| `approved` | Render | Render | Public-safe content. |
| `mock` | Render | Omit | Do not restyle as real proof, teachers, prices, or reviews. |
| `needs_input` | Render | Omit | Treat as missing launch input. |
| `needs_review` | Render | Omit | Treat as unresolved approval work. |
| `hidden` | Omit | Omit | Collapse the item or section cleanly. |

Use `filterRenderableContentRecords(records, renderMode)` before mapping localized content into public route UI. If filtering leaves a section empty, hide that section and let surrounding layout close the space.

Localized content adapters default launch-sensitive collections to `production`. Pass `preview` explicitly when a local implementation screen needs unresolved draft records.

## Release Gate

Run:

```sh
npm run content:gate
```

The command reports blocking records required for launch and non-blocking unresolved records that production mode will hide. Blocking issues currently fail the command so unresolved prices, policy-sensitive FAQ answers, required assets, or the Telegram fallback cannot be missed during launch review.
