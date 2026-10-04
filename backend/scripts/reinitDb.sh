#!/usr/bin/env bash
set -euo pipefail

# Resolve project root (one level up from this script's folder)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

# Config
DB_SERVICE="db"
DB_USER="root"
DB_PASS="password"
DB_NAME="mydatabase"
INIT_SQL="db/init.sql"

echo "▶ Running from: $PROJECT_ROOT"

echo "▶ Backing up 'links' table..."
docker compose exec "$DB_SERVICE" mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" \
  -e "DROP TABLE IF EXISTS linksBackup; RENAME TABLE links TO linksBackup;"

echo "▶ Reinitializing from $INIT_SQL..."
docker compose exec -T "$DB_SERVICE" mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$INIT_SQL"

echo "✔ Database reinitialized."