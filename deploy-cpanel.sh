#!/usr/bin/env bash
set -euo pipefail

# One-command deploy script for cPanel shared hosting.
# It updates source code, builds the Vite app, and syncs dist to public_html.

REPO_DIR="/home/dtthoith/vovanthanhnha.io.vn"
APP_SUBDIR="orbis-nft"
BRANCH="main"
DEPLOY_DIR="/home/dtthoith/public_html/vovanthanhnha"

APP_DIR="$REPO_DIR/$APP_SUBDIR"

echo "==> Starting deploy at $(date)"
echo "==> Repo: $REPO_DIR"
echo "==> App:  $APP_DIR"
echo "==> Target deploy dir: $DEPLOY_DIR"

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "ERROR: Git repo not found at $REPO_DIR"
  exit 1
fi

if [ ! -d "$APP_DIR" ]; then
  echo "ERROR: App directory not found at $APP_DIR"
  exit 1
fi

echo "==> Updating code from origin/$BRANCH"
git -C "$REPO_DIR" fetch origin
git -C "$REPO_DIR" checkout "$BRANCH"
git -C "$REPO_DIR" pull --ff-only origin "$BRANCH"

echo "==> Installing dependencies"
cd "$APP_DIR"
npm install

echo "==> Building production bundle"
npm run build

if [ ! -d "$APP_DIR/dist" ]; then
  echo "ERROR: Build completed but dist folder was not found."
  exit 1
fi

echo "==> Syncing dist to web root"
mkdir -p "$DEPLOY_DIR"
rsync -av --delete "$APP_DIR/dist/" "$DEPLOY_DIR/"

echo "==> Deploy completed successfully at $(date)"
