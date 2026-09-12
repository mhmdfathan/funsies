.PHONY: dev frontend backend contract-check

# Run both workspace development servers with Bun's parallel process runner.
dev:
	bun run --workspaces --parallel dev

frontend:
	bun run --filter frontend dev

backend:
	bun run --filter backend dev

contract-check:
	bun run contract:check
