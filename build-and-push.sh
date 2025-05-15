#!/bin/bash

# GitHub username and repo
GITHUB_USER=cesarnog
IMAGE_NAME=piratadecacau-watcher
TAG=latest

# Must be logged into GHCR with a PAT (personal access token) or GitHub CLI auth
echo "🔧 Building Docker image..."
docker build -t ghcr.io/$GITHUB_USER/$IMAGE_NAME:$TAG .

echo "🔐 Logging in to GitHub Container Registry..."
echo "You must have run: echo <your-GITHUB-TOKEN> | docker login ghcr.io -u $GITHUB_USER --password-stdin"

echo "📤 Pushing image to GHCR..."
docker push ghcr.io/$GITHUB_USER/$IMAGE_NAME:$TAG

echo "✅ Done! Image available at: https://github.com/$GITHUB_USER?tab=packages"
