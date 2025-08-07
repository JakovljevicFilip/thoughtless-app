#!/bin/bash
set -e

ACTUAL_UID=${HOST_UID:-1000}
APP_PATH="/app"

echo "🔧 Fixing permissions for UID $ACTUAL_UID"

apt-get update && apt-get install -y acl
setfacl -Rm u:${ACTUAL_UID}:rwx,d:u:${ACTUAL_UID}:rwx "$APP_PATH"

echo "🚀 Starting Quasar dev server..."
exec npx quasar dev
