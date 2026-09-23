---
title: "Building a Self-Hosted AI Gateway (9Router)"
description: "Routing LLM requests efficiently behind a single endpoint with 95+ model support."
date: 2026-09-18
tags: ["AI", "TypeScript", "Gateway"]
---

Managing multiple LLM providers is a chore. Switching between OpenAI, Anthropic, and self-hosted models breaks the workflow. I needed a way to unify them under a single, standardized API.

## The 9Router Concept

**9Router** is a lightweight AI gateway built to sit in front of your model endpoints. It acts as a proxy, directing traffic based on availability, load, and specific routing rules.

### Key Features

- **Unified API:** Compatible with standard OpenAI chat completion schemas.
- **Dynamic Routing:** Automatic failover if a specific provider goes down.
- **Model Pooling:** Supports 95+ models, aggregating both commercial and local endpoints.

## Implementation Details

Built with TypeScript and Node.js, the gateway intercepts incoming requests and applies rate limiting, authentication, and routing strategies before forwarding to the correct backend.

```typescript
// Route logic pseudo-code
const provider = router.resolveProvider(request.model);
const result = await provider.proxy(request);
```

## Performance Gains

By standardizing the access layer, clients only need to implement one robust HTTP client. This simplifies architecture and reduces retry logic in downstream applications.
