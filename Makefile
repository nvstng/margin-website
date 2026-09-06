PORT ?= 3006

.PHONY: help deploy free-my-port

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "  deploy         Build and deploy to Cloudflare Pages (marginapp.in)"
	@echo "  free-my-port   Kill whatever is listening on port $(PORT)"

deploy:
	npm run build
	wrangler pages deploy dist --project-name margin-website

free-my-port:
	@pids=$$(lsof -ti tcp:$(PORT)); \
	if [ -n "$$pids" ]; then \
		echo "Killing process(es) $$pids on port $(PORT)"; \
		kill -9 $$pids; \
	else \
		echo "Nothing listening on port $(PORT)"; \
	fi
