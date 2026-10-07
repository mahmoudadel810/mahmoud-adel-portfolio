/**
 * Single source of truth for every word on the site (English + Arabic).
 * Arabic strings are marked `// review-ar` so a native reviewer can find them.
 * Technology names, URLs and emails stay in English in both locales.
 */

export type Locale = "en" | "ar";

export type ProjectSlug = "saknly" | "3mmile" | "pionner" | "contora" | "testly";
export type CaseStudySlug = "saknly" | "pionner" | "contora";

/* ------------------------------------------------------------------ */
/* Shared, untranslated facts                                          */
/* ------------------------------------------------------------------ */

export const contact = {
  email: "ma.adel.810@gmail.com",
  linkedin: "https://www.linkedin.com/in/mahmoud-adel--",
  github: "https://github.com/mahmoudadel810",
  cv: "/cv/Mahmoud-Adel-Abdulwahab-Software-Engineer-EG.pdf",
  cvFileName: "Mahmoud-Adel-Abdulwahab-Software-Engineer-EG.pdf",
  photo: "/me.jpg",
} as const;

export interface RepoLink {
  label: string;
  href: string;
}

/** An architecture diagram, rendered to SVG at build time by scripts/render-diagrams.ts. */
export interface ArchitectureSpec {
  direction: "LR" | "TB";
  nodes: { id: string; label: string; kind?: "client" | "service" | "data" | "external" }[];
  edges: { from: string; to: string; label?: string; dashed?: boolean }[];
}

export interface ProjectMeta {
  slug: ProjectSlug;
  live?: string;
  apiDocs?: string;
  code: RepoLink[];
  stack: string[];
  caseStudy: boolean;
  /** Full diagram (case-study page) and compact diagram (project card). */
  architecture: ArchitectureSpec;
  compactArchitecture: ArchitectureSpec;
}

export const projectsMeta: ProjectMeta[] = [
  {
    slug: "saknly",
    live: "https://saknly-ruddy.vercel.app",
    code: [
      { label: "Client", href: "https://github.com/mahmoudadel810/Saknly-client" },
      { label: "Server", href: "https://github.com/mahmoudadel810/Saknly-server" },
    ],
    stack: [
      "Node.js",
      "Express 5",
      "Mongoose",
      "JWT",
      "Joi",
      "Passport (Google sign-in)",
      "Multer + sharp + Cloudinary",
      "Google Gemini",
      "Vitest + Supertest",
      "Next.js 15 (App Router, TypeScript)",
      "MUI 7 (RTL, dark mode)",
      "TanStack Query",
      "Leaflet",
      "MongoDB Atlas",
      "Vercel",
    ],
    caseStudy: true,
    architecture: {
      direction: "LR",
      nodes: [
        { id: "web", label: "Next.js 15 client<br/>MUI 7 · TanStack Query · Leaflet", kind: "client" },
        { id: "api", label: "Express 5 REST API<br/>JWT · Joi · Passport", kind: "service" },
        { id: "db", label: "MongoDB Atlas<br/>Mongoose", kind: "data" },
        { id: "img", label: "Cloudinary<br/>Multer + sharp", kind: "external" },
        { id: "ai", label: "Google Gemini<br/>chatbot", kind: "external" },
        { id: "oauth", label: "Google sign-in", kind: "external" },
      ],
      edges: [
        { from: "web", to: "api", label: "HTTPS + JWT" },
        { from: "api", to: "db" },
        { from: "api", to: "img", label: "listing photos" },
        { from: "api", to: "ai", label: "listing context" },
        { from: "api", to: "oauth", dashed: true },
      ],
    },
    compactArchitecture: {
      direction: "TB",
      nodes: [
        { id: "web", label: "Next.js", kind: "client" },
        { id: "api", label: "Express API", kind: "service" },
        { id: "db", label: "MongoDB", kind: "data" },
        { id: "ai", label: "Gemini", kind: "external" },
      ],
      edges: [
        { from: "web", to: "api" },
        { from: "api", to: "db" },
        { from: "api", to: "ai" },
      ],
    },
  },
  {
    slug: "3mmile",
    live: "https://app.3mmile.io",
    code: [],
    stack: ["Next.js", "MongoDB/Mongoose", "Cloudinary"],
    caseStudy: false,
    architecture: {
      direction: "LR",
      nodes: [
        { id: "web", label: "Next.js site + admin CMS", kind: "client" },
        { id: "db", label: "MongoDB<br/>Mongoose", kind: "data" },
        { id: "img", label: "Cloudinary", kind: "external" },
      ],
      edges: [
        { from: "web", to: "db" },
        { from: "web", to: "img", label: "media" },
      ],
    },
    compactArchitecture: {
      direction: "LR",
      nodes: [
        { id: "web", label: "Next.js + CMS", kind: "client" },
        { id: "db", label: "MongoDB", kind: "data" },
        { id: "img", label: "Cloudinary", kind: "external" },
      ],
      edges: [
        { from: "web", to: "db" },
        { from: "web", to: "img" },
      ],
    },
  },
  {
    slug: "pionner",
    live: "https://pionner-v21.vercel.app",
    code: [{ label: "Code", href: "https://github.com/mahmoudadel810/Pionner-EcommerceProject" }],
    stack: [
      "Node.js",
      "Express",
      "Mongoose",
      "Joi",
      "JWT + refresh tokens",
      "Winston",
      "Vercel serverless",
      "React 18",
      "Vite",
      "Tailwind",
      "shadcn/ui",
      "Zustand",
      "i18next",
      "MongoDB Atlas",
      "Redis (optional)",
      "Stripe (payments + webhooks)",
      "Cloudinary",
      "Nodemailer",
    ],
    caseStudy: true,
    architecture: {
      direction: "LR",
      nodes: [
        { id: "spa", label: "React 18 SPA<br/>Vite · Zustand · i18next", kind: "client" },
        { id: "api", label: "Express API<br/>Vercel serverless function", kind: "service" },
        { id: "db", label: "MongoDB Atlas<br/>Mongoose", kind: "data" },
        { id: "cache", label: "Redis<br/>optional cache", kind: "data" },
        { id: "stripe", label: "Stripe<br/>Checkout", kind: "external" },
        { id: "img", label: "Cloudinary", kind: "external" },
        { id: "mail", label: "Nodemailer<br/>SMTP", kind: "external" },
      ],
      edges: [
        { from: "spa", to: "api", label: "JWT + refresh cookie" },
        { from: "api", to: "db" },
        { from: "api", to: "cache", dashed: true },
        { from: "api", to: "stripe", label: "checkout session" },
        { from: "stripe", to: "api", label: "webhook", dashed: true },
        { from: "api", to: "img" },
        { from: "api", to: "mail" },
      ],
    },
    compactArchitecture: {
      direction: "TB",
      nodes: [
        { id: "spa", label: "React SPA", kind: "client" },
        { id: "api", label: "Express API", kind: "service" },
        { id: "db", label: "MongoDB", kind: "data" },
        { id: "stripe", label: "Stripe", kind: "external" },
      ],
      edges: [
        { from: "spa", to: "api" },
        { from: "api", to: "db" },
        { from: "api", to: "stripe" },
      ],
    },
  },
  {
    slug: "contora",
    code: [
      { label: "API", href: "https://github.com/mahmoudadel810/contora-api" },
      { label: "Web", href: "https://github.com/mahmoudadel810/contora-web" },
    ],
    stack: [
      "NestJS",
      "Mongoose",
      "zod",
      "Vitest",
      "Angular (standalone, signals, zoneless)",
      "Angular Material",
      "MongoDB",
      "SHA-256 content-addressed file storage",
      "Docker",
      "nginx",
      "Azure OpenAI",
    ],
    caseStudy: true,
    architecture: {
      direction: "LR",
      nodes: [
        { id: "web", label: "Angular client<br/>signals · zoneless · Material", kind: "client" },
        { id: "nginx", label: "nginx<br/>Docker", kind: "service" },
        { id: "api", label: "NestJS API<br/>zod · access grants · audit log", kind: "service" },
        { id: "db", label: "MongoDB<br/>tenant-scoped data", kind: "data" },
        { id: "files", label: "File storage<br/>SHA-256 content-addressed", kind: "data" },
        { id: "ai", label: "Azure OpenAI<br/>assistant · metadata extraction", kind: "external" },
      ],
      edges: [
        { from: "web", to: "nginx" },
        { from: "nginx", to: "api", label: "/api" },
        { from: "api", to: "db" },
        { from: "api", to: "files" },
        { from: "api", to: "ai", dashed: true, label: "optional" },
      ],
    },
    compactArchitecture: {
      direction: "TB",
      nodes: [
        { id: "web", label: "Angular", kind: "client" },
        { id: "api", label: "NestJS API", kind: "service" },
        { id: "db", label: "MongoDB", kind: "data" },
        { id: "files", label: "SHA-256 files", kind: "data" },
        { id: "ai", label: "Azure OpenAI", kind: "external" },
      ],
      edges: [
        { from: "web", to: "api" },
        { from: "api", to: "db" },
        { from: "api", to: "files" },
        { from: "api", to: "ai", dashed: true },
      ],
    },
  },
  {
    slug: "testly",
    live: "https://testly-sand.vercel.app",
    apiDocs: "https://testly-server.vercel.app/testly/v1/docs",
    code: [
      { label: "Client", href: "https://github.com/mahmoudadel810/Testly" },
      { label: "Server", href: "https://github.com/mahmoudadel810/Testly-Server" },
    ],
    stack: [
      "Node.js",
      "Express 5",
      "Mongoose",
      "JWT",
      "Joi",
      "Redis",
      "Swagger",
      "Angular 19",
      "NgRx",
      "Bootstrap 5",
      "MongoDB Atlas",
      "Vercel",
    ],
    caseStudy: false,
    architecture: {
      direction: "LR",
      nodes: [
        { id: "web", label: "Angular 19 + NgRx", kind: "client" },
        { id: "api", label: "Express 5 API<br/>server-side grading", kind: "service" },
        { id: "db", label: "MongoDB Atlas", kind: "data" },
        { id: "cache", label: "Redis", kind: "data" },
      ],
      edges: [
        { from: "web", to: "api", label: "answers only" },
        { from: "api", to: "db" },
        { from: "api", to: "cache" },
      ],
    },
    compactArchitecture: {
      direction: "TB",
      nodes: [
        { id: "web", label: "Angular", kind: "client" },
        { id: "api", label: "Express API", kind: "service" },
        { id: "db", label: "MongoDB", kind: "data" },
        { id: "cache", label: "Redis", kind: "data" },
      ],
      edges: [
        { from: "web", to: "api" },
        { from: "api", to: "db" },
        { from: "api", to: "cache" },
      ],
    },
  },
];

export const caseStudySlugs: CaseStudySlug[] = ["saknly", "pionner", "contora"];

/* ------------------------------------------------------------------ */
/* Translated content                                                  */
/* ------------------------------------------------------------------ */

export type SectionId = "about" | "experience" | "highlights" | "projects" | "skills" | "contact";
export type HighlightId = "idempotent" | "agents" | "tenants" | "grading";

export interface Role {
  title: string;
  company: string;
  location: string;
  /** Date range, e.g. "Aug 2025 – Present". Western digits in both locales. */
  dates: string;
  bullets: string[];
  /** Indexes of the bullets shown on the home page (3–4 strongest). */
  featured: number[];
  tech: string[];
}

export interface Decision {
  title: string;
  why: string;
  tradeoff: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  architectureNote: string;
  decisions: Decision[];
}

export interface ProjectText {
  title: string;
  oneLiner: string;
  built: string[];
  diagramAlt: string;
}

export interface Content {
  meta: { title: string; description: string };
  identity: {
    name: string;
    title: string;
    oneLiner: string;
    location: string;
    availability: string;
    photoAlt: string;
  };
  ui: {
    skipToContent: string;
    nav: Record<SectionId, string>;
    downloadCv: string;
    emailMe: string;
    menu: string;
    closeMenu: string;
    switchLanguage: string;
    languageShort: string;
    themeToggle: string;
    themeLight: string;
    themeDark: string;
    primaryNav: string;
    viewResume: string;
    live: string;
    code: string;
    apiDocs: string;
    readCaseStudy: string;
    moreStack: (n: number) => string;
    copyEmail: string;
    copied: string;
    copyFailed: string;
    problemLabel: string;
    resultLabel: string;
    footer: string;
    backHome: string;
    onThisPage: string;
    previousProject: string;
    nextProject: string;
    allProjects: string;
    newTab: string;
    caseStudySections: {
      overview: string;
      problem: string;
      built: string;
      architecture: string;
      decisions: string;
      links: string;
    };
    decisionWhy: string;
    decisionTradeoff: string;
    notFoundTitle: string;
    notFoundBody: string;
    educationTitle: string;
    languagesTitle: string;
    architectureLabel: string;
    moreProjectsNote: string;
    moreProjectsCta: string;
    showAll: (n: number) => string;
    showLess: string;
    scrollDiagram: string;
  };
  about: { paragraphs: [string, string]; stats: [string, string, string] };
  experience: Role[];
  highlights: Record<HighlightId, { title: string; problem: string; result: string; diagramLabel: string; badge?: string }>;
  projects: Record<ProjectSlug, ProjectText>;
  caseStudies: Record<CaseStudySlug, CaseStudy>;
  skills: { group: string; items: string[] }[];
  education: { degree: string; school: string; dates: string }[];
  languages: { name: string; level: string }[];
  contact: { lead: string };
}

/* ------------------------------- English ------------------------------- */

const en: Content = {
  meta: {
    title: "Mahmoud Adel Abdulwahab — Software Engineer (Full Stack)",
    description:
      "Backend-focused engineer building distributed systems, secure APIs, and AI-powered features in Node.js and TypeScript. Based in Cairo, Egypt.",
  },
  identity: {
    name: "Mahmoud Adel Abdulwahab",
    title: "Software Engineer (Full Stack)",
    oneLiner:
      "Backend-focused engineer building distributed systems, secure APIs, and AI-powered features in Node.js and TypeScript.",
    location: "Cairo, Egypt",
    availability: "Open to opportunities",
    photoAlt: "Portrait of Mahmoud Adel Abdulwahab",
  },
  ui: {
    skipToContent: "Skip to content",
    nav: {
      about: "About",
      experience: "Experience",
      highlights: "Highlights",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    downloadCv: "Download CV",
    emailMe: "Email me",
    menu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "اقرأ بالعربية",
    languageShort: "ع",
    themeToggle: "Toggle color theme",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    primaryNav: "Sections",
    viewResume: "View full résumé",
    live: "Live",
    code: "Code",
    apiDocs: "API docs",
    readCaseStudy: "Read case study",
    moreStack: (n) => `+${n}`,
    copyEmail: "Copy email address",
    copied: "Email address copied",
    copyFailed: "Couldn't copy — the address is ma.adel.810@gmail.com",
    problemLabel: "Problem",
    resultLabel: "Result",
    footer: "Built with Next.js & Tailwind · Deployed on Vercel",
    backHome: "Back to home",
    onThisPage: "On this page",
    previousProject: "Previous project",
    nextProject: "Next project",
    allProjects: "All projects",
    newTab: "(opens in a new tab)",
    caseStudySections: {
      overview: "Overview",
      problem: "Problem",
      built: "What I built",
      architecture: "Architecture",
      decisions: "Key decisions",
      links: "Links",
    },
    decisionWhy: "Why",
    decisionTradeoff: "Trade-off",
    notFoundTitle: "This page doesn't exist",
    notFoundBody: "The link may be broken, or the page may have moved. The home page has everything else.",
    educationTitle: "Education",
    languagesTitle: "Languages",
    architectureLabel: "Architecture",
    moreProjectsNote: "These are a selection. More projects, experiments and source code are on my GitHub.",
    moreProjectsCta: "See more on GitHub",
    showAll: (n) => `Show all ${n} achievements`,
    showLess: "Show fewer",
    scrollDiagram: "Scroll sideways to see the whole diagram",
  },
  about: {
    paragraphs: [
      "Backend-focused Software Engineer with 3 years of experience designing and building server-side systems in Node.js and TypeScript (NestJS, Express). Experienced in distributed microservices, event-driven messaging, REST API design, authentication and role-based access control, workflow orchestration, and integrating LLMs into production services, with close attention to reliability and data consistency.",
      "Works across MongoDB, PostgreSQL, and SQL Server, with full stack delivery in Angular, React, and Next.js. Has delivered enterprise platforms and client systems for companies across the Gulf and Egypt. Native Arabic speaker with professional English.",
    ],
    stats: ["3 yrs experience", "Node.js & TypeScript", "Arabic / English"],
  },
  experience: [
    {
      title: "Software Engineer",
      company: "Contellect Technologies Inc.",
      location: "Cairo, Egypt",
      dates: "Aug 2025 – Present",
      bullets: [
        "Develop and maintain a 50+ repository enterprise content management (ECM) platform of distributed Node.js/TypeScript microservices (NATS, ActiveMQ, KrakenD API gateway) with an Angular front end, designing and documenting REST APIs with OpenAPI.",
        "Re-architected the platform's AI chat assistant (Vercel AI SDK; Azure OpenAI, OpenAI, Anthropic Claude) from a single tool-loop agent capped by the 128-tool limit to a parent agent dispatching to domain-scoped sub-agents.",
        "Built AI usage auditing so administrators can track tokens, messages, and responses across all users, on top of the audit-log subsystem (MongoDB, Elasticsearch).",
        "Implemented Keycloak (OAuth 2.0 / OpenID Connect) authentication and role-based access control across services, consolidating per-service permission checks into a single policy layer.",
        "Delivered legal hold for a Records Management app: held records become read-only across services, controlled by a dedicated permission.",
        "Automated business processes with Camunda Zeebe (BPMN) and Temporal, including document approval and routing and an HR Onboarding & Offboarding app.",
        "Made a message consumer idempotent to eliminate duplicate records under concurrent publishes; fixed chunked-upload pause/resume so large files continue from the last uploaded chunk.",
        "Built Angular features (dynamic Form.io forms, dashboards, workflow interfaces) behind Unleash feature flags, covered by Jest and Supertest tests.",
        "Built an AI-assisted engineering workflow with Claude Code and MCP integrations (Jira, Bitbucket) that takes tickets through investigation, implementation, testing, and review to a pull request.",
      ],
      featured: [0, 1, 3, 6],
      tech: ["Node.js", "TypeScript", "NATS", "Keycloak", "Vercel AI SDK", "Camunda Zeebe", "Temporal", "Angular"],
    },
    {
      title: "Full Stack Developer",
      company: "Slash Solutions",
      location: "Remote",
      dates: "Feb 2024 – Jul 2025",
      bullets: [
        "Built backend services and REST APIs with Node.js and NestJS for booking, ERP, and internal business systems delivered to clients in Egypt and the Gulf.",
        "Integrated payment gateways (Moyasar, Tap, Stripe, PayPal, Paymob) into checkout and billing flows.",
        "Implemented JWT authentication and role-based access control for multi-role business users.",
        "Integrated third-party SMS, email, and maps APIs; built reporting with PDF and Excel exports.",
        "Designed data models across PostgreSQL, MySQL, SQL Server, and MongoDB; built React and Angular admin interfaces.",
      ],
      featured: [0, 1, 2, 4],
      tech: ["Node.js", "NestJS", "PostgreSQL", "MongoDB", "Stripe", "React", "Angular"],
    },
  ],
  highlights: {
    idempotent: {
      title: "Idempotent event consumer",
      problem: "Concurrent publishes created duplicate records.",
      result: "Made the consumer idempotent: no duplicates under concurrency.",
      diagramLabel: "Two identical events flow into the consumer; exactly one record comes out.",
    },
    agents: {
      title: "AI agent architecture",
      problem: "A single agent hit the 128-tool limit.",
      result: "A parent agent dispatches to domain-scoped sub-agents, so every platform tool stays reachable.",
      diagramLabel: "A parent agent node branching to four domain sub-agent nodes.",
    },
    tenants: {
      title: "Tenant isolation",
      problem: "Contora holds many organizations' data in one system.",
      result: "Cross-tenant isolation tests on every endpoint: one organization can never reach another's data.",
      diagramLabel: "Two tenant boxes separated by a wall.",
      badge: "tested on every endpoint",
    },
    grading: {
      title: "Secure grading",
      problem: "Testly's exam answers must stay secret.",
      result: "Server-side grading enforces time limits and never sends answers to the client.",
      diagramLabel: "Client and server exchange submissions; the answer key stays locked on the server.",
    },
  },
  projects: {
    saknly: {
      title: "Saknly",
      oneLiner: "Arabic-first property marketplace.",
      built: [
        "Accounts with email confirmation, Google sign-in, password reset, and token revocation on logout.",
        "Listing publishing with drafts and up to 8 photos.",
        "Admin moderation queue with bulk approve.",
        "Cascading cleanup on delete.",
        "URL-driven shareable search (sale/rent/student housing, location, price, area, rooms, amenities) with map view.",
        "Arabic Gemini chatbot answering about real listings and prices.",
      ],
      diagramAlt:
        "Saknly architecture: a Next.js client calls an Express 5 API, which uses MongoDB Atlas, Cloudinary for photos, Google Gemini for the chatbot and Google sign-in.",
    },
    "3mmile": {
      title: "3M Mile",
      oneLiner: "Car care & detailing platform.",
      built: [
        "Arabic (RTL) website with admin dashboard and CMS for a car-care business in Jeddah; the business manages service pages and media through the dashboard.",
      ],
      diagramAlt: "3M Mile architecture: a Next.js site and admin CMS backed by MongoDB, with media on Cloudinary.",
    },
    pionner: {
      title: "Pionner",
      oneLiner: "Bilingual e-commerce store for Saudi Arabia.",
      built: [
        "Arabic/English storefront with correct reading direction and SAR pricing.",
        "Catalogue, search suggestions, cart, wishlist, Stripe checkout.",
        "Secure accounts: email confirmation, password reset, refresh cookies, admin routes, validation, rate limiting.",
        "Coupons and order tracking.",
        "Admin dashboard with sales analytics.",
      ],
      diagramAlt:
        "Pionner architecture: a React SPA calls an Express API running as a Vercel serverless function, backed by MongoDB Atlas and an optional Redis cache, with Stripe checkout and webhooks, Cloudinary and Nodemailer.",
    },
    contora: {
      title: "Contora",
      oneLiner: "Multi-tenant document management system.",
      built: [
        "Drag-and-drop form builder for document types.",
        "Records with full version history (compare/restore), check-out, trash, folders.",
        "Arabic-aware full-text search.",
        "Per-folder and per-record access grants, expiring share links, rotating refresh tokens, append-only audit log.",
        "Cross-tenant isolation tests on every endpoint.",
        "AI assistant that proposes actions for user confirmation; AI metadata extraction from uploaded files.",
      ],
      diagramAlt:
        "Contora architecture: an Angular client behind nginx calls a NestJS API that stores tenant-scoped data in MongoDB, files in SHA-256 content-addressed storage, and optionally calls Azure OpenAI.",
    },
    testly: {
      title: "Testly",
      oneLiner: "Online exam platform.",
      built: [
        "Student/teacher/admin roles with email confirmation and admin approval for teachers.",
        "Timed multiple-choice exams.",
        "Server-side grading that never exposes answers.",
        "Per-role dashboards with caching and rate limiting.",
      ],
      diagramAlt: "Testly architecture: an Angular 19 client calls an Express 5 API that grades on the server, backed by MongoDB Atlas and Redis.",
    },
  },
  caseStudies: {
    saknly: {
      overview:
        "Saknly is an Arabic-first property marketplace for Egypt: listings for sale, for rent and student housing. Visitors search and browse; owners publish listings that an admin reviews before they go live.",
      problem:
        "A property marketplace has to be trustworthy and easy to search in Arabic: listings need review before they appear, searches need to be shareable, deleted listings must not leave orphaned photos or data behind, and visitors expect answers about real listings and prices.",
      architectureNote:
        "A Next.js 15 client talks to an Express 5 REST API deployed on Vercel. The API owns validation, authentication and moderation, stores data in MongoDB Atlas, re-encodes photos with sharp before storing them on Cloudinary, and calls Google Gemini for the chatbot.",
      decisions: [
        {
          title: "Search filters live in the URL",
          why: "Results can be shared as a link, and the browser's back button restores the previous search.",
          tradeoff: "Every filter change is a navigation, and every filter has to be parsed and validated from the query string.",
        },
        {
          title: "Listings go live only after admin approval",
          why: "Visitors only see reviewed listings, which keeps the marketplace trustworthy.",
          tradeoff: "Owners wait for review, and admins carry the load, which the bulk-approve action reduces.",
        },
        {
          title: "Deleting a listing cascades",
          why: "Its images, comments, inquiries and favourites are removed with it, so nothing is left orphaned.",
          tradeoff: "A delete becomes a multi-step operation across MongoDB and Cloudinary instead of a single write.",
        },
        {
          title: "The chatbot runs on the server, over real listings",
          why: "The Gemini key never reaches the browser, and answers are grounded in actual listings and prices.",
          tradeoff: "Each question costs a model call and adds latency to the answer.",
        },
      ],
    },
    pionner: {
      overview:
        "Pionner is a bilingual Arabic/English e-commerce store for Saudi Arabia, with a React storefront, an admin dashboard and an Express API.",
      problem:
        "Shoppers in Saudi Arabia expect a store that reads correctly in Arabic and English with SAR pricing, checkout that can be trusted, and accounts that stay secure — while the store itself should run without servers to manage.",
      architectureNote:
        "A React 18 single-page app (Vite, Zustand, i18next) calls an Express API that runs on Vercel as a single serverless function. MongoDB Atlas holds the data, Redis optionally caches featured products and categories, Stripe handles payments and reports completed sessions through a webhook, Cloudinary stores images and Nodemailer sends account emails.",
      decisions: [
        {
          title: "The whole API is one serverless function",
          why: "The Express app is exported and only listens outside Vercel, so it deploys with no servers to manage; the MongoDB connection is opened lazily and reused between invocations.",
          tradeoff: "Cold starts add latency to the first request, and connection reuse has to be handled explicitly.",
        },
        {
          title: "Stripe webhooks confirm payment",
          why: "Completed checkout sessions are reported by Stripe itself, not inferred from the browser redirect.",
          tradeoff: "The webhook endpoint has to be publicly reachable and needs its own signing secret.",
        },
        {
          title: "Redis is optional",
          why: "Featured products and categories can be cached, but the store runs fully without Redis.",
          tradeoff: "Cached data can be stale until it expires or is invalidated after admin edits.",
        },
        {
          title: "Short-lived access tokens with refresh cookies",
          why: "A stolen access token expires quickly, while users stay signed in through the refresh cookie.",
          tradeoff: "The client needs a refresh flow, and the server has to issue and verify two kinds of token.",
        },
      ],
    },
    contora: {
      overview:
        "Contora is a multi-tenant document management system: organizations define their own document types, store records with full version history, search them, and control exactly who can see what.",
      problem:
        "Many organizations share one system, so one organization must never reach another's data. Documents change over time, so every version must be kept and comparable. Access needs to be granted per folder and per record, and every action needs to leave a trace.",
      architectureNote:
        "An Angular client (standalone components, signals, zoneless) is served by nginx, which proxies /api to a NestJS API. The API validates input with zod, scopes every query to the caller's tenant, writes an append-only audit log, stores files by their SHA-256 hash, and optionally calls Azure OpenAI for the assistant and metadata extraction. It ships as Docker images.",
      decisions: [
        {
          title: "Tenant scoping in the data layer, tested on every endpoint",
          why: "Every query is scoped to the caller's tenant by a shared repository that also refuses any update that would change a record's tenant, and every endpoint has a cross-tenant test.",
          tradeoff: "Each new endpoint needs its own isolation test, so the test suite grows with the API.",
        },
        {
          title: "Files are content-addressed by SHA-256",
          why: "Identical uploads within a tenant are stored once, and a file's identity is its content.",
          tradeoff: "A file can only be removed once no version references it, which needs a sweep for unreferenced files.",
        },
        {
          title: "Versions are immutable",
          why: "Every change is kept, so any two versions can be compared and an old one restored.",
          tradeoff: "Storage grows with every version.",
        },
        {
          title: "The AI assistant proposes; the user confirms",
          why: "The assistant never changes data on its own: it proposes an action, and the user confirms it before anything runs.",
          tradeoff: "Every AI-driven change takes an extra step from the user.",
        },
      ],
    },
  },
  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "Go", "SQL"] },
    {
      group: "Backend",
      items: ["Node.js", "NestJS", "Express.js", "REST APIs", "GraphQL", "Microservices", "Event-Driven Architecture", "OpenAPI/Swagger", "Zod", "Joi"],
    },
    {
      group: "Frontend",
      items: ["Angular", "NgRx", "RxJS", "React", "Next.js", "Tailwind CSS", "MUI", "TanStack Query", "Zustand", "i18next", "Arabic RTL"],
    },
    { group: "Databases & Search", items: ["MongoDB", "PostgreSQL", "MySQL", "SQL Server", "Redis", "Elasticsearch"] },
    { group: "Messaging & Workflow", items: ["NATS", "ActiveMQ", "Temporal", "Camunda Zeebe (BPMN)"] },
    { group: "Security & Identity", items: ["Keycloak", "OAuth 2.0", "OpenID Connect", "JWT", "RBAC"] },
    {
      group: "AI",
      items: ["Vercel AI SDK", "Azure OpenAI", "OpenAI", "Anthropic Claude", "Google Gemini", "AI agents & tool calling", "Claude Code", "MCP"],
    },
    { group: "Payments & Integrations", items: ["Stripe", "Moyasar", "Tap", "PayPal", "Paymob", "Cloudinary"] },
    { group: "Cloud & DevOps", items: ["AWS", "Azure", "Vercel", "Docker", "Kubernetes", "CI/CD", "Nginx", "KrakenD"] },
    { group: "Testing & Observability", items: ["Jest", "Vitest", "Supertest", "Playwright", "Grafana", "OpenTelemetry"] },
  ],
  education: [
    { degree: "B.Sc. in Computer Science", school: "Zagazig University", dates: "2019 – 2023" },
    { degree: "MEARN Stack Diploma", school: "Information Technology Institute (ITI)", dates: "Mar 2025 – Aug 2025" },
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional working proficiency" },
  ],
  contact: {
    lead: "I'm open to backend and full stack roles in Cairo, the Gulf, or remote. The fastest way to reach me is email.",
  },
};

/* ------------------------------- Arabic -------------------------------- */

const ar: Content = {
  meta: {
    title: "محمود عادل عبد الوهاب — مهندس برمجيات (Full Stack)", // review-ar
    description:
      "مهندس برمجيات يركّز على الواجهات الخلفية، يبني أنظمة موزّعة وواجهات برمجية آمنة وميزات مدعومة بالذكاء الاصطناعي باستخدام Node.js وTypeScript. مقيم في القاهرة، مصر.", // review-ar
  },
  identity: {
    name: "محمود عادل عبد الوهاب", // review-ar
    title: "مهندس برمجيات (Full Stack)", // review-ar
    oneLiner:
      "مهندس يركّز على الواجهات الخلفية، يبني أنظمة موزّعة وواجهات برمجية آمنة وميزات مدعومة بالذكاء الاصطناعي باستخدام Node.js وTypeScript.", // review-ar
    location: "القاهرة، مصر", // review-ar
    availability: "متاح لفرص عمل جديدة", // review-ar
    photoAlt: "صورة شخصية لمحمود عادل عبد الوهاب", // review-ar
  },
  ui: {
    skipToContent: "انتقل إلى المحتوى", // review-ar
    nav: {
      about: "نبذة", // review-ar
      experience: "الخبرات", // review-ar
      highlights: "أبرز الإنجازات", // review-ar
      projects: "المشاريع", // review-ar
      skills: "المهارات", // review-ar
      contact: "التواصل", // review-ar
    },
    downloadCv: "تنزيل السيرة الذاتية", // review-ar
    emailMe: "راسلني", // review-ar
    menu: "فتح القائمة", // review-ar
    closeMenu: "إغلاق القائمة", // review-ar
    switchLanguage: "Read in English",
    languageShort: "EN",
    themeToggle: "تبديل مظهر الألوان", // review-ar
    themeLight: "التبديل إلى المظهر الفاتح", // review-ar
    themeDark: "التبديل إلى المظهر الداكن", // review-ar
    primaryNav: "أقسام الصفحة", // review-ar
    viewResume: "عرض السيرة الذاتية كاملة", // review-ar
    live: "الموقع", // review-ar
    code: "الكود", // review-ar
    apiDocs: "توثيق الـ API", // review-ar
    readCaseStudy: "اقرأ دراسة الحالة", // review-ar
    moreStack: (n) => `+${n}`,
    copyEmail: "نسخ البريد الإلكتروني", // review-ar
    copied: "تم نسخ البريد الإلكتروني", // review-ar
    copyFailed: "تعذّر النسخ — العنوان هو ma.adel.810@gmail.com", // review-ar
    problemLabel: "المشكلة", // review-ar
    resultLabel: "النتيجة", // review-ar
    footer: "بُني باستخدام Next.js وTailwind · منشور على Vercel", // review-ar
    backHome: "العودة إلى الصفحة الرئيسية", // review-ar
    onThisPage: "في هذه الصفحة", // review-ar
    previousProject: "المشروع السابق", // review-ar
    nextProject: "المشروع التالي", // review-ar
    allProjects: "كل المشاريع", // review-ar
    newTab: "(يفتح في تبويب جديد)", // review-ar
    caseStudySections: {
      overview: "نظرة عامة", // review-ar
      problem: "المشكلة", // review-ar
      built: "ما الذي بنيته", // review-ar
      architecture: "البنية المعمارية", // review-ar
      decisions: "قرارات أساسية", // review-ar
      links: "روابط", // review-ar
    },
    decisionWhy: "السبب", // review-ar
    decisionTradeoff: "المقابل", // review-ar
    notFoundTitle: "هذه الصفحة غير موجودة", // review-ar
    notFoundBody: "ربما يكون الرابط غير صحيح أو نُقلت الصفحة. تجد كل شيء آخر في الصفحة الرئيسية.", // review-ar
    educationTitle: "التعليم", // review-ar
    languagesTitle: "اللغات", // review-ar
    architectureLabel: "البنية المعمارية", // review-ar
    moreProjectsNote: "هذه مجموعة مختارة فقط. تجد مزيدًا من المشاريع والتجارب والكود المصدري على حسابي في GitHub.", // review-ar
    moreProjectsCta: "المزيد على GitHub", // review-ar
    showAll: (n) => `عرض كل الإنجازات (${n})`, // review-ar
    showLess: "عرض أقل", // review-ar
    scrollDiagram: "مرّر أفقيًا لرؤية المخطط كاملًا", // review-ar
  },
  about: {
    paragraphs: [
      "مهندس برمجيات يركّز على الواجهات الخلفية، بخبرة 3 سنوات في تصميم وبناء أنظمة الخوادم باستخدام Node.js وTypeScript (NestJS وExpress). لديّ خبرة في الخدمات المصغّرة الموزّعة، والمراسلة القائمة على الأحداث، وتصميم واجهات REST، والمصادقة والتحكم في الوصول حسب الأدوار، وتنسيق سير العمل، ودمج النماذج اللغوية الكبيرة في خدمات الإنتاج، مع اهتمام دقيق بالموثوقية واتساق البيانات.", // review-ar
      "أعمل مع MongoDB وPostgreSQL وSQL Server، وأسلّم منتجات متكاملة باستخدام Angular وReact وNext.js. قدّمت منصات مؤسسية وأنظمة لعملاء في الخليج ومصر. العربية لغتي الأم، وأجيد الإنجليزية على مستوى مهني.", // review-ar
    ],
    stats: ["خبرة 3 سنوات", "Node.js & TypeScript", "العربية / الإنجليزية"], // review-ar
  },
  experience: [
    {
      title: "مهندس برمجيات", // review-ar
      company: "Contellect Technologies Inc.",
      location: "القاهرة، مصر", // review-ar
      dates: "أغسطس 2025 – حتى الآن", // review-ar
      bullets: [
        "أطوّر وأصون منصة مؤسسية لإدارة المحتوى (ECM) تضم أكثر من 50 مستودعًا من الخدمات المصغّرة الموزّعة المبنية بـ Node.js وTypeScript (NATS وActiveMQ وبوابة KrakenD)، بواجهة أمامية Angular، مع تصميم واجهات REST وتوثيقها بـ OpenAPI.", // review-ar
        "أعدت تصميم مساعد المحادثة الذكي في المنصة (Vercel AI SDK؛ Azure OpenAI وOpenAI وAnthropic Claude) من وكيل واحد يعمل بحلقة أدوات ومقيّد بحد 128 أداة، إلى وكيل رئيسي يوزّع المهام على وكلاء فرعيين لكل مجال.", // review-ar
        "بنيت نظام تدقيق لاستخدام الذكاء الاصطناعي يتيح للمسؤولين تتبّع الرموز (tokens) والرسائل والردود لجميع المستخدمين، فوق نظام سجلّ التدقيق (MongoDB وElasticsearch).", // review-ar
        "طبّقت المصادقة عبر Keycloak (OAuth 2.0 / OpenID Connect) والتحكم في الوصول حسب الأدوار عبر الخدمات، وجمعت فحوصات الصلاحيات المتفرقة في كل خدمة في طبقة سياسات واحدة.", // review-ar
        "سلّمت ميزة الحجز القانوني (legal hold) لتطبيق إدارة السجلات: تصبح السجلات المحجوزة للقراءة فقط عبر جميع الخدمات، ويُتحكّم فيها بصلاحية مخصّصة.", // review-ar
        "أتمتُّ عمليات الأعمال باستخدام Camunda Zeebe (BPMN) وTemporal، بما في ذلك اعتماد المستندات وتوجيهها، وتطبيق لتعيين الموظفين وإنهاء خدمتهم.", // review-ar
        "جعلت أحد مستهلكي الرسائل متساوي الأثر (idempotent) للقضاء على السجلات المكررة عند النشر المتزامن، وأصلحت إيقاف الرفع المجزّأ واستئنافه بحيث تُكمل الملفات الكبيرة من آخر جزء مرفوع.", // review-ar
        "بنيت ميزات Angular (نماذج Form.io ديناميكية ولوحات معلومات وواجهات سير عمل) خلف أعلام ميزات Unleash، مغطّاة باختبارات Jest وSupertest.", // review-ar
        "بنيت سير عمل هندسي بمساعدة الذكاء الاصطناعي باستخدام Claude Code وتكاملات MCP (Jira وBitbucket) يأخذ التذاكر عبر التحقيق والتنفيذ والاختبار والمراجعة حتى طلب الدمج.", // review-ar
      ],
      featured: [0, 1, 3, 6],
      tech: ["Node.js", "TypeScript", "NATS", "Keycloak", "Vercel AI SDK", "Camunda Zeebe", "Temporal", "Angular"],
    },
    {
      title: "مطوّر Full Stack", // review-ar
      company: "Slash Solutions",
      location: "عن بُعد", // review-ar
      dates: "فبراير 2024 – يوليو 2025", // review-ar
      bullets: [
        "بنيت خدمات خلفية وواجهات REST باستخدام Node.js وNestJS لأنظمة حجوزات وتخطيط موارد المؤسسات (ERP) وأنظمة أعمال داخلية لعملاء في مصر والخليج.", // review-ar
        "دمجت بوابات الدفع (Moyasar وTap وStripe وPayPal وPaymob) في مسارات الشراء والفوترة.", // review-ar
        "طبّقت المصادقة بـ JWT والتحكم في الوصول حسب الأدوار لمستخدمي أعمال بأدوار متعددة.", // review-ar
        "دمجت واجهات خارجية للرسائل النصية والبريد الإلكتروني والخرائط، وبنيت تقارير قابلة للتصدير بصيغتي PDF وExcel.", // review-ar
        "صمّمت نماذج بيانات عبر PostgreSQL وMySQL وSQL Server وMongoDB، وبنيت واجهات إدارة بـ React وAngular.", // review-ar
      ],
      featured: [0, 1, 2, 4],
      tech: ["Node.js", "NestJS", "PostgreSQL", "MongoDB", "Stripe", "React", "Angular"],
    },
  ],
  highlights: {
    idempotent: {
      title: "مستهلك أحداث متساوي الأثر", // review-ar
      problem: "كان النشر المتزامن يُنشئ سجلات مكررة.", // review-ar
      result: "أصبح المستهلك متساوي الأثر: لا تكرار حتى مع التزامن.", // review-ar
      diagramLabel: "حدثان متطابقان يدخلان إلى المستهلك، ويخرج سجل واحد فقط.", // review-ar
    },
    agents: {
      title: "بنية وكلاء الذكاء الاصطناعي", // review-ar
      problem: "وصل وكيل واحد إلى حد 128 أداة.", // review-ar
      result: "وكيل رئيسي يوزّع المهام على وكلاء فرعيين لكل مجال، فتبقى كل أدوات المنصة متاحة.", // review-ar
      diagramLabel: "عقدة وكيل رئيسي تتفرّع إلى أربع عقد لوكلاء فرعيين.", // review-ar
    },
    tenants: {
      title: "عزل المستأجرين", // review-ar
      problem: "يحتفظ Contora ببيانات مؤسسات عديدة في نظام واحد.", // review-ar
      result: "اختبارات عزل بين المستأجرين على كل نقطة نهاية: لا تصل مؤسسة أبدًا إلى بيانات مؤسسة أخرى.", // review-ar
      diagramLabel: "صندوقان لمستأجرين يفصل بينهما جدار.", // review-ar
      badge: "مُختبَر على كل نقطة نهاية", // review-ar
    },
    grading: {
      title: "تصحيح آمن", // review-ar
      problem: "يجب أن تبقى إجابات اختبارات Testly سرّية.", // review-ar
      result: "التصحيح على الخادم يفرض المهلة الزمنية ولا يرسل الإجابات إلى المتصفح أبدًا.", // review-ar
      diagramLabel: "يتبادل المتصفح والخادم الإجابات المُرسَلة، ويبقى مفتاح الحل مقفلًا على الخادم.", // review-ar
    },
  },
  projects: {
    saknly: {
      title: "سكنلي (Saknly)", // review-ar
      oneLiner: "منصة عقارات عربية أولًا.", // review-ar
      built: [
        "حسابات مع تأكيد البريد الإلكتروني وتسجيل الدخول بـ Google واستعادة كلمة المرور وإلغاء الرموز عند تسجيل الخروج.", // review-ar
        "نشر الإعلانات مع المسودّات وما يصل إلى 8 صور.", // review-ar
        "قائمة مراجعة للمسؤولين مع اعتماد جماعي.", // review-ar
        "تنظيف متسلسل للبيانات المرتبطة عند الحذف.", // review-ar
        "بحث قابل للمشاركة عبر الرابط (بيع/إيجار/سكن طلاب، الموقع، السعر، المساحة، الغرف، المرافق) مع عرض على الخريطة.", // review-ar
        "روبوت محادثة عربي مبني على Gemini يجيب عن الإعلانات والأسعار الفعلية.", // review-ar
      ],
      diagramAlt:
        "بنية سكنلي: واجهة Next.js تتصل بواجهة Express 5 التي تستخدم MongoDB Atlas وCloudinary للصور وGoogle Gemini لروبوت المحادثة وتسجيل الدخول بـ Google.", // review-ar
    },
    "3mmile": {
      title: "3M Mile",
      oneLiner: "منصة للعناية بالسيارات وتلميعها.", // review-ar
      built: [
        "موقع عربي (من اليمين إلى اليسار) مع لوحة تحكم ونظام إدارة محتوى لنشاط عناية بالسيارات في جدة؛ يدير النشاط صفحات الخدمات والوسائط من لوحة التحكم.", // review-ar
      ],
      diagramAlt: "بنية 3M Mile: موقع Next.js مع نظام إدارة محتوى، مدعوم بـ MongoDB، والوسائط على Cloudinary.", // review-ar
    },
    pionner: {
      title: "Pionner",
      oneLiner: "متجر إلكتروني ثنائي اللغة للسعودية.", // review-ar
      built: [
        "واجهة متجر بالعربية والإنجليزية باتجاه قراءة صحيح وأسعار بالريال السعودي.", // review-ar
        "كتالوج واقتراحات بحث وسلة مشتريات وقائمة أمنيات ودفع عبر Stripe.", // review-ar
        "حسابات آمنة: تأكيد البريد الإلكتروني واستعادة كلمة المرور وملفات تعريف ارتباط للتحديث ومسارات للمسؤولين والتحقق من المدخلات وتحديد معدل الطلبات.", // review-ar
        "قسائم خصم وتتبّع للطلبات.", // review-ar
        "لوحة تحكم للمسؤولين مع تحليلات المبيعات.", // review-ar
      ],
      diagramAlt:
        "بنية Pionner: تطبيق React أحادي الصفحة يتصل بواجهة Express تعمل كدالة خادم مصغّرة على Vercel، مدعومة بـ MongoDB Atlas وذاكرة Redis اختيارية، مع الدفع وwebhooks عبر Stripe وCloudinary وNodemailer.", // review-ar
    },
    contora: {
      title: "Contora",
      oneLiner: "نظام لإدارة المستندات متعدد المستأجرين.", // review-ar
      built: [
        "منشئ نماذج بالسحب والإفلات لأنواع المستندات.", // review-ar
        "سجلات بتاريخ إصدارات كامل (مقارنة واستعادة)، وحجز للتعديل، وسلة محذوفات، ومجلدات.", // review-ar
        "بحث نصي كامل يراعي خصائص اللغة العربية.", // review-ar
        "صلاحيات وصول لكل مجلد ولكل سجل، وروابط مشاركة تنتهي صلاحيتها، ورموز تحديث دوّارة، وسجل تدقيق للإضافة فقط.", // review-ar
        "اختبارات عزل بين المستأجرين على كل نقطة نهاية.", // review-ar
        "مساعد ذكاء اصطناعي يقترح إجراءات ينتظر تأكيد المستخدم عليها، واستخراج البيانات الوصفية من الملفات المرفوعة بالذكاء الاصطناعي.", // review-ar
      ],
      diagramAlt:
        "بنية Contora: واجهة Angular خلف nginx تتصل بواجهة NestJS تخزّن بيانات كل مستأجر في MongoDB والملفات في تخزين معنون بتجزئة SHA-256، وتستدعي Azure OpenAI اختياريًا.", // review-ar
    },
    testly: {
      title: "Testly",
      oneLiner: "منصة اختبارات إلكترونية.", // review-ar
      built: [
        "أدوار للطالب والمعلّم والمسؤول مع تأكيد البريد الإلكتروني واعتماد المسؤول للمعلّمين.", // review-ar
        "اختبارات اختيار من متعدد بوقت محدد.", // review-ar
        "تصحيح على الخادم لا يكشف الإجابات أبدًا.", // review-ar
        "لوحات معلومات لكل دور مع تخزين مؤقت وتحديد لمعدل الطلبات.", // review-ar
      ],
      diagramAlt: "بنية Testly: واجهة Angular 19 تتصل بواجهة Express 5 تصحّح الإجابات على الخادم، مدعومة بـ MongoDB Atlas وRedis.", // review-ar
    },
  },
  caseStudies: {
    saknly: {
      overview:
        "سكنلي منصة عقارات عربية أولًا في مصر: إعلانات للبيع والإيجار وسكن الطلاب. يبحث الزوّار ويتصفّحون، وينشر الملّاك إعلاناتهم التي يراجعها مسؤول قبل ظهورها.", // review-ar
      problem:
        "على منصة العقارات أن تكون موثوقة وسهلة البحث بالعربية: يجب مراجعة الإعلانات قبل ظهورها، وأن تكون نتائج البحث قابلة للمشاركة، وألا يترك حذف الإعلان صورًا أو بيانات يتيمة، ويتوقّع الزوّار إجابات عن إعلانات وأسعار حقيقية.", // review-ar
      architectureNote:
        "واجهة Next.js 15 تتصل بواجهة Express 5 REST منشورة على Vercel. تتولّى الواجهة الخلفية التحقق من المدخلات والمصادقة ومراجعة الإعلانات، وتخزّن البيانات في MongoDB Atlas، وتعيد ترميز الصور بـ sharp قبل حفظها على Cloudinary، وتستدعي Google Gemini لروبوت المحادثة.", // review-ar
      decisions: [
        {
          title: "فلاتر البحث جزء من الرابط", // review-ar
          why: "يمكن مشاركة النتائج كرابط، ويعيد زر الرجوع في المتصفح البحث السابق.", // review-ar
          tradeoff: "كل تغيير في الفلاتر يعني انتقالًا جديدًا، ويجب قراءة كل فلتر من الرابط والتحقق منه.", // review-ar
        },
        {
          title: "لا يظهر الإعلان إلا بعد اعتماد المسؤول", // review-ar
          why: "لا يرى الزوّار إلا إعلانات تمت مراجعتها، مما يحافظ على موثوقية المنصة.", // review-ar
          tradeoff: "ينتظر الملّاك المراجعة، ويتحمّل المسؤولون العبء، وهو ما يخففه الاعتماد الجماعي.", // review-ar
        },
        {
          title: "حذف الإعلان يحذف ما يرتبط به", // review-ar
          why: "تُحذف صوره وتعليقاته واستفساراته ومرات تفضيله معه، فلا يبقى شيء يتيم.", // review-ar
          tradeoff: "يصبح الحذف عملية متعددة الخطوات عبر MongoDB وCloudinary بدلًا من عملية كتابة واحدة.", // review-ar
        },
        {
          title: "روبوت المحادثة يعمل على الخادم فوق إعلانات حقيقية", // review-ar
          why: "لا يصل مفتاح Gemini إلى المتصفح أبدًا، وتستند الإجابات إلى إعلانات وأسعار فعلية.", // review-ar
          tradeoff: "كل سؤال يكلّف استدعاءً للنموذج ويضيف زمنًا إلى الإجابة.", // review-ar
        },
      ],
    },
    pionner: {
      overview:
        "Pionner متجر إلكتروني ثنائي اللغة (عربي/إنجليزي) للسعودية، يضم واجهة متجر مبنية بـ React ولوحة تحكم للمسؤولين وواجهة خلفية مبنية بـ Express.", // review-ar
      problem:
        "يتوقّع المتسوّقون في السعودية متجرًا يُقرأ بشكل صحيح بالعربية والإنجليزية بأسعار بالريال، ودفعًا موثوقًا، وحسابات آمنة — مع تشغيل المتجر دون خوادم تحتاج إلى إدارة.", // review-ar
      architectureNote:
        "تطبيق React 18 أحادي الصفحة (Vite وZustand وi18next) يتصل بواجهة Express تعمل على Vercel كدالة خادم مصغّرة واحدة. تحفظ MongoDB Atlas البيانات، وتخزّن Redis اختياريًا المنتجات والفئات المميزة مؤقتًا، ويتولّى Stripe المدفوعات ويُبلغ عن الجلسات المكتملة عبر webhook، وتحفظ Cloudinary الصور، ويرسل Nodemailer رسائل الحسابات.", // review-ar
      decisions: [
        {
          title: "الواجهة الخلفية كلها دالة خادم مصغّرة واحدة", // review-ar
          why: "يُصدَّر تطبيق Express ولا يستمع إلا خارج Vercel، فيُنشر دون خوادم لإدارتها؛ ويُفتح اتصال MongoDB عند الحاجة ويُعاد استخدامه بين الاستدعاءات.", // review-ar
          tradeoff: "يضيف التشغيل البارد زمنًا إلى الطلب الأول، ويجب التعامل مع إعادة استخدام الاتصال صراحةً.", // review-ar
        },
        {
          title: "تأكيد الدفع عبر webhooks من Stripe", // review-ar
          why: "يُبلغ Stripe بنفسه عن جلسات الدفع المكتملة، بدلًا من استنتاجها من إعادة توجيه المتصفح.", // review-ar
          tradeoff: "يجب أن تكون نقطة الـ webhook متاحة للعامة وأن يكون لها مفتاح توقيع خاص.", // review-ar
        },
        {
          title: "Redis اختيارية", // review-ar
          why: "يمكن تخزين المنتجات والفئات المميزة مؤقتًا، لكن المتجر يعمل بالكامل دون Redis.", // review-ar
          tradeoff: "قد تكون البيانات المخزّنة مؤقتًا قديمة حتى تنتهي صلاحيتها أو تُبطَل بعد تعديلات المسؤول.", // review-ar
        },
        {
          title: "رموز وصول قصيرة العمر مع ملفات تعريف ارتباط للتحديث", // review-ar
          why: "تنتهي صلاحية رمز الوصول المسروق سريعًا، بينما يبقى المستخدم مسجّل الدخول عبر ملف تعريف ارتباط التحديث.", // review-ar
          tradeoff: "تحتاج الواجهة إلى مسار للتحديث، ويجب على الخادم إصدار نوعين من الرموز والتحقق منهما.", // review-ar
        },
      ],
    },
    contora: {
      overview:
        "Contora نظام لإدارة المستندات متعدد المستأجرين: تعرّف كل مؤسسة أنواع مستنداتها، وتحفظ السجلات بتاريخ إصدارات كامل، وتبحث فيها، وتتحكّم بدقة في من يرى ماذا.", // review-ar
      problem:
        "تتشارك مؤسسات عديدة نظامًا واحدًا، فلا يجوز أبدًا أن تصل مؤسسة إلى بيانات أخرى. وتتغيّر المستندات بمرور الوقت، فيجب حفظ كل إصدار وإتاحة مقارنته. ويجب منح الوصول لكل مجلد ولكل سجل، وأن يترك كل إجراء أثرًا.", // review-ar
      architectureNote:
        "واجهة Angular (مكوّنات مستقلة وsignals ودون zone.js) يقدّمها nginx الذي يمرّر /api إلى واجهة NestJS. تتحقق الواجهة الخلفية من المدخلات بـ zod، وتقصر كل استعلام على مستأجر المستخدم، وتكتب سجل تدقيق للإضافة فقط، وتحفظ الملفات بتجزئة SHA-256 لمحتواها، وتستدعي Azure OpenAI اختياريًا للمساعد واستخراج البيانات الوصفية. وتُشحن كصور Docker.", // review-ar
      decisions: [
        {
          title: "عزل المستأجرين في طبقة البيانات، مع اختبار على كل نقطة نهاية", // review-ar
          why: "يقصر مستودع مشترك كل استعلام على مستأجر المستخدم، ويرفض أي تحديث يغيّر مستأجر السجل، ولكل نقطة نهاية اختبار عزل بين المستأجرين.", // review-ar
          tradeoff: "تحتاج كل نقطة نهاية جديدة إلى اختبار عزل خاص بها، فتكبر مجموعة الاختبارات مع الواجهة.", // review-ar
        },
        {
          title: "الملفات معنونة بتجزئة SHA-256", // review-ar
          why: "تُحفظ الملفات المتطابقة داخل المستأجر مرة واحدة، وهوية الملف هي محتواه.", // review-ar
          tradeoff: "لا يُحذف الملف إلا عندما لا يشير إليه أي إصدار، وهذا يتطلّب عملية دورية لإزالة الملفات غير المرتبطة.", // review-ar
        },
        {
          title: "الإصدارات غير قابلة للتعديل", // review-ar
          why: "يُحفظ كل تغيير، فيمكن مقارنة أي إصدارين واستعادة إصدار قديم.", // review-ar
          tradeoff: "تزداد مساحة التخزين مع كل إصدار.", // review-ar
        },
        {
          title: "المساعد الذكي يقترح، والمستخدم يؤكّد", // review-ar
          why: "لا يغيّر المساعد البيانات بنفسه أبدًا: يقترح إجراءً، ويؤكّده المستخدم قبل تنفيذ أي شيء.", // review-ar
          tradeoff: "كل تغيير يقوده الذكاء الاصطناعي يتطلّب خطوة إضافية من المستخدم.", // review-ar
        },
      ],
    },
  },
  skills: [
    { group: "لغات البرمجة", items: ["TypeScript", "JavaScript", "Python", "Go", "SQL"] }, // review-ar
    {
      group: "الواجهات الخلفية", // review-ar
      items: ["Node.js", "NestJS", "Express.js", "REST APIs", "GraphQL", "Microservices", "Event-Driven Architecture", "OpenAPI/Swagger", "Zod", "Joi"],
    },
    {
      group: "الواجهات الأمامية", // review-ar
      items: ["Angular", "NgRx", "RxJS", "React", "Next.js", "Tailwind CSS", "MUI", "TanStack Query", "Zustand", "i18next", "Arabic RTL"],
    },
    { group: "قواعد البيانات والبحث", items: ["MongoDB", "PostgreSQL", "MySQL", "SQL Server", "Redis", "Elasticsearch"] }, // review-ar
    { group: "المراسلة وسير العمل", items: ["NATS", "ActiveMQ", "Temporal", "Camunda Zeebe (BPMN)"] }, // review-ar
    { group: "الأمان والهوية", items: ["Keycloak", "OAuth 2.0", "OpenID Connect", "JWT", "RBAC"] }, // review-ar
    {
      group: "الذكاء الاصطناعي", // review-ar
      items: ["Vercel AI SDK", "Azure OpenAI", "OpenAI", "Anthropic Claude", "Google Gemini", "AI agents & tool calling", "Claude Code", "MCP"],
    },
    { group: "المدفوعات والتكاملات", items: ["Stripe", "Moyasar", "Tap", "PayPal", "Paymob", "Cloudinary"] }, // review-ar
    { group: "السحابة وDevOps", items: ["AWS", "Azure", "Vercel", "Docker", "Kubernetes", "CI/CD", "Nginx", "KrakenD"] }, // review-ar
    { group: "الاختبارات والمراقبة", items: ["Jest", "Vitest", "Supertest", "Playwright", "Grafana", "OpenTelemetry"] }, // review-ar
  ],
  education: [
    { degree: "بكالوريوس علوم الحاسب", school: "جامعة الزقازيق", dates: "2019 – 2023" }, // review-ar
    { degree: "دبلومة MEARN Stack", school: "معهد تكنولوجيا المعلومات (ITI)", dates: "مارس 2025 – أغسطس 2025" }, // review-ar
  ],
  languages: [
    { name: "العربية", level: "اللغة الأم" }, // review-ar
    { name: "الإنجليزية", level: "كفاءة مهنية في العمل" }, // review-ar
  ],
  contact: {
    lead: "أبحث عن أدوار في الواجهات الخلفية أو Full Stack في القاهرة أو الخليج أو عن بُعد. أسرع طريقة للتواصل معي هي البريد الإلكتروني.", // review-ar
  },
};

export const profile: Record<Locale, Content> = { en, ar };

export function getContent(locale: Locale): Content {
  return profile[locale];
}

export function getProjectMeta(slug: ProjectSlug): ProjectMeta {
  const meta = projectsMeta.find((p) => p.slug === slug);
  if (!meta) throw new Error(`Unknown project: ${slug}`);
  return meta;
}

export function isCaseStudySlug(value: string): value is CaseStudySlug {
  return (caseStudySlugs as string[]).includes(value);
}
