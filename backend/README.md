# 🌏 Local Backend Setup
A containerized Node.js (v18, Alpine) backend with MySQL 8.0, automatically creating the database and inserting sample data on first run.

Publicly exposed at https://backenddiscover.duckdns.org:8443 to forward requests to the local Node.js app on port 8090.

The full cron setup and sudoers backup are in `scripts/`.

## ⚙️ Prerequisites
- Linux
- Docker engine

Ensure to use docker engine on Linux and not use docker desktop to preserve request ip addresses.
The problem with docker desktop is that it uses a VM that hides request ip addresses.

## 🚀 Quick Start

### 1. Start the containers
```bash
cd backend
docker compose up -d --build
```

### 2. Verify it's working
```bash
curl https://backenddiscover.duckdns.org:8443/getLinksDesktop
curl https://backenddiscover.duckdns.org:8443/health
```

### 3. Reinitialize the links database
```bash
docker compose exec db mysql -u root -ppassword mydatabase -e "DROP TABLE IF EXISTS linksBackup; RENAME TABLE links TO linksBackup;"
cat db/init.sql | docker compose exec -T db mysql -u root -ppassword mydatabase
```

### 4. Get SQL data directly
```bash
(base) zeitgeist@zeitgeist-myai:~/Documents/github/discover/backend$ docker ps | grep mysql
0feab0ee6e8a   mysql:8.0      "docker-entrypoint.s…"   6 days ago      Up 4 days (healthy)   3306/tcp, 33060/tcp             backend-db-1
(base) zeitgeist@zeitgeist-myai:~/Documents/github/discover/backend$ docker exec -it 0feab0ee6e8a mysql -u root -p
<or>
(base) zeitgeist@zeitgeist-myai:~/Documents/github/discover/backend$ docker compose exec db mysql -u root -p
# password is password
mysql> SHOW DATABASES;
mysql> USE mydatabase
mysql> SELECT * FROM visitors ORDER BY timestamp DESC;
mysql> SELECT * FROM visitors WHERE country NOT IN ('IN') ORDER BY timestamp DESC;
```

### 5. Get logs
```bash
docker compose logs -f

docker compose logs -f app
docker compose logs db
```

## 🔧 Management Commands
```bash
# Stop containers
docker compose down

# Delete all SQL data
docker volume rm $(basename $(pwd))_mysql_data

# Build changes to app
docker compose build app

# Rebuild after code changes
docker compose up -d --build

# Restart containers
docker compose restart
```
