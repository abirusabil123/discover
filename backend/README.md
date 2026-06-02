# 🌏 Local Backend Setup
A containerized Node.js (v18, Alpine) backend with MySQL 8.0, automatically creating the database and inserting sample data on first run.

Publicly exposed at https://backenddiscover.duckdns.org:8443 to forward requests to the local Node.js app on port 8090.

## 🌐 DNS and TLS

This deployment uses:

* DuckDNS (`backenddiscover.duckdns.org`) for dynamic DNS updates.
* `acme.sh` with ZeroSSL for automatic TLS certificate issuance and renewal.
* Nginx as a reverse proxy exposing HTTPS on port `8443` and forwarding requests to the Node.js application on port `8090`.

Certificate files are stored on the host:

```text
/home/zeitgeist/.acme.sh/backenddiscover.duckdns.org_ecc
```

and mounted read-only into the Nginx container:

```text
/etc/nginx/ssl
```

### Cron jobs

```cron
# Update DuckDNS every 5 minutes
*/5 * * * * curl -ks "https://www.duckdns.org/update?domains=backenddiscover&token=<TOKEN>&ip=" >> /home/zeitgeist/duckdns.log 2>&1

# Check certificate renewal daily at 18:35
35 18 * * * "/home/zeitgeist/.acme.sh"/acme.sh --cron --home "/home/zeitgeist/.acme.sh" >> /home/zeitgeist/.acme.sh/acme-renew.log 2>&1
```

### Certificate renewal hook

After successful certificate renewal, Nginx is automatically reloaded:

```bash
docker exec backend-nginx-1 nginx -s reload
```

### Logs

```bash
tail -f ~/duckdns.log
tail -f ~/.acme.sh/acme-renew.log
```

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
docker compose exec db mysql -u root -ppassword mydatabase -e "DROP TABLE links;"
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
