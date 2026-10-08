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

TOOLS_DIR="$PROJECT_ROOT/tools"

# ── 1. Dump current links from API for inspection/editing ──
echo "▶ Dumping current links from API..."
(cd "$TOOLS_DIR" && node dump-websites.js)

echo
echo "──────────────────────────────────────────────────────────"
echo "  Dump complete. Files written:"
echo "    $TOOLS_DIR/links-dump.json"
echo "    $TOOLS_DIR/links-summary.json"
echo
echo "  Make your edits now, then press Enter to continue."
echo "──────────────────────────────────────────────────────────"
read -r

# ── 2. Regenerate static link files (init.sql, static.js, StaticLinks.kt) ──
echo "▶ Regenerating static link files..."
(cd "$TOOLS_DIR" && node recreate-static-links.js)

# ── 3. Backup and reinit the DB ──
echo "▶ Backing up 'links' table..."
docker compose exec "$DB_SERVICE" mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" \
  -e "DROP TABLE IF EXISTS linksBackup; RENAME TABLE links TO linksBackup;"

echo "▶ Reinitializing from $INIT_SQL..."
docker compose exec -T "$DB_SERVICE" mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$INIT_SQL"

echo "✔ Database reinitialized."