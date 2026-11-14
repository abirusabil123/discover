#!/bin/bash
IP_FILE="/home/zeitgeist/.last_wan_ip"
NEW_IP=$(curl -4 -s ifconfig.me)
OLD_IP=$(cat "$IP_FILE" 2>/dev/null)
if [ "$NEW_IP" != "$OLD_IP" ]; then
    echo "$(date): WAN IP changed from $OLD_IP to $NEW_IP. Restarting Docker."
    sudo systemctl restart docker
    echo "$NEW_IP" > "$IP_FILE"
fi
