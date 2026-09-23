---
title: "Building an Autonomous AI Agent in a Proxmox Homelab"
description: "How I set up Hermes Agent on a Proxmox VE VM with Telegram bot integration and 1M token context."
date: 2026-09-20
tags: ["AI", "Python", "Homelab", "Proxmox"]
---

Running an autonomous AI agent in a home server setup requires balancing isolation, resource limits, and continuous availability. In this post, I will break down how I built and deployed **Hermes Agent** inside my Proxmox VE homelab.

## Architecture Overview

The system runs on an 8 vCPU Intel i3-1215U machine with 7.4 GB RAM. Key components:

- **Hypervisor:** Proxmox VE (VM encapsulation)
- **Networking:** Tailscale mesh + Cloudflare Tunnels for secure ingress
- **Model Endpoint:** Custom gateway routing requests efficiently

## Telegram Bot Integration

By wiring Hermes to the Telegram Bot API, the agent acts as an always-on assistant. It handles scheduled cron tasks, file searches, and system health checks directly from chat.

```python
# Sample agent invocation loop
async def handle_message(update, context):
    user_msg = update.message.text
    response = await agent.process(user_msg)
    await update.message.reply_text(response)
```

## Security & Isolation

Running local agents means protecting host resources. I configured sandbox profiles and strict filesystem permissions to ensure safety during tool executions.
