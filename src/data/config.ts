// ============================================================
// Portfolio Content Config — Edit this file to update content
// ============================================================

export const site = {
  title: "Bayu Ariyadi — CS Graduate, Homelab Builder & AI Enthusiast",
  description: "Portfolio Bayu Ariyadi: AI agent architecture, 9Router homelab, projects, and tech stack.",
  lang: "id" as const,
  brand: "bayu.dev",
  status: "available for work" as const,
};

export const hero = {
  name: "Bayu Ariyadi",
  tagline: "I build AI agents, self-hosted infrastructure, and clean backend systems.",
  description: "Computer Science graduate with deep interest in software architecture, distributed systems, and AI integration. I believe great software should be efficient, clean, and purposeful.",
  cta: [
    { label: "Explore Projects", href: "#projects", primary: true },
    { label: "Get in Touch", href: "#contact", primary: false },
  ],
};

export const about = {
  title: "About Me",
  subtitle: "Background & Philosophy",
  cards: [
    {
      icon: "background",
      title: "Background",
      text: "Lulusan Ilmu Komputer dari Universitas Lambung Mangkurat dengan ketertarikan mendalam pada software architecture, distributed systems, dan AI integration. Selalu penasaran dengan cara kerja sistem dari level low-level sampai high-level orchestration.",
    },
    {
      icon: "philosophy",
      title: "Philosophy",
      text: "Percaya software hebat harus efisien, bersih dari bloatware, dan fungsional. Menghindari AI slop dalam desain maupun kode. Mengutamakan kejelasan, kecepatan, dan estetika minimalis tapi berkarakter.",
    },
  ],
};

export const projects = [
  {
    id: "hermes",
    title: "Hermes Agent & Telegram Bot",
    description: "Autonomous AI agent running on homelab Proxmox with Telegram integration, custom LLM endpoint, 1M token context, and sandbox profile isolation.",
    tags: ["Python", "Hermes", "Telegram API", "Docker"],
    link: "/projects/hermes",
    result: "Manages 3 Telegram bot instances with persistent memory across sessions",
  },
  {
    id: "nine-router",
    title: "9Router AI Gateway",
    description: "Self-hosted AI routing gateway aggregating 95+ LLM models behind one OpenAI-compatible API endpoint. Automatic failover, load balancing, multi-provider support.",
    tags: ["AI Gateway", "Multi-Model", "REST API", "TypeScript"],
    link: "/projects/nine-router",
    result: "95+ models including GPT-5, Gemini, DeepSeek, Claude behind a single endpoint",
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    description: "Built with Astro, anti-slop design principles, terminal aesthetics, scroll animations, and interactive terminal playground. Deployed via Cloudflare Pages.",
    tags: ["Astro", "TypeScript", "CSS", "Cloudflare Pages"],
    link: "#",
    result: "Interactive terminal with 10+ commands, fully responsive, WCAG AA compliant",
  },
];

export const skills = {
  title: "Skills & Tech Stack",
  categories: [
    {
      name: "Languages",
      items: ["Python", "JavaScript", "TypeScript", "Go", "Bash"],
    },
    {
      name: "Frameworks",
      items: ["Astro", "React", "FastAPI", "Express"],
    },
    {
      name: "DevOps",
      items: ["Docker", "Proxmox VE", "Cloudflare", "Tailscale", "Git"],
    },
    {
      name: "AI/ML",
      items: ["LLM Integration", "Hermes Agent", "Prompt Engineering", "RAG"],
    },
  ],
};

export const experience = [
  {
    year: "2024 - now",
    title: "AI Agent Developer",
    description: "Building Hermes Agent infrastructure, 9Router multi-model gateway, and automated Telegram bots for personal and community use.",
  },
  {
    year: "2023 - 2024",
    title: "Homelab Engineer",
    description: "Proxmox VE cluster setup, Docker containerization, Tailscale mesh networking, and Cloudflare Tunnel deployment for remote access.",
  },
  {
    year: "2022 - 2024",
    title: "CS Student",
    description: "Software architecture, distributed systems, algorithms, and data structures at Universitas Lambung Mangkurat.",
  },
];

export const homelab = {
  title: "Homelab Specs",
  specs: [
    { label: "Hypervisor", value: "Proxmox VE (VM)" },
    { label: "Processor", value: "Intel i3-1215U (8 vCPU)" },
    { label: "Memory", value: "7.4 GB RAM" },
    { label: "Storage", value: "NVMe + SSD" },
    { label: "OS", value: "Linux x86_64" },
    { label: "Network", value: "Tailscale + Cloudflare Tunnel" },
  ],
};

export const contact = {
  title: "Get in Touch",
  subtitle: "Have a project in mind? Let's talk.",
  links: [
    { label: "Telegram", url: "https://t.me/bayuariyadi", handle: "@bayuariyadi" },
    { label: "GitHub", url: "https://github.com/bayuariyadi", handle: "bayuariyadi" },
  ],
};

export const terminal = {
  title: "Interactive Terminal",
  commands: {
    help: "Available commands: help, about, skills, projects, contact, whoami, ls, cat, clear, date",
    about: "Bayu Ariyadi — CS Graduate, Homelab Builder & AI Enthusiast. Building AI agents and self-hosted infrastructure.",
    skills: "Python, JavaScript, TypeScript, Go, Bash, Astro, React, FastAPI, Docker, Proxmox VE, Cloudflare, Tailscale, LLM Integration",
    projects: "1. Hermes Agent & Telegram Bot\n2. 9Router AI Gateway\n3. This Portfolio",
    contact: "Telegram: @bayuariyadi | GitHub: bayuariyadi",
    whoami: "bayu",
    ls: "README.md  projects/  homelab/  skills/  experience/",
    "cat README.md": "Bayu Ariyadi — CS Graduate. I build AI agents, self-hosted infrastructure, and clean backend systems.",
    clear: "__CLEAR__",
    date: () => new Date().toLocaleString(),
  },
};
