import { Category, Product, BlogPost, Subdomain, Coupon, ServiceItem, MediaAsset } from "./types";

export const initialSubdomains: Subdomain[] = [
  {
    id: "store",
    subdomain: "store.soulverseapps.com",
    name: "Soulverse App Store & Marketplace",
    description: "The central hub to discover premium apps, UI Kits, and AI tools.",
    status: "active",
    type: "service"
  },
  {
    id: "sehrlive",
    subdomain: "sehrlive.soulverseapps.com",
    name: "Sehr Live",
    description: "Our premier livestreaming platform for events, music, and interactive shows.",
    status: "active",
    type: "app"
  },
  {
    id: "dramaverse",
    subdomain: "dramaverse.soulverseapps.com",
    name: "Dramaverse",
    description: "Immersive narrative gaming, episodic stories, and world-class mobile dramas.",
    status: "active",
    type: "app"
  },
  {
    id: "cardverse",
    subdomain: "cardverse.soulverseapps.com",
    name: "Cardverse",
    description: "Professional digital business cards, interactive greetings, and networking.",
    status: "active",
    type: "app"
  },
  {
    id: "soulstudio",
    subdomain: "soulstudio.soulverseapps.com",
    name: "Soul Studio",
    description: "Stunning generative design suite for creators, designers, and animators.",
    status: "active",
    type: "app"
  },
  {
    id: "postgen",
    subdomain: "postgen.soulverseapps.com",
    name: "PostGen AI",
    description: "Convert ideas to viral social content instantly with advanced LLMs.",
    status: "active",
    type: "app"
  },
  {
    id: "quran",
    subdomain: "quran.soulverseapps.com",
    name: "Soul Quran AI",
    description: "A state-of-the-art Quran companion with linguistic analyses, search, and voice coaching.",
    status: "active",
    type: "app"
  },
  {
    id: "developer",
    subdomain: "developer.soulverseapps.com",
    name: "Developer Hub",
    description: "Deploy apps, submit scripts, read API references, and check webhooks.",
    status: "active",
    type: "service"
  },
  {
    id: "docs",
    subdomain: "docs.soulverseapps.com",
    name: "Technical Documentation",
    description: "Step-by-step installation guides, API endpoints, and integration tools.",
    status: "active",
    type: "docs"
  },
  {
    id: "support",
    subdomain: "support.soulverseapps.com",
    name: "Soulverse Help & Support Center",
    description: "Submit tickets, check status, and get instant answers 24/7.",
    status: "active",
    type: "service"
  },
  {
    id: "admin",
    subdomain: "admin.soulverseapps.com",
    name: "Master Admin Operations",
    description: "Manage global sales, audit products, approve sellers, and configure gateway payouts.",
    status: "active",
    type: "service"
  },
  {
    id: "api",
    subdomain: "api.soulverseapps.com",
    name: "Central Gateway API",
    description: "Microservices backend proxying licensing, auth, and billing endpoints.",
    status: "active",
    type: "service"
  },
  {
    id: "cdn",
    subdomain: "cdn.soulverseapps.com",
    name: "Global Edge CDN Assets",
    description: "Fast loading asset distributor serving screenshots, source code, and binaries.",
    status: "active",
    type: "utility"
  },
  {
    id: "blog",
    subdomain: "blog.soulverseapps.com",
    name: "Soulverse Tech & Creative Blog",
    description: "Stay updated with tutorials, system announcements, and developer stories.",
    status: "active",
    type: "docs"
  }
];

export const initialProducts: Product[] = [
  {
    id: "soulverse-core",
    name: "Soulverse Portal",
    tagline: "The Next-Gen Spiritual & Spatial Social Universe",
    category: Category.Apps,
    subcategory: "Social & Connection",
    description: "Connect deeply in an immersive, values-driven 3D social workspace. Share audio spaces, spiritual journals, and co-create digital worlds.",
    longDescription: "Soulverse Portal is our upcoming central digital social ecosystem. Designed from the ground up to foster deep human connections, it combines spatial soundscapes, private spiritual journaling networks, and cooperative generative design spaces. Break free from superficial feeds and discover a community designed for mindful presence.",
    features: [
      "Spatial 3D Audio Spaces & Quiet Zones",
      "End-to-End Encrypted Spiritual Journaling Networks",
      "Dynamic Mind-map Visualizations & Co-creation Boards",
      "Full Integration with Soul Studio design assets"
    ],
    version: "v1.0.0 (Beta)",
    developer: "Soulverse Team",
    price: 0.00,
    rating: 5.0,
    reviewsCount: 0,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=500&auto=format&fit=crop&q=60"
    ],
    downloadCount: 0,
    tags: ["social", "spiritual", "metaverse", "spatial audio", "mindfulness"],
    isComingSoon: true,
    isFeatured: true,
    isCompanyApp: true,
    fileSize: "75.4 MB",
    compatibility: ["Android", "iOS", "Web"]
  },
  {
    id: "pardais-live",
    name: "Pardais Live",
    tagline: "Bridging Expats with Home via Low-Latency Live streams",
    category: Category.Apps,
    subcategory: "Social & Media",
    description: "An exclusive, high-performance community livestreaming space designed to connect Pakistani and global expats with family and live shows.",
    longDescription: "Pardais Live is our premier community broadcast platform tailored for the global diaspora. It offers high-fidelity, ultra-low latency audio and video streams tailored specifically to run beautifully on standard mobile data connections worldwide, ensuring you never miss a family gathering, community show, or regional news.",
    features: [
      "Optimized Live Streams for Low-Bandwidth Networks",
      "Private Interactive Family Viewing Rooms (up to 12 guests)",
      "High-Fidelity Stereo Audio Recitations & Cultural Broadcasts",
      "EasyPaisa, JazzCash, and Global Card payment integration"
    ],
    version: "v0.9.0 (Pre-Alpha)",
    developer: "Soulverse Team",
    price: 0.00,
    rating: 5.0,
    reviewsCount: 0,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=600&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60"
    ],
    downloadCount: 0,
    tags: ["expats", "live video", "pakistan diaspora", "low-latency", "streams"],
    isComingSoon: true,
    isTrending: true,
    isCompanyApp: true,
    fileSize: "35.2 MB",
    compatibility: ["Android", "iOS", "Web"]
  },
  {
    id: "future-ai-products",
    name: "Future AI suite",
    tagline: "Autonomous Agentic Systems for Creators",
    category: Category.Apps,
    subcategory: "Artificial Intelligence",
    description: "An adaptive collection of autonomous AI agents specialized in web compilation, dynamic video generation, and localized language models.",
    longDescription: "Our upcoming Future AI suite is an advanced system of specialized agentic tools. By wrapping modern large language models with native device tools, it handles advanced workflows like auto-generating multi-platform landing pages, localized video translations with lip-sync, and automated administrative operations.",
    features: [
      "Multi-Agent Web Compilation & Hot-Deploys",
      "Localized Neural Audio & Lip-Synced Video Translators",
      "Offline AI models running on high-end mobile devices",
      "Custom Enterprise Workflow Builder & Automations"
    ],
    version: "v1.0.0 (Concept)",
    developer: "Soulverse Team",
    price: 0.00,
    rating: 5.0,
    reviewsCount: 0,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60"
    ],
    downloadCount: 0,
    tags: ["artificial intelligence", "autonomous agents", "compilation", "neural text"],
    isComingSoon: true,
    isLatest: true,
    isCompanyApp: true,
    fileSize: "120.0 MB",
    compatibility: ["Android", "iOS", "Web", "Windows", "Mac"]
  },
  {
    id: "sehr-live",
    name: "Sehr Live Pro",
    tagline: "The Future of Mobile Live Streaming & Broadcasts",
    category: Category.Apps,
    subcategory: "Livestreaming & Media",
    description: "Go live in high-definition 4K, host multi-guest panels, record premium broadcasts, and monetize using integrated wallet tipping.",
    longDescription: "Sehr Live Pro is our flagship live media broadcasting app. Designed for creators, journalists, and event hosts, it provides latency-free RTMP streaming directly from Android and iOS. Built with state-of-the-art WebRTC and low-bitrate optimization to function flawlessly even under volatile cellular connections.",
    features: [
      "Ultra High-Definition 4K Broadcast Capabilities",
      "Interactive Multi-Guest Stage Setup (up to 6 concurrent streams)",
      "Real-time Tipping, Virtual Gifting & Monetization Engine",
      "Native RTMP/RTMPS Stream Ingest and Re-distribution",
      "Dynamic Noise Cancellation & Custom AI Video Filters"
    ],
    version: "v3.8.4",
    developer: "Soulverse Team",
    price: 49.99,
    discountPrice: 29.99,
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=600&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=500&auto=format&fit=crop&q=60"
    ],
    downloadCount: 12400,
    tags: ["livestream", "broadcast", "multimedia", "hd video", "mobile streaming"],
    isFeatured: true,
    isTrending: true,
    isCompanyApp: true,
    subdomain: "sehrlive",
    fileSize: "42.8 MB",
    compatibility: ["Android", "iOS", "Web"]
  },
  {
    id: "dramaverse",
    name: "Dramaverse Premium",
    tagline: "Immersive Episodic Dramas & Interactive Stories",
    category: Category.Apps,
    subcategory: "Entertainment & Gaming",
    description: "Unlock premium interactive episodes, custom visual novels, and short-form video dramas with personalized AI paths.",
    longDescription: "Dramaverse is a revolutionary interactive media portal that bridges cinematic video, gaming, and episodic series. Control the narrative, choose your characters' actions, and enjoy custom generated story arcs with stunning voice acting.",
    features: [
      "No Ads, High-Fidelity Streaming & Off-line Downloading",
      "Premium Interactive Choice Pathways & Dialog Multi-tracks",
      "Daily Story Drops & Premium Studio Exclusives",
      "Surround Sound 5.1 & Dolby Atmos Integration"
    ],
    version: "v2.1.0",
    developer: "Soulverse Team",
    price: 19.99,
    discountPrice: 9.99,
    rating: 4.7,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60"
    ],
    downloadCount: 8900,
    tags: ["drama", "interactive", "story", "streaming", "episodes"],
    isTrending: true,
    isCompanyApp: true,
    subdomain: "dramaverse",
    fileSize: "68.5 MB",
    compatibility: ["Android", "iOS", "Web"]
  },
  {
    id: "cardverse",
    name: "Cardverse Studio",
    tagline: "Smart NFC Digital Cards & Networking Suite",
    category: Category.Apps,
    subcategory: "Business & Networking",
    description: "Design premium contactless business cards, configure NFC tags, manage enterprise contacts, and export analytics with QR codes.",
    longDescription: "Cardverse Studio is the professional standard for smart-tag networking. Instantly share contact details, portfolio links, social profiles, and customized lead generation forms via a single tap or dynamic QR code. Track who scans your cards with geographic-based analytics.",
    features: [
      "NFC Tag Encoding & Writing Studio",
      "Dynamic Live-Updated QR Code Generation",
      "Enterprise Lead Capturing Form Integration",
      "Integrated Scanner with Offline OCR Support",
      "Visitor Geolocation Analytics & Device Breakdowns"
    ],
    version: "v4.2.1",
    developer: "Soulverse Team",
    price: 14.99,
    discountPrice: 14.99,
    rating: 4.9,
    reviewsCount: 206,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=60"
    ],
    downloadCount: 15300,
    tags: ["business cards", "nfc", "networking", "analytics", "b2b"],
    isFeatured: true,
    isCompanyApp: true,
    subdomain: "cardverse",
    fileSize: "18.2 MB",
    compatibility: ["Android", "iOS", "Web"]
  },
  {
    id: "soul-studio",
    name: "Soul Studio Suite",
    tagline: "AI Generative Vector Design & Animations",
    category: Category.Apps,
    subcategory: "Creativity & Graphics",
    description: "Generate bespoke modern vector graphics, SVGs, Lottie interactive animations, and responsive canvas layouts with AI.",
    longDescription: "Soul Studio Suite changes the creator workspace forever. Use natural language commands to compose production-grade vector designs, export directly into clean SVG or React component code, or generate interactive web motion assets without leaving the canvas.",
    features: [
      "Text-to-Vector Generative Engine (SVGs, Icons)",
      "Interactive Web Motion Timeline & Keyframe Animator",
      "Export to pure React, Tailwind, Flutter, or SVG code",
      "Team Real-time Collaboration Canvas"
    ],
    version: "v1.10.5",
    developer: "Soulverse Team",
    price: 59.99,
    discountPrice: 39.99,
    rating: 4.6,
    reviewsCount: 75,
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=600&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60"
    ],
    downloadCount: 6200,
    tags: ["design", "generative ai", "animations", "lottie", "svg editor"],
    isLatest: true,
    isCompanyApp: true,
    subdomain: "soulstudio",
    fileSize: "112.4 MB",
    compatibility: ["Web", "Mac", "Windows"]
  },
  {
    id: "postgen-ai",
    name: "PostGen AI Editor",
    tagline: "Viral AI Copywriting & Social Publisher",
    category: Category.Apps,
    subcategory: "Marketing & AI",
    description: "Write high-converting multi-platform social media campaigns, generate eye-catching graphics, and schedule automatic publishing.",
    longDescription: "PostGen AI is the ultimate marketing agency in your pocket. It analyzes real-time trending viral patterns on Twitter/X, LinkedIn, Instagram, and TikTok to compose hyper-contextual hooks, formatted body drafts, relevant hashtags, and image mockups in seconds.",
    features: [
      "Multi-Platform Unified Scheduling Dashboard",
      "Trending Topic Detection and Context Injection",
      "AI Hook Improver & Tone Adapters",
      "Analytics reporting on post performance"
    ],
    version: "v2.5.0",
    developer: "Soulverse Team",
    price: 24.99,
    discountPrice: 19.99,
    rating: 4.7,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=600&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60"
    ],
    downloadCount: 11200,
    tags: ["marketing", "social media", "copywriting", "ai tool", "scheduler"],
    isTrending: true,
    isCompanyApp: true,
    subdomain: "postgen",
    fileSize: "28.9 MB",
    compatibility: ["Android", "iOS", "Web"]
  },
  {
    id: "soul-quran-ai",
    name: "Soul Quran AI",
    tagline: "The Smart AI Quran Companion & Pronunciation Coach",
    category: Category.Apps,
    subcategory: "Education & Spirituality",
    description: "Interactive Quran learning with real-time AI speech/tajweed evaluation, root word linguistic analyses, and deep semantic search.",
    longDescription: "Soul Quran AI is designed for state-of-the-art interactive spiritual and linguistic study. It features high-accuracy real-time speech assessment to evaluate tajweed and pronunciation, word-by-word morphological translation, and multi-translation comparisons.",
    features: [
      "Real-time Audio Evaluation for Tajweed and Pronunciation",
      "Deep Root Word Morphological & Grammatical Explanations",
      "Advanced Semantics Search (e.g. search by thematic concepts)",
      "High Fidelity Audio recitations by world-renowned Qaris",
      "Personalized daily lessons and progress reports"
    ],
    version: "v1.2.0",
    developer: "Soulverse Team",
    price: 9.99,
    discountPrice: 0.00, // FREE or $0.00 base, with VIP features
    rating: 4.95,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60"
    ],
    downloadCount: 28400,
    tags: ["quran", "religion", "education", "spiritual", "pronunciation coach"],
    isFeatured: true,
    isLatest: true,
    isCompanyApp: true,
    subdomain: "quran",
    fileSize: "55.0 MB",
    compatibility: ["Android", "iOS", "Web"]
  },
  {
    id: "premium-saas-template",
    name: "Aether SaaS Next.js Template",
    tagline: "Production-ready Dark SaaS Template with Tailwind & Stripe",
    category: Category.Templates,
    subcategory: "React/Next.js Templates",
    description: "Beautiful clean, modern Dark Mode landing page, billing portals, MDX blogs, and pre-built auth pages compiled in Next.js 14.",
    features: [
      "Fully Responsive Tailwind CSS & Shadcn/ui elements",
      "Integrated Stripe Subscriptions Checkout Flow",
      "Pre-configured Firebase Authentication setup",
      "Highly Optimized Lighthouse Scores (100% Core Web Vitals)"
    ],
    version: "v1.0.3",
    developer: "Aether Designs",
    price: 59.00,
    discountPrice: 45.00,
    rating: 4.9,
    reviewsCount: 34,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    screenshots: [],
    downloadCount: 450,
    tags: ["nextjs", "template", "saas", "landing page", "dark mode"],
    isTrending: true
  },
  {
    id: "gemini-developer-prompt-pack",
    name: "Gemini Ultimate Prompt Toolkit",
    tagline: "350+ Production-Tested Prompts for Advanced System Architects",
    category: Category.Prompts,
    subcategory: "Gemini Prompts",
    description: "Unleash the full potential of Gemini 1.5 Pro and Flash with robust, structured prompts for multi-agent workflows, code reviews, and databases.",
    features: [
      "System Prompt Configurations for enterprise agents",
      "Code Refactoring, Debugging and Test Generator prompts",
      "Database Schema Design, migrations and SQL query builders",
      "Includes JSON, XML, and structural markdown output constraints"
    ],
    version: "v2.0.1",
    developer: "AI Catalyst",
    price: 19.00,
    discountPrice: 12.00,
    rating: 4.85,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80",
    screenshots: [],
    downloadCount: 1100,
    tags: ["gemini", "prompts", "prompt engineering", "developer helper", "llm"],
    isFeatured: true
  },
  {
    id: "crypto-wallet-ui-kit",
    name: "Decentra Web3 UI Kit",
    tagline: "Stunning Dark Cyber Wallet & DeFi Dashboard UI Kit",
    category: Category.UIKits,
    subcategory: "Figma UI Kits",
    description: "Over 220 responsive, pixel-perfect, auto-layout Figma frames and interactive components representing complex Web3 transactions.",
    features: [
      "Complete Auto-Layout 4.0 Components and Token Libraries",
      "Charts, Asset Breakdowns, Wallet Connect and Swaps UI",
      "Light, Dark and Cyber Neon styling theme options",
      "Fully vector-scalable elements with customized SVG icons"
    ],
    version: "v1.2.0",
    developer: "PixelCrafters",
    price: 35.00,
    discountPrice: 25.00,
    rating: 4.65,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&auto=format&fit=crop&q=80",
    screenshots: [],
    downloadCount: 320,
    tags: ["ui kit", "figma", "web3", "crypto", "defi", "dashboard"],
    isLatest: true
  },
  {
    id: "flutter-ecommerce-source",
    name: "Multi-Vendor Marketplace Flutter App",
    tagline: "Full App Source Code with Firebase & Stripe Checkout",
    category: Category.SourceCode,
    subcategory: "Flutter Projects",
    description: "Deploy a high-fidelity, production-ready multi-vendor Android & iOS shopping platform. Contains complete admin panels and seller clients.",
    features: [
      "Clean architecture (BLoC Pattern) in Flutter 3.19+",
      "Direct Firestore Database schemas & Firebase Auth",
      "Native push-notifications with cloud functions",
      "Apple Pay, Google Pay, and Stripe multi-gateway"
    ],
    version: "v4.0.0",
    developer: "CodersLab",
    price: 149.00,
    discountPrice: 99.00,
    rating: 4.91,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80",
    screenshots: [],
    downloadCount: 880,
    tags: ["flutter", "source code", "ecommerce", "ios app", "android app"],
    isFeatured: true,
    isTrending: true
  },
  {
    id: "cur-prompts",
    name: "Cursor Master Rules & Context Prompts",
    tagline: "AI Instructions for Pristine Full-Stack Generation",
    category: Category.Prompts,
    subcategory: "Cursor Prompts",
    description: "Pre-configured .cursorrules files and prompt packages specifically optimized to write production-grade Next.js, Django, and Flutter code without hallucinations.",
    features: [
      "Saves context space by targeting rules only to relevant file pathways",
      "Strict type enforcement guidelines and lint preventions",
      "Perfect state hook management constraints",
      "Includes architectural layouts for server and edge actions"
    ],
    version: "v1.1.0",
    developer: "Sudo AI",
    price: 15.00,
    discountPrice: 8.99,
    rating: 4.75,
    reviewsCount: 195,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    screenshots: [],
    downloadCount: 1900,
    tags: ["cursor", "ide rules", "prompt pack", "clean code", "productivity"]
  },
  {
    id: "soul-vip-membership",
    name: "Soulverse Elite Access Subscription",
    tagline: "Ultimate Passport to All Apps, Prompts & Templates",
    category: Category.PremiumMemberships,
    subcategory: "Subscriptions",
    description: "Get unrestricted downloads of all our current and future premium products, exclusive server configurations, priority support tickets, and private masterclasses.",
    features: [
      "Unlimited Downloads on all $1,500+ worth of catalog",
      "Unlocks all Pro features on Sehr Live, Dramaverse & Cardverse",
      "Direct Discord developer priority voice support channels",
      "Full Commercial Resell rights for website templates"
    ],
    version: "Monthly/Yearly",
    developer: "Soulverse Apps",
    price: 29.99,
    discountPrice: 19.99,
    rating: 5.0,
    reviewsCount: 540,
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&auto=format&fit=crop&q=80",
    screenshots: [],
    downloadCount: 4200,
    tags: ["membership", "vip pass", "unlimited downloads", "subscription"],
    isFeatured: true
  }
];

export const initialBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "How We Optimized Sehr Live to HD 4K Streaming on 3G Connections",
    excerpt: "Behind the engineering of low-latency WebRTC streams, custom frame dropping, and server-side RTMP codecs.",
    content: "Live streaming in modern ecosystems demands high fidelity. However, cellular networks are notoriously unstable. To build Sehr Live, our engineering team designed an adaptive video encoding scheme. Using a modified WebRTC stack, the app monitors active Round-Trip Time (RTT) and packet loss. If bandwidth throttles below 1.5Mbps, we dynamically downsample chrominance vectors while preserving structural luminance, maintaining visual quality and preventing buffer stalls completely.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=600&auto=format&fit=crop&q=80",
    author: "Zain Khan (Lead Architect)",
    date: "July 10, 2026",
    readTime: "6 min read",
    tags: ["Engineering", "WebRTC", "Livestreaming", "Sehr Live"]
  },
  {
    id: "blog-2",
    title: "AI & Spirituality: Inside the Speech Engine of Soul Quran AI",
    excerpt: "How we leveraged deep phonetic models to evaluate Tajweed recitation accuracy in real-time.",
    content: "Evaluating classical Arabic pronunciation requires precision. Traditional Automatic Speech Recognition (ASR) struggles with liturgical rules. In Soul Quran AI, we deployed a custom acoustic model trained specifically on canonical recitations. By aligning audio inputs with phonetic phonetic tokens (Makharij), the app detects micro-deviations in elongation, nasalization, and vowel positioning, providing gentle visual corrections to the learner.",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&auto=format&fit=crop&q=80",
    author: "Dr. Amna Rashid (AI Research)",
    date: "June 28, 2026",
    readTime: "8 min read",
    tags: ["Machine Learning", "Audio AI", "Education", "Quran Study"]
  },
  {
    id: "blog-3",
    title: "The Power of Contactless Networking: Why Cardverse is Replacing Paper Cards",
    excerpt: "Explore the security, analytics, and environmental impacts of NFC smart business ecosystem.",
    content: "Paper business cards are a 15th-century relic. Up to 88% of printed cards are discarded within a week. Cardverse replaces this inefficiency with zero-energy NFC chips linked to live micro-portfolios. Whenever a contact taps your Cardverse tag, you instantly capture their leads and share your customized portfolio, backed by beautiful geographical metrics showing your outreach impact.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    author: "Farhan Ali (Product Lead)",
    date: "June 15, 2026",
    readTime: "5 min read",
    tags: ["NFC", "Business Development", "Cardverse", "Sustainability"]
  }
];

export const initialFAQs = [
  {
    question: "What is Soulverse Apps Ecosystem?",
    answer: "Soulverse Apps is a premium digital marketplace and app repository. We produce specialized native apps (like Sehr Live, Dramaverse, Cardverse) and support a global marketplace where creators can sell top-tier AI Prompts, UI Kits, Flutter/React source codes, and developer packages."
  },
  {
    question: "How do I download or purchase a product?",
    answer: "Browse our marketplace, add items to your wallet/cart, and complete your checkout via Google Play Billing, Stripe, PayPal, Visa, Bank Transfer, or Pakistani payment providers like EasyPaisa and JazzCash. Downloads are immediately available in your User Dashboard under 'Downloads'."
  },
  {
    question: "How does the Subdomain Architecture work?",
    answer: "Each of our core services and apps has its own dedicated microdomain (e.g., store.soulverseapps.com, developer.soulverseapps.com, sehrlive.soulverseapps.com). You can switch between these services using our global Navigation Subdomain Swapper to experience their unique landing pages and interactive widgets."
  },
  {
    question: "Can I become a seller on the platform?",
    answer: "Yes! While Soulverse Apps remains the central trusted company brand, we have built a Future-Ready Seller Registration system. Register as a developer or designer via the 'Seller Hub' to upload your products, track analytics, and request cash withdrawals."
  },
  {
    question: "Do you offer a premium membership subscription?",
    answer: "Yes, our 'Soulverse Elite Access Subscription' offers unlimited downloads of all catalog assets (worth over $1,500), unlocks all Pro features on Sehr Live, Dramaverse, and Cardverse, and grants priority 24/7 technical ticket support."
  }
];

export const initialCoupons: Coupon[] = [
  { code: "SOULFIRST", discountPercent: 20, expiryDate: "2026-12-31", isActive: true },
  { code: "EID2026", discountPercent: 30, expiryDate: "2026-08-30", isActive: true },
  { code: "AIWORLD", discountPercent: 15, expiryDate: "2026-10-15", isActive: true }
];

export const mockReviews = [
  { id: "rev-1", user: "Adeel Ahmad", rating: 5, comment: "Sehr Live is incredibly fast! Best stream quality I have seen on a mobile device.", date: "2026-07-11" },
  { id: "rev-2", user: "Michael S.", rating: 4.8, comment: "The Gemini prompts from AI Catalyst completely automated my daily code refactoring workflow. Worth every penny.", date: "2026-07-08" },
  { id: "rev-3", user: "Zoya Fatima", rating: 5, comment: "Soul Quran AI speech evaluation is flawless. Highly recommend it for children and adults looking to perfect their Tajweed.", date: "2026-07-02" }
];

export const initialServices: ServiceItem[] = [
  {
    id: "web-dev",
    name: "Website Development & Next.js Deployment",
    icon: "Layout",
    banner: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Highly optimized, lightning fast, premium dark/light mode SaaS landing pages and custom admin panel consoles. Styled with Tailwind CSS and fully SEO-optimized with headless CMS integrations.",
    features: [
      "Beautiful typography pairings and negative space margins",
      "Complete responsive breakdown grids for mobile and tablet",
      "Stripe payment gateway and custom licensing integrations",
      "Lighthouse scores averaging 98%+ on all key core vitals"
    ],
    price: 499.00,
    discountPrice: 349.00,
    showOrderButton: true,
    showWhatsAppButton: true,
    showInquiryForm: true,
    isEnabled: true
  },
  {
    id: "flutter-dev",
    name: "Flutter Cross-Platform Mobile Development",
    icon: "Smartphone",
    banner: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Build stunning, native Android & iOS applications using a unified Flutter codebase. Engineered with clean BLoC patterns, local caching databases, and high-performance offline synchronizations.",
    features: [
      "High-accuracy layout matching pixel-perfect designs",
      "Firebase Auth, Firestore, and Push Notifications integrated",
      "Multi-language support and app-store publishing guidelines",
      "Robust state management with seamless local persistence"
    ],
    price: 899.00,
    discountPrice: 699.00,
    showOrderButton: true,
    showWhatsAppButton: true,
    showInquiryForm: true,
    isEnabled: true
  },
  {
    id: "ai-automation",
    name: "AI Prompt Engineering & Custom LLM Chatbots",
    icon: "Cpu",
    banner: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Automate company customer service desks, generate viral social templates, or perform dynamic structural dataset transformations using Gemini, GPT-4, or Claude agents.",
    features: [
      "Pre-configured context system files preventing hallucinations",
      "Interactive playgrounds with real-time text/image response",
      "API connectors feeding custom databases into model engines",
      "Retrieval Augmented Generation (RAG) for corporate wikis"
    ],
    price: 399.00,
    discountPrice: 249.00,
    showOrderButton: true,
    showWhatsAppButton: true,
    showInquiryForm: true,
    isEnabled: true
  },
  {
    id: "graphics-design",
    name: "Premium UI/UX, Vector Logos & Animations",
    icon: "Palette",
    banner: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541462608141-2ff01dd914c0?w=600&auto=format&fit=crop&q=80"
    ],
    description: "Bespoke UI layouts, interactive high-fidelity web prototypes, specialized Figma style token sets, and highly compressed vector assets ready for developers.",
    features: [
      "Figma workspace source files with unified layouts",
      "Fully customized SVG vectors and Lottie code animations",
      "Dynamic color schemes optimized for dark/light variations",
      "Unlimited feedback iterations on premium package choices"
    ],
    price: 199.00,
    discountPrice: 149.00,
    showOrderButton: true,
    showWhatsAppButton: true,
    showInquiryForm: true,
    isEnabled: true
  }
];

export const initialMediaLibrary: MediaAsset[] = [
  {
    id: "media-1",
    name: "sehr_live_hero_banner.jpg",
    type: "Image",
    url: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?w=1600",
    size: "1.2 MB",
    date: "2026-07-01"
  },
  {
    id: "media-2",
    name: "cardverse_nfc_illustration.png",
    type: "Image",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200",
    size: "820 KB",
    date: "2026-07-03"
  },
  {
    id: "media-3",
    name: "quran_audio_recitation_sample.mp3",
    type: "Document",
    url: "https://example.com/assets/audio/sample_recitation.mp3",
    size: "4.5 MB",
    date: "2026-07-05"
  },
  {
    id: "media-4",
    name: "dramaverse_trailer_clip.mp4",
    type: "Video",
    url: "https://example.com/assets/video/promo_dramaverse.mp4",
    size: "18.2 MB",
    date: "2026-07-08"
  },
  {
    id: "media-5",
    name: "sehr_live_v3.8.4_official.apk",
    type: "APK",
    url: "https://example.com/downloads/apk/sehrlive-3.8.4.apk",
    size: "42.8 MB",
    date: "2026-07-10"
  },
  {
    id: "media-6",
    name: "soulverse_corporate_identity.pdf",
    type: "PDF",
    url: "https://example.com/docs/corporate_brand_identity.pdf",
    size: "2.1 MB",
    date: "2026-07-11"
  },
  {
    id: "media-7",
    name: "flutter_marketplace_source_v4.zip",
    type: "ZIP",
    url: "https://example.com/assets/source/flutter-marketplace-v4.zip",
    size: "95.4 MB",
    date: "2026-07-12"
  }
];
