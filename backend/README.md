# 🌏 Local Backend Setup
A containerized Node.js (v18, Alpine) backend with MySQL 8.0, automatically creating the database and inserting sample data on first run.

Publicly exposed at https://backenddiscover.duckdns.org:8443 to forward requests to the local Node.js app on port 8090.

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
curl http://https://backenddiscover.duckdns.org:8443/getLinksDesktop
curl http://https://backenddiscover.duckdns.org:8443/health
```

### 3. Reinitialize the links database
```bash
docker compose exec db mysql -u root -ppassword mydatabase -e "DROP TABLE links;"
cat db/init.sql | docker compose exec -T db mysql -u root -ppassword mydatabase
```

### 4. Get SQL data directly
Run in the `backend-db-1` docker container `Exec`.

```bash
sh-5.1# mysql -u root -p
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
