.PHONY: help deploy

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "  deploy   Build and deploy to Cloudflare Pages (marginapp.in)"

deploy:
	npm run build
	wrangler pages deploy dist --project-name margin-website
