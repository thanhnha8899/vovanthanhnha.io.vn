#!/usr/bin/env bash
set -euo pipefail

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

if command -v npm >/dev/null 2>&1; then
  echo "==> npm found, building on server"
  cd "$APP_DIR"
  npm install
  npm run build
else
  echo "==> npm not found on server, using prebuilt dist from repo"
fi

if [ ! -d "$APP_DIR/dist" ]; then
  echo "ERROR: dist folder not found at $APP_DIR/dist"
  echo "Build locally with 'npm run build' in orbis-nft and push the dist folder."
  exit 1
fi

echo "==> Syncing dist to web root"
mkdir -p "$DEPLOY_DIR"
if command -v rsync >/dev/null 2>&1; then
  rsync -av --delete "$APP_DIR/dist/" "$DEPLOY_DIR/"
else
  rm -rf "$DEPLOY_DIR"/*
  cp -r "$APP_DIR/dist/." "$DEPLOY_DIR/"
fi

echo "==> Deploy completed successfully at $(date)"
