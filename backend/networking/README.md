# 🌐 DNS and TLS

This deployment uses:
- DuckDNS (`backenddiscover.duckdns.org`) for dynamic DNS updates.
- `acme.sh` with ZeroSSL for automatic TLS certificates.
- Nginx reverse proxy (HTTPS port `8443` → Node.js `8090`).
- **IP‑change auto‑restart**: `scripts/check-ip-restart-docker.sh` (runs via cron) restarts Docker when the WAN IP changes, fixing iptables rules automatically.

## Certificate renewal hook

After successful certificate renewal, Nginx is automatically reloaded:

```bash
docker exec backend-nginx-1 nginx -s reload
```

## Logs

```bash
tail -f ~/duckdns.log
tail -f ~/.acme.sh/acme-renew.log
```
