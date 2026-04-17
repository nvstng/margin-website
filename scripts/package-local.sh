#!/bin/bash

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ARTIFACTS_DIR="/tmp/margin-artifacts"
cd "$ROOT_DIR"

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}==>${NC} $1"; }
die() { echo -e "${RED}ERROR:${NC} $1" >&2; exit 1; }

mkdir -p "$ARTIFACTS_DIR"

log "Installing dependencies..."
npm ci

log "Building margin-website..."
npm run build

log "Packaging margin-website..."
rm -rf deploy/
mkdir -p deploy/margin-website
cp -r dist            deploy/margin-website/
cp    package.json    deploy/margin-website/
tar -czvf "$ARTIFACTS_DIR/margin-website-deploy.tar.gz" deploy/
rm -rf deploy/

log "Created $ARTIFACTS_DIR/margin-website-deploy.tar.gz"
ls -lh "$ARTIFACTS_DIR/margin-website-deploy.tar.gz"
