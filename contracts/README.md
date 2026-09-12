# API contract

`openapi.json` is the source of truth for the HTTP API described in `PRD.md` and `TECHNICAL_SPEC.md`.

Validate it without downloading packages:

```sh
bun run contracts/validate-openapi.ts
```

The validator checks JSON syntax, local references, operation IDs, path parameters, and success/error responses.
