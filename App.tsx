import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Bell, 
  User, 
  Plus, 
  Compass, 
  Settings, 
  ShieldAlert, 
  Check, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  Menu, 
  X, 
  ArrowUpRight, 
  DollarSign, 
  Globe, 
  Star, 
  FileText, 
  Gift, 
  Sparkles, 
  Send, Mail, 
  Eye, 
  ShieldCheck, 
  ArrowRight, 
  UserCheck, 
  AlertCircle, 
  RefreshCw,
  Wallet,
  Coins,
  History,
  TrendingUp,
  Download,
  CheckCircle,
  ThumbsUp,
  Share2,
  Code,
  Smartphone,
  Cpu,
  Palette,
  Trash2,
  Edit3,
  EyeOff,
  Play,
  FileCode,
  Folder,
  File,
  Terminal
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Category, Product, Review, SupportTicket, Coupon, BlogPost, Subdomain, User as UserType, Order, CartItem, ServiceItem, MediaAsset } from "./types";
import { initialProducts, initialSubdomains, initialBlogs, initialFAQs, mockReviews, initialServices, initialMediaLibrary, initialCoupons } from "./mockData";
import SubdomainsHub from "./components/SubdomainsHub";
import CheckoutGateway from "./components/CheckoutGateway";
import soulverseLogo from "./assets/images/soulverse_logo_1784031710519.jpg";
import { db } from "./db";

export function getEcosystemDomain() {
  const host = window.location.hostname;
  if (host.includes("localhost") || host.includes("run.app") || host.includes("pages.dev")) {
    return "soulverseapps.com"; // default fallback or local testing
  }
  const parts = host.split(".");
  if (parts.length >= 2) {
    return parts.slice(-2).join(".");
  }
  return "soulverseapps.com";
}

export function getSubdomainFromHostname() {
  const host = window.location.hostname;
  
  if (host.includes("localhost") || host.includes("run.app") || host.includes("pages.dev")) {
    const params = new URLSearchParams(window.location.search);
    const subParam = params.get("subdomain") || params.get("sub");
    if (subParam) return subParam.toLowerCase();
    
    const parts = host.split(".");
    if (parts.length > 1 && parts[0] !== "www" && parts[0] !== "localhost" && !parts[1].includes("run") && !parts[1].includes("pages")) {
      return parts[0].toLowerCase();
    }
    return "store";
  }
  
  const parts = host.split(".");
  if (parts.length > 2) {
    const sub = parts[0].toLowerCase();
    if (sub !== "www") {
      return sub;
    }
  }
  return "store";
}

export default function App() {
  // Global App States initialized from localStorage or initial lists
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingLog, setLoadingLog] = useState("Initializing Soulverse Cloud Ingress Network...");
  const [simulatedError, setSimulatedError] = useState<"404" | "500" | null>(null);
  const [activeSubdomain, setActiveSubdomain] = useState<Subdomain>(() => {
    const subId = getSubdomainFromHostname();
    const match = initialSubdomains.find(s => s.id === subId);
    return match || initialSubdomains[0];
  });
  const [products, setProducts] = useState<Product[]>(() => db.getProducts(initialProducts));
  const [blogs, setBlogs] = useState<BlogPost[]>(() => db.getBlogs(initialBlogs));
  const [coupons, setCoupons] = useState<Coupon[]>(() => db.getCoupons(initialCoupons));
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => db.getTickets([
    {
      id: "TCK-881",
      userEmail: "soulversepk@gmail.com",
      subject: "Sehr Live stream latency issues",
      category: "technical",
      message: "I am experiencing about 1.5s latency when testing ingestion via OBS Studio to the RTMP node.",
      status: "in-progress",
      date: "2026-07-12",
      replies: [
        { sender: "admin", message: "Aoa Sarmad! Please verify if you have B-frames set to 0 in OBS. Low latency WebRTC works best without pre-buffered B-frames.", date: "2026-07-12" }
      ]
    }
  ]));
  const [services, setServices] = useState<ServiceItem[]>(() => db.getServices(initialServices));
  const [mediaLibrary, setMediaLibrary] = useState<MediaAsset[]>(() => db.getMedia(initialMediaLibrary));
  const [whatsAppConfig, setWhatsAppConfig] = useState(() => {
    const cached = localStorage.getItem("sv_whatsapp");
    return cached ? JSON.parse(cached) : {
      channelLink: "https://whatsapp.com/channel/0029Va8x",
      isChannelEnabled: true,
      chatLink: "923001234567",
      isChatEnabled: true,
      chatMessage: "Hello Soulverse Support! I am checking your app store and need some assistance with my account."
    };
  });
  const [homepageSections, setHomepageSections] = useState(() => {
    const cached = localStorage.getItem("sv_homepage_sections");
    return cached ? JSON.parse(cached) : [
      { id: "hero", name: "Hero Banner", title: "Unleash the Next Generation of Creative Software & Assets", subtitle: "The unified hub for premium utility tools, AI models, high-performance livestreaming, and professional source-code templates.", isVisible: true, bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80" },
      { id: "featured-apps", name: "Featured Apps", title: "Flagship Platform Applications", subtitle: "Explore native Soulverse app nodes live in our ecosystem.", isVisible: true },
      { id: "featured-services", name: "Featured Services", title: "Bespoke Technical & Creative Services", subtitle: "Deploy customized cloud software, Flutter configurations, or database rules managed by our master panel.", isVisible: true },
      { id: "latest-apps", name: "Latest Apps", title: "New Platform Launches", subtitle: "Fresh releases recently compiled and deployed to the central gateway.", isVisible: true },
      { id: "popular-products", name: "Popular Products", title: "Highly Downloaded Digital Assets", subtitle: "Verified UI templates, prompts, and packages preferred by the community.", isVisible: true },
      { id: "reviews", name: "Customer Reviews", title: "Ecosystem Feedback", subtitle: "Real testimonials from designers, developers, and stream hosts.", isVisible: true },
      { id: "faqs", name: "Frequently Asked Questions", title: "Ecosystem FAQ", subtitle: "Quick answers about license terms, subdomains, and custom payouts.", isVisible: true },
      { id: "footer", name: "Footer Details", title: "© 2026 Soulverse Apps (soulverseapps.com). All Rights Reserved.", isVisible: true }
    ];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  
  // Interactive Overlays
  const [showDevPanel, setShowDevPanel] = useState(false);
  const isProductionMode = import.meta.env.PROD && !window.location.hostname.includes("localhost") && !window.location.hostname.includes("run.app");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showCartPopover, setShowCartPopover] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [showWhatsAppDropdown, setShowWhatsAppDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Custom authentication states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("sv_is_logged_in") === "true";
  });
  const [authMode, setAuthMode] = useState<"login" | "signup" | "verifying" | "google-loading">("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authAgree, setAuthAgree] = useState(false);
  
  // Secondary Dashboard Routing (When subdomains are on store.soulverseapps.com)
  const [storeTab, setStoreTab] = useState<"marketplace" | "profile" | "seller-hub" | "services" | "pricing" | "contact">("marketplace");
  const [adminTab, setAdminTab] = useState<"dashboard" | "apps" | "services" | "pricing" | "whatsapp" | "media" | "coupons" | "tickets">("dashboard");

  // User Authentication & Profile (Mock persistent states)
  const [user, setUser] = useState<UserType>(() => {
    const cached = localStorage.getItem("sv_user");
    if (cached) return JSON.parse(cached);
    return {
      id: "usr-01",
      name: "Sarmad Rizwan",
      email: "soulversepk@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      walletBalance: 350.00,
      role: "Super Admin", // Default to Super Admin to unlock full controls immediately
      isPremium: true,
      referralCode: "SOUL99K",
      referralsCount: 14,
      earnings: 45.00,
      wishlist: ["sehr-live", "soul-quran-ai"],
      orders: [
        {
          id: "SV-482012",
          date: "2026-07-01",
          products: [
            { id: "postgen-ai", name: "PostGen AI Editor", price: 19.99, category: "Marketing & AI" }
          ],
          total: 19.99,
          paymentMethod: "easypaisa",
          status: "completed",
          invoiceNumber: "INV-2026-8840"
        }
      ]
    };
  });

  // Persists
  useEffect(() => { db.saveProducts(products); }, [products]);
  useEffect(() => { db.saveBlogs(blogs); }, [blogs]);
  useEffect(() => { db.saveCoupons(coupons); }, [coupons]);
  useEffect(() => { db.saveTickets(supportTickets); }, [supportTickets]);
  useEffect(() => { db.saveServices(services); }, [services]);
  useEffect(() => { db.saveMedia(mediaLibrary); }, [mediaLibrary]);
  useEffect(() => { localStorage.setItem("sv_whatsapp", JSON.stringify(whatsAppConfig)); }, [whatsAppConfig]);
  useEffect(() => { localStorage.setItem("sv_homepage_sections", JSON.stringify(homepageSections)); }, [homepageSections]);
  useEffect(() => { db.saveUser(user); }, [user]);

  // Initial loading timer & deep routing URL parser
  useEffect(() => {
    // 1. Initial bootloader simulation progress interval
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 1;
      if (progress >= 100) {
        clearInterval(progressInterval);
        setIsInitialLoading(false);
      } else {
        setLoadingProgress(progress);
        
        // Dynamic simulated logs based on progress ranges
        if (progress < 20) {
          setLoadingLog("Initializing Soulverse Cloud Ingress Network...");
        } else if (progress < 40) {
          setLoadingLog("Sourcing Edge CDN Cache & Mirror Registries...");
        } else if (progress < 60) {
          setLoadingLog("Resolving SSL Credentials & Gateway Protocols...");
        } else if (progress < 80) {
          setLoadingLog("Verifying Digital Asset Integrity & Signatures...");
        } else {
          setLoadingLog("Launching Soulverse Core App Store Hub...");
        }
      }
    }, 18); // Smooth 1.8 seconds loading screen

    // 2. Query parameters deep linking parser
    try {
      const params = new URLSearchParams(window.location.search);
      
      // Sync subdomain
      const subParam = params.get("subdomain") || params.get("sub");
      if (subParam) {
        const matchSub = initialSubdomains.find(s => 
          s.id === subParam.toLowerCase() || 
          s.subdomain.split(".")[0] === subParam.toLowerCase()
        );
        if (matchSub) {
          setActiveSubdomain(matchSub);
        } else if (subParam.toLowerCase() === "404") {
          setSimulatedError("404");
        } else if (subParam.toLowerCase() === "500") {
          setSimulatedError("500");
        }
      }

      // Sync active tab
      const tabParam = params.get("tab");
      if (tabParam) {
        const validTabs = ["marketplace", "profile", "seller-hub", "services", "pricing", "contact"];
        if (validTabs.includes(tabParam.toLowerCase())) {
          setStoreTab(tabParam.toLowerCase() as any);
        }
      }

      // Sync product / details popover on load
      const appParam = params.get("product") || params.get("app") || params.get("id");
      if (appParam) {
        // Since products might load initially from initialProducts or state, find in initial list
        const matchProd = initialProducts.find(p => 
          p.id === appParam.toLowerCase() || 
          p.name.toLowerCase().replace(/\s+/g, "-") === appParam.toLowerCase()
        );
        if (matchProd) {
          setSelectedProduct(matchProd);
        }
      }
    } catch (err) {
      console.warn("Deep linking parser failed to parse parameters: ", err);
    }

    return () => clearInterval(progressInterval);
  }, []);

  // Cart & Wishlist System
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<{ id: string; title: string; message: string; date: string; isRead: boolean }[]>([
    { id: "n-1", title: "Welcome to Soulverse pk!", message: "Your unified digital marketplace account is now active.", date: "Just now", isRead: false },
    { id: "n-2", title: "New Release: Soul Quran AI", message: "Try the state-of-the-art tajweed coach with real-time speech model.", date: "1 hour ago", isRead: true }
  ]);

  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [ticketCategory, setTicketCategory] = useState<"technical" | "billing" | "seller" | "other">("technical");

  // Dynamic Seller Queue (Pending items uploaded by user or sellers)
  const [sellerUploads, setSellerUploads] = useState<Product[]>([]);
  const [newProdName, setNewProdName] = useState("");
  const [newProdTagline, setNewProdTagline] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdCategory, setNewProdCategory] = useState<Category>(Category.Apps);
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdFeatures, setNewProdFeatures] = useState("");

  // Auto notification system
  const triggerNotification = (title: string, message: string) => {
    setNotifications(prev => [
      { id: String(Date.now()), title, message, date: "Just now", isRead: false },
      ...prev
    ]);
  };

  // Switch subdomain helper - also updates visual aesthetics
  const handleSubdomainChange = (sub: Subdomain) => {
    const isProd = import.meta.env.PROD && !window.location.hostname.includes("localhost") && !window.location.hostname.includes("run.app");
    if (isProd) {
      const ecoDomain = getEcosystemDomain();
      const targetSub = sub.id === "store" ? "" : sub.id + ".";
      window.location.href = `https://${targetSub}${ecoDomain}`;
    } else {
      setActiveSubdomain(sub);
      setSearchQuery("");
      // Close overlay drawers
      setSelectedProduct(null);
      setShowCartPopover(false);
      setShowNotificationCenter(false);
    }
  };

  // Add Item to Shopping Cart
  const addToCart = (product: Product) => {
    // Check if product is already in cart
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(prev => prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart(prev => [...prev, { product, quantity: 1 }]);
    }
    triggerNotification("Cart Updated", `${product.name} has been added to your shopping cart.`);
  };

  // Remove Item from Cart
  const removeFromCart = (pId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== pId));
  };

  // Toggle Wishlist Item
  const toggleWishlist = (productId: string) => {
    const inWishlist = user.wishlist.includes(productId);
    let updated: string[];
    if (inWishlist) {
      updated = user.wishlist.filter(id => id !== productId);
      triggerNotification("Removed Wishlist", "Item removed from your personal wish collection.");
    } else {
      updated = [...user.wishlist, productId];
      triggerNotification("Added to Wishlist", "Saved item to your personal wishlist.");
    }
    setUser(prev => ({ ...prev, wishlist: updated }));
  };

  // Handle successful gateway authorization checkout callback
  const handlePaymentSuccess = (paymentMethod: string, total: number) => {
    // 1. Process Order receipt
    const newOrderProducts = cart.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.discountPrice !== undefined ? item.product.discountPrice : item.product.price,
      category: item.product.subcategory
    }));

    const newOrder: Order = {
      id: "SV-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString().split('T')[0],
      products: newOrderProducts,
      total,
      paymentMethod,
      status: "completed",
      invoiceNumber: "INV-2026-" + Math.floor(1000 + Math.random() * 9000)
    };

    // 2. Adjust balance if paid from wallet
    let finalWalletBalance = user.walletBalance;
    if (paymentMethod === "wallet") {
      finalWalletBalance = user.walletBalance - total;
    }

    // 3. Update Product download count states
    const purchasedIds = cart.map(item => item.product.id);
    setProducts(prev => prev.map(p => {
      if (purchasedIds.includes(p.id)) {
        return { ...p, downloadCount: p.downloadCount + 1 };
      }
      return p;
    }));

    // 4. Update User Model
    setUser(prev => ({
      ...prev,
      walletBalance: finalWalletBalance,
      orders: [newOrder, ...prev.orders]
    }));

    // 5. Clear Cart, trigger success telemetry
    setCart([]);
    triggerNotification("Order Confirmed! 🎉", `Your 50% split downpayment is recorded. Delivery of code is scheduled. Invoice ${newOrder.invoiceNumber} is created.`);
  };

  // Simulated Email Sign-Up Trigger
  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName || !authEmail || !authPassword) {
      triggerNotification("Authentication Error ❌", "Please fill out all fields.");
      return;
    }
    if (!authAgree) {
      triggerNotification("Agreement Required ⚠️", "Please accept the terms and privacy agreement.");
      return;
    }
    // Transition to verification view
    setAuthMode("verifying");
    triggerNotification("Verification Code Sent 📧", `An activation code has been securely dispatched to ${authEmail}.`);
  };

  // Simulated Email Verification & Activation
  const handleEmailVerifyAndLogin = () => {
    const newUserObj: UserType = {
      id: "usr-" + Math.floor(1000 + Math.random() * 9000),
      name: authName || "Verified User",
      email: authEmail || "solv@gmail.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      walletBalance: 150.00, // starting balance gift
      role: "Customer",
      isPremium: true,
      referralCode: "SOUL" + Math.floor(1000 + Math.random() * 9000),
      referralsCount: 0,
      earnings: 0.00,
      wishlist: [],
      orders: []
    };

    setUser(newUserObj);
    setIsLoggedIn(true);
    localStorage.setItem("sv_is_logged_in", "true");
    localStorage.setItem("sv_user", JSON.stringify(newUserObj));
    setShowLoginModal(false);
    triggerNotification("Account Activated! 🎉", "Your email has been verified. Welcome to Soulverse.");
  };

  // Simulated Email Login (Handles password validation elegantly)
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      triggerNotification("Login Error ❌", "Please specify email and password.");
      return;
    }

    // Load or create a beautiful profile
    const existingUserObj: UserType = {
      id: "usr-01",
      name: authEmail.split("@")[0].toUpperCase(),
      email: authEmail,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      walletBalance: 350.00,
      role: authEmail === "soulversepk@gmail.com" || authEmail === "solv@gmail.com" ? "Super Admin" : "Customer",
      isPremium: true,
      referralCode: "SOUL99K",
      referralsCount: 14,
      earnings: 45.00,
      wishlist: ["sehr-live", "soul-quran-ai"],
      orders: user?.orders || []
    };

    setUser(existingUserObj);
    setIsLoggedIn(true);
    localStorage.setItem("sv_is_logged_in", "true");
    localStorage.setItem("sv_user", JSON.stringify(existingUserObj));
    setShowLoginModal(false);
    triggerNotification("Login Successful 🚀", `Welcome back, ${existingUserObj.name}!`);
  };

  // Simulated Google SSO Handshake
  const handleGoogleLoginSimulate = () => {
    setAuthMode("google-loading");
    setTimeout(() => {
      const googleUserObj: UserType = {
        id: "usr-google",
        name: "Sarmad Rizwan",
        email: "soulversepk@gmail.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        walletBalance: 350.00,
        role: "Super Admin", // Let's unlock admin dashboard immediately
        isPremium: true,
        referralCode: "SOUL99K",
        referralsCount: 14,
        earnings: 45.00,
        wishlist: ["sehr-live", "soul-quran-ai"],
        orders: user?.orders || []
      };

      setUser(googleUserObj);
      setIsLoggedIn(true);
      localStorage.setItem("sv_is_logged_in", "true");
      localStorage.setItem("sv_user", JSON.stringify(googleUserObj));
      setShowLoginModal(false);
      setAuthMode("login"); // Reset mode for future use
      triggerNotification("Google SSO Authorized 🌐", "Authenticated securely via Google Identity services.");
    }, 1500);
  };

  // Standard Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("sv_is_logged_in", "false");
    triggerNotification("Signed Out 👋", "Successfully terminated secure session.");
  };

  // Create Helpdesk ticket
  const submitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    const newTicket: SupportTicket = {
      id: "TCK-" + Math.floor(100 + Math.random() * 900),
      userEmail: user.email,
      subject: ticketSubject.trim(),
      message: ticketMessage.trim(),
      category: ticketCategory,
      status: "open",
      date: new Date().toISOString().split('T')[0],
      replies: []
    };

    setSupportTickets(prev => [newTicket, ...prev]);
    setTicketSubject("");
    setTicketMessage("");
    triggerNotification("Help Ticket Raised", "Our support desk is analyzing your issue. Expect a reply shortly.");
  };

  // Submit product for seller approval (Seller Hub Tab)
  const submitProductForApproval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice.trim()) return;

    const priceNum = parseFloat(newProdPrice);
    if (isNaN(priceNum)) {
      triggerNotification("Validation Error", "Invalid price parameter entered.");
      return;
    }

    const newProduct: Product = {
      id: "user-upload-" + Date.now(),
      name: newProdName,
      tagline: newProdTagline || "Dynamic creation from Seller platform",
      category: newProdCategory,
      subcategory: "Seller Contributed",
      description: newProdDesc || "Premium verified community digital asset designed for high scalability and rapid deployment integration.",
      features: newProdFeatures ? newProdFeatures.split(",").map(f => f.trim()) : ["Highly Scalable Modules", "Complete Documentation Guide included"],
      version: "v1.0.0",
      developer: user.name,
      price: priceNum,
      rating: 5.0,
      reviewsCount: 0,
      reviews: [],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      screenshots: [],
      downloadCount: 0,
      tags: ["community", "developer asset", "ui tool"]
    };

    setSellerUploads(prev => [...prev, newProduct]);
    setNewProdName("");
    setNewProdTagline("");
    setNewProdPrice("");
    setNewProdDesc("");
    setNewProdFeatures("");
    triggerNotification("Product Submitted", "Asset added to Admin verification queue. Status: PENDING.");
  };

  // Admin approves a seller product
  const approveSellerProduct = (prodId: string) => {
    const target = sellerUploads.find(p => p.id === prodId);
    if (!target) return;

    // Put it live on products list!
    setProducts(prev => [target, ...prev]);
    // Remove from pending uploads
    setSellerUploads(prev => prev.filter(p => p.id !== prodId));
    triggerNotification("Product Approved 🚀", `${target.name} has been verified and published globally to the Soulverse Marketplace.`);
  };

  // Admin reply to support ticket
  const replyToTicket = (ticketId: string, message: string) => {
    if (!message.trim()) return;
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: "resolved",
          replies: [...t.replies, { sender: "admin", message: message.trim(), date: "Just now" }]
        };
      }
      return t;
    }));
    triggerNotification("Ticket Answered", "Helpdesk agent updated ticket status to RESOLVED.");
  };

  // Admin creates discount coupon
  const addCouponCode = (code: string, percent: number) => {
    if (!code || isNaN(percent)) return;
    const newC: Coupon = {
      code: code.trim().toUpperCase(),
      discountPercent: percent,
      expiryDate: "2026-12-31",
      isActive: true
    };
    setCoupons(prev => [newC, ...prev]);
    triggerNotification("New Promo Code", `Coupon code ${newC.code} is now active.`);
  };

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Wallet add funds helper
  const addWalletFunds = () => {
    setUser(prev => ({
      ...prev,
      walletBalance: prev.walletBalance + 100
    }));
    triggerNotification("Funds Deposited", "Added $100 to your Soulverse platform balance successfully.");
  };

  // Checkout modal cart summary price math
  const cartSubtotal = cart.reduce((acc, item) => {
    const price = item.product.discountPrice !== undefined ? item.product.discountPrice : item.product.price;
    return acc + (price * item.quantity);
  }, 0);

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-[#020205] flex flex-col items-center justify-center font-sans p-6 relative overflow-hidden select-none">
        {/* Advanced ambient light beams and glowing cosmic fields */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-cyber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#080710_1px,transparent_1px),linear-gradient(to_bottom,#080710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="z-10 text-center space-y-8 max-w-sm w-full"
        >
          {/* Elite 3D Glassmorphic Icon Wrapper */}
          <div className="relative mx-auto w-40 h-40 group">
            {/* Outer dynamic cyber ring */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-brand-500 to-cyber-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-1000"></div>
            
            {/* Spinning decorative orbit lines */}
            <div className="absolute -inset-3 rounded-[3rem] border border-brand-500/20 border-t-brand-400 border-r-cyber-500/40 animate-spin" style={{ animationDuration: '4s' }}></div>
            <div className="absolute -inset-5 rounded-[3.5rem] border border-dashed border-gray-800 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}></div>

            {/* Logo container */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 bg-black/80 flex items-center justify-center shadow-2xl p-0.5">
              <img 
                src={soulverseLogo} 
                alt="Soulverse App Store Logo" 
                className="w-full h-full object-cover rounded-[1.85rem] shadow-inner"
              />
            </div>
          </div>

          {/* Typography Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-white tracking-widest text-gradient font-sans">
              SOULVERSE
            </h1>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-500 animate-ping"></span>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.25em]">
                Secure Digital Ecosystem
              </p>
            </div>
          </div>

          {/* Progress Engine Container */}
          <div className="bg-gray-950/60 border border-gray-900 rounded-2xl p-5 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center text-[11px] font-mono text-gray-400">
              <span className="text-brand-400 font-bold uppercase tracking-wider">BOOTLOADER v2.4</span>
              <span className="text-white font-extrabold">{loadingProgress}%</span>
            </div>

            {/* Precision progress bar */}
            <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden p-[1px] border border-gray-950">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-brand-500 via-indigo-500 to-cyber-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            {/* Dynamic Telemetry Log Terminal */}
            <div className="flex items-center gap-2 text-left bg-black/40 border border-gray-900/60 rounded-xl p-3 min-h-[44px]">
              <Terminal className="w-3.5 h-3.5 text-cyber-400 shrink-0 animate-pulse" />
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-gray-400 block truncate leading-tight animate-pulse">
                  {loadingLog}
                </span>
              </div>
            </div>
          </div>

          {/* Secure Handshake Notice */}
          <div className="text-[9px] font-mono text-gray-600 flex justify-between px-2">
            <span>SSL CERT: ACTIVE</span>
            <span>TLS 1.3 SECURE LINK</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (simulatedError) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center font-sans p-6 relative overflow-hidden">
        {/* Background Glows */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 ${simulatedError === "404" ? "bg-amber-600/10" : "bg-rose-600/10"} rounded-full blur-[100px] pointer-events-none`}></div>

        <div className="z-10 text-center space-y-6 max-w-lg bg-gray-900/40 border border-gray-800 p-8 rounded-2xl backdrop-blur-xl">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border shadow-lg"
               style={{
                 backgroundColor: simulatedError === "404" ? "rgba(217, 119, 6, 0.1)" : "rgba(225, 29, 72, 0.1)",
                 borderColor: simulatedError === "404" ? "rgba(217, 119, 6, 0.2)" : "rgba(225, 29, 72, 0.2)",
                 color: simulatedError === "404" ? "#fbbf24" : "#f43f5e"
               }}>
            <ShieldAlert className="w-8 h-8 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl font-mono font-bold text-white tracking-wider">
              {simulatedError}
            </h1>
            <h2 className="text-xl font-bold text-gray-200">
              {simulatedError === "404" ? "Ecosystem Resource Not Found" : "Central Gateway Integrity Compromised"}
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed font-mono max-w-sm mx-auto">
              {simulatedError === "404" 
                ? "The requested endpoint URL or simulated Microservice node is inactive on the Soulverse Edge Network." 
                : "An unhandled server-side compile exception has been captured by the master telemetry supervisor."}
            </p>
          </div>

          {/* Technical Diagnostics Block */}
          <div className="bg-black/60 p-4 rounded-xl border border-gray-900 text-left space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-gray-500 border-b border-gray-950 pb-1.5">
              <span>DIAGNOSTICS supervisor</span>
              <span className="text-rose-400">STATUS: ERROR</span>
            </div>
            <pre className="text-[10px] font-mono text-rose-300 overflow-x-auto whitespace-pre leading-tight">
              {simulatedError === "404" 
                ? "Code: ERR_SUBDOMAIN_RESOLVE_FAILED\nTarget: " + window.location.host + "\nTrace: Route resolves to virtual index but template is inactive."
                : "Code: ERR_GATEWAY_INTEGRITY_COMPROMISED\nSeverity: CRITICAL\nTrace: Memory limits breached on node ingress proxy (Port: 3000)."}
            </pre>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setSimulatedError(null)}
              className="bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              Reset simulated route
            </button>
            <button
              onClick={() => {
                setSimulatedError(null);
                handleSubdomainChange(initialSubdomains[0]);
              }}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-mono text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              Return to Store Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 text-gray-200 relative pb-20 selection:bg-brand-600 selection:text-white">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-700/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute top-[60vh] right-10 w-96 h-96 bg-cyber-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* SUBDOMAIN FLOATING BANNER SWAPPER */}
      <div className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-gray-900 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4 overflow-x-auto text-xs font-mono">
          <div className="flex items-center gap-1.5 shrink-0 text-gray-400">
            <Globe className="w-3.5 h-3.5 text-brand-400 animate-spin" />
            <span className="font-bold text-[11px] text-gray-300">Subdomain Switcher:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-[80%] scrollbar-none">
            {initialSubdomains.map(sub => {
              const isSelected = activeSubdomain.id === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSubdomainChange(sub)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all shrink-0 border flex items-center gap-1.5 ${
                    isSelected 
                      ? "bg-brand-600 text-white border-brand-400 shadow-sm shadow-brand-500/20" 
                      : "bg-gray-900/60 text-gray-400 border-gray-900 hover:text-white hover:border-gray-800"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-cyber-500 animate-pulse" : "bg-gray-600"}`}></span>
                  {sub.subdomain}
                </button>
              );
            })}
          </div>

          <span className="text-[9px] text-cyber-500 bg-cyber-500/10 px-2.5 py-0.5 rounded border border-cyber-500/20 uppercase font-extrabold animate-pulse tracking-wider shrink-0">
            {activeSubdomain.status}
          </span>
        </div>

        {/* MAIN HEADER */}
        <header className="border-t border-gray-900 bg-black/40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
            
            {/* Branding Logo */}
            <div 
              onClick={() => {
                setActiveSubdomain(initialSubdomains[0]); // Return to store.soulverseapps.com
                setStoreTab("marketplace");
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all p-0.5">
                <img 
                  src={soulverseLogo} 
                  alt="Soulverse Logo" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white font-sans tracking-tight block group-hover:text-brand-400 transition-all">
                  Soulverse Apps
                </span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block -mt-1.5">
                  Official Ecosystem
                </span>
              </div>
            </div>

            {/* Global Responsive Navigation Center (Desktop / Tablet) */}
            <nav className="hidden xl:flex items-center gap-0.5 bg-gray-950/80 p-1 rounded-xl border border-gray-900 font-sans">
              <button
                onClick={() => {
                  setActiveSubdomain(initialSubdomains[0]);
                  setStoreTab("marketplace");
                  setSelectedCategory("All");
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider shrink-0 ${
                  activeSubdomain.id === "store" && storeTab === "marketplace" && selectedCategory === "All"
                    ? "bg-brand-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/40"
                }`}
              >
                Home
              </button>

              <button
                onClick={() => {
                  setActiveSubdomain(initialSubdomains[0]);
                  setStoreTab("marketplace");
                  setSelectedCategory(Category.Apps);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider shrink-0 ${
                  activeSubdomain.id === "store" && storeTab === "marketplace" && selectedCategory === Category.Apps
                    ? "bg-brand-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/40"
                }`}
              >
                Apps
              </button>

              <button
                onClick={() => {
                  setActiveSubdomain(initialSubdomains[0]);
                  setStoreTab("marketplace");
                  setSelectedCategory("All");
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider shrink-0 ${
                  activeSubdomain.id === "store" && storeTab === "marketplace" && selectedCategory !== Category.Apps && selectedCategory !== Category.Templates && selectedCategory !== Category.AITools
                    ? "bg-brand-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/40"
                }`}
              >
                Store
              </button>

              <button
                onClick={() => {
                  setActiveSubdomain(initialSubdomains[0]);
                  setStoreTab("services");
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider shrink-0 ${
                  activeSubdomain.id === "store" && storeTab === "services"
                    ? "bg-brand-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/40"
                }`}
              >
                Services
              </button>

              <button
                onClick={() => {
                  setActiveSubdomain(initialSubdomains[0]);
                  setStoreTab("marketplace");
                  setSelectedCategory(Category.AITools);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider shrink-0 ${
                  activeSubdomain.id === "store" && storeTab === "marketplace" && selectedCategory === Category.AITools
                    ? "bg-brand-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/40"
                }`}
              >
                AI Projects
              </button>

              <button
                onClick={() => {
                  setActiveSubdomain(initialSubdomains[0]);
                  setStoreTab("marketplace");
                  setSelectedCategory(Category.Templates);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider shrink-0 ${
                  activeSubdomain.id === "store" && storeTab === "marketplace" && selectedCategory === Category.Templates
                    ? "bg-brand-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/40"
                }`}
              >
                Templates
              </button>

              <button
                onClick={() => {
                  setActiveSubdomain(initialSubdomains[0]);
                  setStoreTab("pricing");
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider shrink-0 ${
                  activeSubdomain.id === "store" && storeTab === "pricing"
                    ? "bg-brand-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/40"
                }`}
              >
                Pricing
              </button>

              <button
                onClick={() => {
                  const blogSub = initialSubdomains.find(s => s.id === "blog") || initialSubdomains[5];
                  handleSubdomainChange(blogSub);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider shrink-0 ${
                  activeSubdomain.id === "blog"
                    ? "bg-brand-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/40"
                }`}
              >
                Blog
              </button>

              <button
                onClick={() => {
                  const supportSub = initialSubdomains.find(s => s.id === "support") || initialSubdomains[4];
                  handleSubdomainChange(supportSub);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider shrink-0 ${
                  activeSubdomain.id === "support"
                    ? "bg-brand-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/40"
                }`}
              >
                Support
              </button>

              <button
                onClick={() => {
                  setActiveSubdomain(initialSubdomains[0]);
                  setStoreTab("contact");
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider shrink-0 ${
                  activeSubdomain.id === "store" && storeTab === "contact"
                    ? "bg-brand-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900/40"
                }`}
              >
                Contact
              </button>

              {(!isProductionMode || activeSubdomain.id === "admin") && (
                <button
                  onClick={() => {
                    const adminSub = initialSubdomains.find(s => s.id === "admin") || initialSubdomains[6];
                    handleSubdomainChange(adminSub);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all uppercase tracking-wider shrink-0 ${
                    activeSubdomain.id === "admin"
                      ? "bg-brand-600 text-white border border-brand-500/30"
                      : "text-brand-400 hover:text-brand-300 hover:bg-brand-950/20"
                  }`}
                >
                  Admin Panel
                </button>
              )}
            </nav>

            {/* Subdomain status tracker icon on smaller viewports */}
            {activeSubdomain.id !== "store" && (
              <div className="hidden sm:flex xl:hidden items-center gap-1.5 bg-gray-900/60 border border-gray-800 px-3 py-1 rounded-full text-[10px] text-gray-300 font-mono">
                <Compass className="w-3 h-3 text-brand-400" />
                Active: <strong className="text-white">{activeSubdomain.name}</strong>
              </div>
            )}

            {/* Global Actions Block */}
            <div className="flex items-center gap-3">
              
              {/* WhatsApp Portal */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowWhatsAppDropdown(!showWhatsAppDropdown);
                    setShowNotificationCenter(false);
                    setShowCartPopover(false);
                  }}
                  className="bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-900/30 hover:border-emerald-800/50 p-2.5 rounded-xl text-emerald-400 hover:text-emerald-300 transition-all relative flex items-center justify-center"
                  title="WhatsApp Hub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.832.002-2.627-1.02-5.1-2.871-6.957C16.59 1.958 14.116.945 11.485.945 6.05.945 1.625 5.357 1.622 10.777c-.001 1.761.461 3.479 1.34 5.011l-.995 3.636 3.733-.979zm11.57-5.693c-.307-.154-1.82-.9-2.102-1.002-.283-.103-.488-.154-.693.154-.205.308-.795 1.002-.974 1.205-.18.206-.359.23-.667.077-.307-.154-1.299-.48-2.476-1.531-.914-.817-1.532-1.825-1.712-2.133-.18-.308-.02-.475.134-.628.14-.137.307-.359.461-.54.154-.18.205-.308.307-.513.103-.205.051-.385-.026-.54-.077-.154-.693-1.667-.95-2.285-.25-.601-.505-.519-.693-.529-.18-.01-.385-.01-.59-.01-.205 0-.538.077-.82.385-.283.308-1.078 1.051-1.078 2.564 0 1.513 1.102 2.974 1.256 3.18.154.205 2.17 3.313 5.256 4.646.734.317 1.307.506 1.753.647.737.234 1.407.201 1.937.12.59-.09 1.82-.744 2.077-1.462.256-.718.256-1.334.18-1.462-.077-.128-.282-.205-.59-.359z"/>
                  </svg>
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </button>

                <AnimatePresence>
                  {showWhatsAppDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-3 w-80 bg-dark-900 border border-gray-750 rounded-2xl shadow-2xl p-4 z-50 space-y-3.5 text-xs text-left"
                    >
                      <div className="flex justify-between items-center border-b border-gray-800 pb-2.5">
                        <div>
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            WhatsApp Connect Hub
                          </span>
                          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">Official Channel & Help Desk</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Online</span>
                      </div>

                      {/* Option 1: Official Broadcast Channel */}
                      {whatsAppConfig.isChannelEnabled && (
                        <div className="bg-gray-950/60 border border-gray-900 rounded-xl p-3 space-y-2 hover:border-emerald-900/30 transition-all">
                          <div>
                            <span className="font-extrabold text-white text-[11px] block">📢 Official Broadcast Channel</span>
                            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">
                              Join for instant product releases, discount coupons, and daily code snippets.
                            </p>
                          </div>
                          <a 
                            href={whatsAppConfig.channelLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-bold py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            Join WhatsApp Channel <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      {/* Option 2: WhatsApp Support Contact */}
                      {whatsAppConfig.isChatEnabled && (
                        <div className="bg-gray-950/60 border border-gray-900 rounded-xl p-3 space-y-2 hover:border-emerald-900/30 transition-all">
                          <div>
                            <span className="font-extrabold text-white text-[11px] block">💬 24/7 Technical Support</span>
                            <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">
                              Direct chat with our technical and billing team for instant support.
                            </p>
                          </div>
                          <a 
                            href={`https://wa.me/${whatsAppConfig.chatLink}?text=${encodeURIComponent(whatsAppConfig.chatMessage)}`}
                            target="_blank" 
                            rel="noreferrer"
                            className="w-full bg-gray-950 hover:bg-gray-900 text-emerald-400 border border-emerald-900/30 font-mono text-[10px] font-bold py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            Start WhatsApp Chat <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowNotificationCenter(!showNotificationCenter);
                    setShowWhatsAppDropdown(false);
                    setShowCartPopover(false);
                  }}
                  className="bg-gray-950 border border-gray-900 hover:border-gray-800 p-2.5 rounded-xl text-gray-300 hover:text-white transition-all relative"
                >
                  <Bell className="w-4 h-4" />
                  {notifications.some(n => !n.isRead) && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  )}
                </button>
                
                {/* Notification Panel */}
                <AnimatePresence>
                  {showNotificationCenter && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-3 w-80 bg-dark-900 border border-gray-750 rounded-2xl shadow-2xl p-4 z-50 space-y-3 text-xs"
                    >
                      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="font-bold text-white">Platform System Notifications</span>
                        <button 
                          onClick={() => {
                            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
                            setShowNotificationCenter(false);
                          }}
                          className="text-[10px] font-mono text-brand-400 hover:underline"
                        >
                          Mark all read
                        </button>
                      </div>
                      <div className="space-y-2.5 max-h-[220px] overflow-y-auto">
                        {notifications.map(n => (
                          <div key={n.id} className={`p-2 rounded-xl text-[11px] ${n.isRead ? "bg-gray-950/30 text-gray-400" : "bg-brand-950/20 text-gray-200 border border-brand-900/20"}`}>
                            <div className="flex justify-between font-bold mb-0.5">
                              <span>{n.title}</span>
                              <span className="text-[9px] text-gray-500">{n.date}</span>
                            </div>
                            <p className="leading-normal">{n.message}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shopping Cart (Visible on marketplace store) */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowCartPopover(!showCartPopover);
                    setShowWhatsAppDropdown(false);
                    setShowNotificationCenter(false);
                  }}
                  className="bg-gray-950 border border-gray-900 hover:border-gray-800 p-2.5 rounded-xl text-gray-300 hover:text-white transition-all flex items-center gap-1.5 relative"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cart.length > 0 && (
                    <span className="bg-brand-500 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </button>

                {/* Shopping Cart Dropdown popover */}
                <AnimatePresence>
                  {showCartPopover && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-3 w-80 bg-dark-900 border border-gray-750 rounded-2xl shadow-2xl p-4 z-50 text-xs"
                    >
                      <h4 className="font-bold text-white mb-3 flex items-center justify-between">
                        <span>Your Shopping Cart</span>
                        <span className="text-[10px] text-gray-400">{cart.length} items</span>
                      </h4>

                      {cart.length > 0 ? (
                        <div className="space-y-3">
                          <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                            {cart.map(item => {
                              const price = item.product.discountPrice !== undefined ? item.product.discountPrice : item.product.price;
                              return (
                                <div key={item.product.id} className="flex justify-between items-center gap-2 bg-gray-950/60 p-2 rounded-xl border border-gray-900">
                                  <div className="truncate flex-1">
                                    <span className="font-bold text-gray-200 block truncate">{item.product.name}</span>
                                    <span className="text-[10px] text-gray-500 font-mono">Qty: {item.quantity} • ${price.toFixed(2)}</span>
                                  </div>
                                  <button 
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="text-gray-500 hover:text-rose-400 p-1 font-bold"
                                  >
                                    ✕
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                          <div className="border-t border-gray-900 pt-3 flex justify-between font-bold text-white">
                            <span>Subtotal:</span>
                            <span className="font-mono text-brand-400">${cartSubtotal.toFixed(2)}</span>
                          </div>
                          <button
                            onClick={() => {
                              setShowCartPopover(false);
                              if (!isLoggedIn) {
                                triggerNotification("Sign In Required 🔒", "Please log in or sign up to check out and complete the agreement.");
                                setAuthMode("login");
                                setShowLoginModal(true);
                              } else {
                                setShowCheckoutModal(true);
                              }
                            }}
                            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1"
                          >
                            Proceed to Checkout <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500 font-mono">
                          Shopping cart is empty.
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wallet Direct Balance indicator */}
              {isLoggedIn ? (
                <div 
                  onClick={() => {
                    setActiveSubdomain(initialSubdomains[0]);
                    setStoreTab("profile");
                  }}
                  className="hidden sm:flex items-center gap-2 bg-gray-950 hover:bg-gray-900 border border-gray-900 hover:border-gray-800 px-3 py-1.5 rounded-xl text-xs font-mono cursor-pointer transition-all"
                >
                  <Wallet className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-gray-400">Balance:</span>
                  <strong className="text-amber-400">${user.walletBalance.toFixed(2)}</strong>
                </div>
              ) : (
                <div 
                  onClick={() => {
                    setAuthMode("login");
                    setShowLoginModal(true);
                  }}
                  className="hidden sm:flex items-center gap-2 bg-black/60 border border-gray-900 px-3 py-1.5 rounded-xl text-xs font-mono cursor-pointer transition-all text-gray-500 hover:text-gray-400"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                  <span>Secure Browse Mode</span>
                </div>
              )}

              {/* User Account avatar / login trigger */}
              {isLoggedIn ? (
                <button 
                  onClick={() => {
                    setActiveSubdomain(initialSubdomains[0]);
                    setStoreTab("profile");
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-800 hover:from-brand-500 hover:to-brand-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-brand-950/40"
                >
                  <img src={user.avatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
                  <span className="hidden md:inline">{user.name.split(" ")[0]}</span>
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setAuthMode("login");
                    setShowLoginModal(true);
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-800 hover:from-brand-500 hover:to-brand-700 text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand-950/30"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Sign In / Join</span>
                </button>
              )}

            </div>
          </div>
        </header>
      </div>

      {/* RENDER ACTIVE SCREEN ACCORDING TO ROUTED SUBDOMAIN */}
      <main className="max-w-7xl mx-auto px-4 py-8 z-10 relative">
        
        {activeSubdomain.id === "store" ? (
          /* ==========================================================================
             A. STORE.SOULVERSEAPPS.COM APP HUB & DIGITAL MARKETPLACE
             ========================================================================== */
          <div className="space-y-12">
            
            {/* Context Navigation bar for Mobile screen sizes */}
            <div className="flex md:hidden justify-center bg-gray-950 p-1 rounded-xl border border-gray-900 max-w-sm mx-auto mb-4">
              <button
                onClick={() => setStoreTab("marketplace")}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all ${
                  storeTab === "marketplace" ? "bg-brand-600 text-white" : "text-gray-400"
                }`}
              >
                Marketplace
              </button>
              <button
                onClick={() => setStoreTab("profile")}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all ${
                  storeTab === "profile" ? "bg-brand-600 text-white" : "text-gray-400"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setStoreTab("seller-hub")}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all ${
                  storeTab === "seller-hub" ? "bg-brand-600 text-white" : "text-gray-400"
                }`}
              >
                Seller Hub
              </button>
            </div>

            {storeTab === "marketplace" && (
              <>
                {/* 1. PREMIUM HERO SECTION */}
                <div className="relative rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-950 via-dark-900 to-black p-8 sm:p-12 md:p-16 text-center space-y-6 shadow-2xl">
                  {/* Glowing background highlights */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <span className="inline-flex items-center gap-1.5 bg-brand-500/10 text-brand-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold border border-brand-500/25 uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Launching the Soulverse Digital Network
                  </span>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-sans text-white tracking-tight leading-tight max-w-4xl mx-auto">
                    Global <span className="text-gradient">Digital App Store</span> & AI Prompt Marketplace
                  </h1>

                  <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Discover and download custom-crafted production-grade Android & iOS apps, premium website templates, smart AI prompts, high-fidelity UI kits, and advanced source codes.
                  </p>

                  {/* Interactive search form */}
                  <div className="max-w-xl mx-auto relative flex items-center bg-gray-900/60 p-1.5 rounded-2xl border border-gray-800 focus-within:border-brand-500 transition-all shadow-inner">
                    <Search className="w-5 h-5 text-gray-500 ml-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search Sehr Live Pro, ChatGPT prompts, UI kits, Firebase templates..."
                      className="flex-1 bg-transparent px-3 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="text-gray-500 hover:text-white mr-2 text-xs font-mono bg-gray-950 p-1 rounded"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  {/* Quick stats tags */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 text-center border-t border-gray-900">
                    <div>
                      <span className="text-xl sm:text-2xl font-extrabold text-white block">120K+</span>
                      <span className="text-[10px] sm:text-xs text-gray-500 font-mono uppercase">Total Downloads</span>
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-extrabold text-white block">3,500+</span>
                      <span className="text-[10px] sm:text-xs text-gray-500 font-mono uppercase">Verified Prompt Packs</span>
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-extrabold text-white block">99.8%</span>
                      <span className="text-[10px] sm:text-xs text-gray-500 font-mono uppercase">Gateway Uptime</span>
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-extrabold text-white block">14+</span>
                      <span className="text-[10px] sm:text-xs text-gray-500 font-mono uppercase">App Subdomains</span>
                    </div>
                  </div>
                </div>

                {/* 2. CHOOSE MARKETPLACE CATEGORIES */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-gray-900 pb-3">
                    <div>
                      <h3 className="text-lg font-bold font-sans text-white">Explore Marketplace</h3>
                      <p className="text-xs text-gray-500">Filter through our multi-category developer & spiritual products ecosystem</p>
                    </div>
                    <span className="text-xs text-gray-400 font-mono bg-gray-950 px-2.5 py-1 rounded border border-gray-900">
                      Items: {filteredProducts.length}
                    </span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                        selectedCategory === "All" 
                          ? "bg-brand-600 text-white border-brand-500" 
                          : "bg-gray-950 text-gray-400 border-gray-900 hover:border-gray-800"
                      }`}
                    >
                      All Products
                    </button>
                    {Object.values(Category).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                          selectedCategory === cat 
                            ? "bg-brand-600 text-white border-brand-500" 
                            : "bg-gray-950 text-gray-400 border-gray-900 hover:border-gray-800"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. PRODUCTS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(p => {
                    const price = p.discountPrice !== undefined ? p.discountPrice : p.price;
                    const hasDiscount = p.discountPrice !== undefined && p.discountPrice < p.price;
                    return (
                      <motion.div
                        key={p.id}
                        layoutId={`prod-card-${p.id}`}
                        className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-gray-900/60 transition-all flex flex-col justify-between group h-[400px]"
                      >
                        {/* Card Image Header */}
                        <div className="relative h-44 overflow-hidden bg-gray-950">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                          
                          {/* Tags / Subcategory badges */}
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
                            <span className="bg-brand-600/90 backdrop-blur-md text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                              {p.subcategory}
                            </span>
                            {p.isFeatured && (
                              <span className="bg-amber-500 text-black font-mono text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-0.5">
                                <Sparkles className="w-2.5 h-2.5" /> Featured
                              </span>
                            )}
                          </div>

                          <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-gray-400 font-mono text-[10px] px-2 py-0.5 rounded flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {p.rating}
                          </span>
                        </div>

                        {/* Card Content Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-base font-extrabold text-white tracking-tight truncate group-hover:text-brand-400 transition-all">
                                {p.name}
                              </h4>
                              {p.isCompanyApp && (
                                <span className="bg-brand-950/60 text-brand-400 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-brand-900/20 uppercase shrink-0">
                                  Official App
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                              {p.tagline}
                            </p>
                          </div>

                          <div className="space-y-3">
                            {/* Details table preview */}
                            <div className="flex justify-between items-center text-[11px] font-mono border-t border-gray-900/60 pt-2.5">
                              <span className="text-gray-500">Downloads: {p.downloadCount.toLocaleString()}</span>
                              <span className="text-gray-500">Dev: {p.developer}</span>
                            </div>

                            {/* Actions bar */}
                            <div className="flex items-center justify-between border-t border-gray-900/60 pt-3">
                              <div className="flex flex-col">
                                {hasDiscount && (
                                  <span className="text-[10px] line-through text-gray-600 font-mono">
                                    ${p.price.toFixed(2)}
                                  </span>
                                )}
                                <span className="text-sm font-extrabold text-white font-mono">
                                  {price === 0 ? (
                                    <span className="text-cyber-500 font-bold uppercase text-[11px]">Free / App Store</span>
                                  ) : (
                                    `$${price.toFixed(2)}`
                                  )}
                                </span>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => setSelectedProduct(p)}
                                  className="bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 hover:border-gray-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                                >
                                  View
                                </button>
                                {price > 0 && (
                                  <button
                                    onClick={() => addToCart(p)}
                                    className="bg-brand-600 hover:bg-brand-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                                  >
                                    Add <Plus className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="glass-panel p-12 rounded-2xl border border-gray-900 text-center max-w-md mx-auto">
                    <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-white mb-1">No Assets Match Your Query</h4>
                    <p className="text-xs text-gray-400 mb-4">Try refining your filter categories or checking keyword spellings.</p>
                    <button 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                      }}
                      className="bg-gray-900 text-gray-300 font-mono text-xs px-4 py-2 rounded-xl border border-gray-800"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* 4. COMPANY INTRODUCTION & VALUES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-950/40 p-8 sm:p-12 rounded-3xl border border-gray-900">
                  <div className="space-y-4">
                    <span className="bg-brand-500/10 text-brand-400 px-2.5 py-1 rounded text-xs font-mono border border-brand-500/20 uppercase font-bold">
                      Who We Are
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-sans text-white tracking-tight">
                      Empowering Global Digital Progress & Spiritual Growth
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      At Soulverse pk, we believe technology should be beautiful, high-speed, and deeply aligned with human potential. We build advanced software pipelines spanning low-latency broadcasting (Sehr Live) down to interactive religious and language studying tools (Soul Quran AI). 
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      Our platform doubles as a future-proof marketplace where software architects can distribute optimized Cursor rules, ChatGPT/Gemini prompt frameworks, and ready-to-deploy multi-vendor Flutter scripts securely.
                    </p>
                    
                    <div className="flex gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyber-500" />
                        <span className="text-xs font-bold text-gray-300">Fast Edge Loading</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyber-500" />
                        <span className="text-xs font-bold text-gray-300">Secure Sandboxes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyber-500" />
                        <span className="text-xs font-bold text-gray-300">24/7 Priority Tickets</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative aspect-video sm:aspect-square bg-gradient-to-tr from-brand-900/40 to-brand-950/20 border border-gray-900 rounded-2xl flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1.5px)] bg-[size:20px_20px] opacity-30"></div>
                    <div className="text-center space-y-4 z-10">
                      <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center font-extrabold text-white text-2xl mx-auto shadow-lg shadow-brand-500/20">
                        SV
                      </div>
                      <h4 className="text-base font-bold text-white font-mono uppercase tracking-widest">Soulverse Core v3.0</h4>
                      <p className="text-[11px] text-gray-400 max-w-xs mx-auto">Deploying microservices across 14 geographical regions for zero latency ingestion.</p>
                      
                      <button
                        onClick={() => handleSubdomainChange(initialSubdomains[7])} // Route to developer.soulverseapps.com
                        className="bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white font-mono text-xs px-4 py-2 rounded-xl transition-all"
                      >
                        Enter Developer Hub
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5. DEVELOPER CORNER (SUBDOMAIN ARCHITECTURE EXPLAINED) */}
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">Our Subdomain Architecture</h3>
                    <p className="text-xs text-gray-400 max-w-xl mx-auto">Soulverse operates on a modular ecosystem. Switch to any subdomain via the swapper above to test their custom web utilities.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {initialSubdomains.slice(0, 9).map(sub => (
                      <div 
                        key={sub.id} 
                        onClick={() => handleSubdomainChange(sub)}
                        className="bg-gray-950/80 hover:bg-gray-900 p-5 rounded-2xl border border-gray-900 hover:border-gray-800 transition-all cursor-pointer group flex flex-col justify-between h-[150px]"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-mono text-brand-400 font-bold group-hover:underline">
                              {sub.subdomain}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-all" />
                          </div>
                          <h4 className="text-sm font-bold text-white font-sans">{sub.name}</h4>
                          <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">{sub.description}</p>
                        </div>

                        <span className="text-[10px] uppercase font-mono text-gray-500 block">
                          Type: {sub.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. FAQS SECTION */}
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Ecosystem FAQs</h3>
                    <p className="text-xs text-gray-400">Everything you need to know about Soulverse Apps, billing, licensing, and memberships</p>
                  </div>

                  <div className="space-y-3">
                    {initialFAQs.map((faq, i) => (
                      <div key={i} className="bg-gray-950/60 border border-gray-900 rounded-2xl p-5 space-y-2">
                        <h4 className="text-sm font-bold text-white flex items-start gap-2">
                          <HelpCircle className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                          {faq.question}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pl-6">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. NEWSLETTER */}
                <div className="bg-gradient-to-r from-brand-950/40 via-dark-800 to-brand-900/20 p-8 sm:p-12 rounded-3xl border border-gray-750 text-center space-y-4 max-w-4xl mx-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1.5px)] bg-[size:16px_16px] opacity-10"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Stay Updated on the Soulverse Network</h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto leading-normal">
                    Receive weekly notifications regarding OBS livestream encoders, advanced Cursor prompts, and multi-vendor Flutter releases. No spam, ever.
                  </p>
                  <div className="max-w-md mx-auto flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Enter your email address..."
                      className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none"
                    />
                    <button 
                      onClick={() => triggerNotification("Subscribed Successfully", "Thank you for joining our community update newsletter.")}
                      className="bg-white text-black font-mono text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-all"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ==========================================================================
               B. STORE PROFILE VIEW (USER DASHBOARD)
               ========================================================================== */}
            {storeTab === "profile" && (
              !isLoggedIn ? (
                /* GUEST NOT LOGGED IN SECURED GATE */
                <div className="space-y-8 max-w-xl mx-auto py-12 text-center font-sans">
                  <div className="bg-gray-950 p-8 rounded-3xl border border-gray-900 space-y-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 via-transparent to-transparent opacity-60"></div>
                    <div className="w-16 h-16 bg-brand-500/10 border border-brand-500/30 rounded-2xl flex items-center justify-center mx-auto text-brand-400 relative z-10">
                      <UserCheck className="w-8 h-8" />
                    </div>
                    <div className="space-y-2 relative z-10">
                      <h3 className="text-xl font-bold text-white tracking-tight">Secure Client Ingress Hub</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        To access private licenses, download code package binaries, track active delivery agreements, or access direct support, please establish secure session credentials.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 pt-2 relative z-10">
                      <button
                        onClick={() => {
                          setAuthMode("signup");
                          setShowLoginModal(true);
                        }}
                        className="bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-950/40"
                      >
                        Create Account / Register Code
                      </button>
                      <button
                        onClick={() => {
                          setAuthMode("login");
                          setShowLoginModal(true);
                        }}
                        className="bg-gray-900 hover:bg-gray-850 border border-gray-800 text-gray-300 font-mono text-xs font-bold py-3 rounded-xl transition-all"
                      >
                        Sign In with Email & Key
                      </button>
                      <div className="flex items-center justify-center gap-2 py-1">
                        <span className="w-8 h-[1px] bg-gray-900"></span>
                        <span className="text-[10px] font-mono text-gray-600 uppercase">Or Trust Instantly</span>
                        <span className="w-8 h-[1px] bg-gray-900"></span>
                      </div>
                      <button
                        onClick={handleGoogleLoginSimulate}
                        className="bg-[#4285F4]/10 hover:bg-[#4285F4]/20 border border-[#4285F4]/30 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4 fill-current text-[#4285F4]" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        One-Click Login via Google
                      </button>
                    </div>

                    <div className="border-t border-gray-900 pt-4 text-left space-y-2">
                      <span className="text-[10px] font-mono text-gray-500 uppercase font-bold block">Ecosystem Help desk</span>
                      <p className="text-[11px] text-gray-400 leading-normal">
                        Have direct inquiries or custom codebase design questions? You don't need an account to query our admin desk directly:
                      </p>
                      <div className="bg-black/30 border border-gray-900 p-3 rounded-2xl space-y-1.5 font-mono text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Email Contact:</span>
                          <a href="mailto:solv@gmail.com" className="text-brand-400 font-bold hover:underline">solv@gmail.com</a>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">WhatsApp Desk:</span>
                          <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="text-emerald-400 font-bold hover:underline">+92 300 1234567</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* AUTHENTICATED USER PROFILE DASHBOARD */
                <div className="space-y-8 max-w-5xl mx-auto font-sans">
                  <div className="border-b border-gray-900 pb-4 flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">Your Soulverse Account</h2>
                      <p className="text-xs text-gray-500 font-mono">Manage invoices, referrals, downloads, and 50/50 contracts</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={addWalletFunds}
                        className="bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-1.5 shadow-md shadow-amber-500/10"
                      >
                        <Plus className="w-4 h-4" /> Deposit $100 Funds
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="bg-gray-900 hover:bg-gray-800 border border-gray-800 text-rose-400 font-mono text-xs font-bold px-4 py-2.5 rounded-xl transition-all inline-flex items-center gap-1.5"
                      >
                        <X className="w-4 h-4" /> Log Out
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stats Sidebar */}
                    <div className="space-y-6">
                      <div className="bg-gray-950 p-5 rounded-2xl border border-gray-900 text-center space-y-4">
                        <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-brand-500" />
                        <div>
                          <h4 className="text-base font-bold text-white font-sans">{user.name}</h4>
                          <span className="text-[10px] font-mono text-gray-500 block">{user.email}</span>
                        </div>
                        
                        <div className="bg-brand-500/10 text-brand-400 py-1 px-3 rounded-full text-[11px] border border-brand-500/20 inline-block font-mono font-bold uppercase">
                          Account privilege: {user.role}
                        </div>

                        <div className="border-t border-gray-900/60 pt-4 grid grid-cols-2 gap-2 text-center">
                          <div className="bg-black/30 p-2 rounded-xl">
                            <span className="text-[10px] text-gray-500 font-mono block">Wallet</span>
                            <span className="text-sm font-extrabold text-white font-mono">${user.walletBalance.toFixed(2)}</span>
                          </div>
                          <div className="bg-black/30 p-2 rounded-xl">
                            <span className="text-[10px] text-gray-500 font-mono block">Orders</span>
                            <span className="text-sm font-extrabold text-white font-mono">{user.orders.length}</span>
                          </div>
                        </div>
                      </div>

                      {/* Affiliate Dashboard */}
                      <div className="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-4">
                        <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">Referral & Affiliate</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">Share your custom link. Earn <strong>15% commission</strong> on every verified download purchase.</p>
                        
                        <div className="bg-black p-2.5 rounded-xl border border-gray-900 flex justify-between items-center">
                          <span className="text-xs text-brand-400 font-mono font-bold tracking-wider">{user.referralCode}</span>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(`https://soulverseapps.com?ref=${user.referralCode}`);
                              triggerNotification("Link Copied 📋", "Your custom affiliate referral link is copied.");
                            }}
                            className="text-[10px] font-mono text-gray-400 hover:text-white"
                          >
                            Copy link
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-center font-mono">
                          <div className="bg-black/40 p-2 rounded-xl border border-gray-900">
                            <span className="text-[9px] text-gray-500">Signups</span>
                            <span className="text-xs font-bold text-white block">{user.referralsCount} Users</span>
                          </div>
                          <div className="bg-black/40 p-2 rounded-xl border border-gray-900">
                            <span className="text-[9px] text-gray-500">Earnings</span>
                            <span className="text-xs font-bold text-cyber-500 block">${user.earnings.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp Support & Channel Hub */}
                      <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/20 hover:border-emerald-800/40 space-y-4 transition-all shadow-lg shadow-emerald-950/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl"></div>
                        <div className="flex items-center gap-2 border-b border-gray-900 pb-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-950/50 flex items-center justify-center text-emerald-400 border border-emerald-900/30">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.832.002-2.627-1.02-5.1-2.871-6.957C16.59 1.958 14.116.945 11.485.945 6.05.945 1.625 5.357 1.622 10.777c-.001 1.761.461 3.479 1.34 5.011l-.995 3.636 3.733-.979zm11.57-5.693c-.307-.154-1.82-.9-2.102-1.002-.283-.103-.488-.154-.693.154-.205.308-.795 1.002-.974 1.205-.18.206-.359.23-.667.077-.307-.154-1.299-.48-2.476-1.531-.914-.817-1.532-1.825-1.712-2.133-.18-.308-.02-.475.134-.628.14-.137.307-.359.461-.54.154-.18.205-.308.307-.513.103-.205.051-.385-.026-.54-.077-.154-.693-1.667-.95-2.285-.25-.601-.505-.519-.693-.529-.18-.01-.385-.01-.59-.01-.205 0-.538.077-.82.385-.283.308-1.078 1.051-1.078 2.564 0 1.513 1.102 2.974 1.256 3.18.154.205 2.17 3.313 5.256 4.646.734.317 1.307.506 1.753.647.737.234 1.407.201 1.937.12.59-.09 1.82-.744 2.077-1.462.256-.718.256-1.334.18-1.462-.077-.128-.282-.205-.59-.359z"/>
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-xs font-mono text-gray-200 uppercase tracking-wider font-bold">WhatsApp Developer Hub</h4>
                            <p className="text-[10px] text-gray-500 font-mono">Contact solv@gmail.com</p>
                          </div>
                        </div>

                        {/* Direct WhatsApp Launcher */}
                        <div className="bg-black/30 p-3.5 rounded-xl border border-gray-900/60 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-extrabold text-white text-[11px] block">💬 Live Developer WhatsApp</span>
                            <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-medium animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 leading-normal">
                            Queries regarding 50/50 contracts or delivery timelines? Email <span className="text-white">solv@gmail.com</span> or launch WhatsApp.
                          </p>
                          
                          <div className="space-y-2 pt-1 font-mono">
                            <textarea
                              id="dashboard-wa-msg"
                              placeholder="Type support query here..."
                              className="w-full bg-black border border-gray-800 rounded-lg p-2 text-[11px] text-white focus:outline-none focus:border-emerald-500/50 min-h-[50px] placeholder-gray-600 resize-none"
                              rows={2}
                            />
                            <button
                              onClick={() => {
                                const textarea = document.getElementById("dashboard-wa-msg") as HTMLTextAreaElement;
                                const text = textarea?.value || "Hello Soulverse Support! I am checking your app store and need some assistance with my account.";
                                window.open(`https://wa.me/923001234567?text=${encodeURIComponent(text)}`, "_blank", "noreferrer");
                              }}
                              className="w-full bg-gray-900 hover:bg-gray-850 text-emerald-400 border border-emerald-900/30 font-mono text-xs font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              Send Message <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main Profile Tabs */}
                    <div className="md:col-span-2 space-y-6">
                      
                      {/* Active 50/50 Code Contracts and Deliveries */}
                      <div className="bg-gray-950 p-5 rounded-2xl border border-amber-950/40 space-y-4">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-500 animate-pulse" /> Active Code & UI Contracts
                          </h3>
                          <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded-full font-mono border border-amber-500/20 uppercase font-bold">50/50 Split Agreement</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          Your custom software packages currently in compilation stage. All binary compilations are delivered strictly within <strong>24 to 48 Hours</strong>. Pay half upfront, and half upon release approval.
                        </p>

                        <div className="space-y-3 font-mono">
                          {user.orders.some(o => o.status === "pending") ? (
                            user.orders.filter(o => o.status === "pending").map(o => (
                              <div key={o.id} className="bg-black/40 p-4 rounded-xl border border-gray-900 space-y-3">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                  <div>
                                    <span className="text-xs font-bold text-white block">Contract ID: {o.id}</span>
                                    <span className="text-[10px] text-gray-500">Placed on {o.date} • Secured Gateway</span>
                                  </div>
                                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 font-bold uppercase animate-pulse">
                                    ⏳ Pending Release (24-48 Hours)
                                  </span>
                                </div>

                                <div className="border-t border-gray-900 pt-2 text-xs space-y-1.5">
                                  {o.products.map(p => (
                                    <div key={p.id} className="flex justify-between text-gray-400">
                                      <span>- {p.name}</span>
                                      <span>${(p.price / 2).toFixed(2)} Paid (Downpayment)</span>
                                    </div>
                                  ))}
                                  <div className="flex justify-between text-amber-500 font-bold border-t border-gray-900/60 pt-1.5 mt-1.5">
                                    <span>Remaining Balance Due on Release (50%)</span>
                                    <span>${(o.total / 2).toFixed(2)}</span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-1">
                                  <button
                                    onClick={() => {
                                      const remaining = o.total / 2;
                                      if (user.walletBalance < remaining && o.paymentMethod === "wallet") {
                                        triggerNotification("Finalize Payment ❌", "Insufficient wallet funds. Please deposit funds first.");
                                        return;
                                      }

                                      // Update the specific order in user.orders
                                      setUser(prev => ({
                                        ...prev,
                                        walletBalance: o.paymentMethod === "wallet" ? prev.walletBalance - remaining : prev.walletBalance,
                                        orders: prev.orders.map(orderItem => {
                                          if (orderItem.id === o.id) {
                                            return { ...orderItem, status: "completed" };
                                          }
                                          return orderItem;
                                        })
                                      }));
                                      triggerNotification("Release Completed! 🚀", `Paid final 50% ($${remaining.toFixed(2)}). ZIP repository files are unlocked.`);
                                    }}
                                    className="bg-brand-600 hover:bg-brand-500 text-white text-[11px] font-bold py-2 rounded-lg transition-all"
                                  >
                                    Accept Delivery & Pay Remaining 50%
                                  </button>
                                  <a
                                    href={`mailto:solv@gmail.com?subject=Inquiry on Contract ${o.id}`}
                                    className="bg-gray-900 hover:bg-gray-850 border border-gray-800 text-gray-300 text-[11px] font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5"
                                  >
                                    Direct Email support
                                  </a>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-6 text-gray-500 text-xs">
                              No active pending delivery agreements. Add items to your cart and complete downpayment to establish a contract.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Unlocked App binaries & Downloads */}
                      <div className="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-4">
                        <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">Unlocked App binaries & Source Code</h3>
                        <p className="text-xs text-gray-500">Fully completed and delivered items. ZIP archives are available for secure CDN download below.</p>
                        
                        <div className="space-y-3 font-mono">
                          {user.orders.some(o => o.status === "completed") ? (
                            user.orders.filter(o => o.status === "completed").flatMap(o => o.products).map(p => (
                              <div key={p.id} className="bg-black/40 p-3 rounded-xl border border-gray-900 flex justify-between items-center gap-4">
                                <div>
                                  <span className="font-bold text-white text-xs block">{p.name}</span>
                                  <span className="text-[10px] text-gray-500">{p.category} • Licensed Build</span>
                                </div>
                                <button 
                                  onClick={() => triggerNotification("Download Started 📦", "Secure SSL download stream initiated for source-code.zip archive.")}
                                  className="bg-cyber-600 hover:bg-cyber-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                                >
                                  <Download className="w-3 h-3" /> Get Full Code (ZIP)
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-6 text-gray-500 text-xs">
                              No fully completed items unlocked yet. Accept delivery and release the 50% balance on active agreements to unlock download keys.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Purchase Invoices list */}
                      <div className="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-4">
                        <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">Billing History & Receipts</h3>
                        <div className="space-y-2.5 font-mono">
                          {user.orders.map(o => (
                            <div key={o.id} className="bg-black/20 p-3 rounded-xl border border-gray-900/60 flex justify-between items-center text-xs">
                              <div className="space-y-0.5">
                                <span className="font-bold text-white block">{o.invoiceNumber || ("INV-" + o.id)}</span>
                                <span className="text-[10px] text-gray-500">Date: {o.date} • Gateway: {o.paymentMethod}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-brand-400 font-bold block">${o.total.toFixed(2)}</span>
                                <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${o.status === "pending" ? "text-amber-400 bg-amber-500/10" : "text-cyber-500 bg-cyber-500/10"}`}>
                                  {o.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )
            )}

            {/* ==========================================================================
               B2. STORE SERVICES VIEW (BESPOKE Technical & Creative Services)
               ========================================================================== */}
            {storeTab === "services" && (
              <div className="space-y-8 max-w-6xl mx-auto font-sans">
                <div className="border-b border-gray-900 pb-4">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">Technical & Creative Services</h2>
                  <p className="text-xs text-gray-400 font-mono mt-1">Direct design-to-code setups, Flutter app compiling, custom AI agents, and secure database architecture managed by our expert engineering guild.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.filter(s => s.isEnabled !== false).map(srv => {
                    const price = srv.discountPrice !== undefined ? srv.discountPrice : srv.price;
                    return (
                      <div key={srv.id} className="bg-gray-950/80 border border-gray-900 rounded-3xl overflow-hidden shadow-xl flex flex-col group hover:border-brand-500/30 transition-all">
                        {/* Service Banner */}
                        <div className="relative h-40 bg-gray-900 overflow-hidden shrink-0">
                          <img 
                            src={srv.banner || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"} 
                            alt={srv.name} 
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent"></div>
                          <div className="absolute top-4 left-4 bg-black/60 p-2 rounded-xl border border-gray-800/40">
                            {srv.icon === "code" && <Code className="w-5 h-5 text-brand-400" />}
                            {srv.icon === "palette" && <Palette className="w-5 h-5 text-purple-400" />}
                            {srv.icon === "smartphone" && <Smartphone className="w-5 h-5 text-cyan-400" />}
                            {srv.icon === "database" && <Cpu className="w-5 h-5 text-amber-400" />}
                            {srv.icon === "sparkles" && <Sparkles className="w-5 h-5 text-yellow-400" />}
                            {srv.icon !== "code" && srv.icon !== "palette" && srv.icon !== "smartphone" && srv.icon !== "database" && srv.icon !== "sparkles" && (
                              <Layers className="w-5 h-5 text-brand-400" />
                            )}
                          </div>
                          <div className="absolute bottom-3 left-4">
                            <h3 className="text-base font-bold text-white tracking-tight">{srv.name}</h3>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col space-y-4">
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {srv.description}
                          </p>

                          {/* Features list */}
                          <div className="space-y-2 flex-1">
                            <strong className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Deliverables</strong>
                            {srv.features.map((feat, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                                <Check className="w-3.5 h-3.5 text-cyber-500 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Price Display */}
                          <div className="border-t border-gray-900 pt-4 flex justify-between items-center shrink-0">
                            <div>
                              <span className="text-[9px] text-gray-500 font-mono block uppercase">Package Cost</span>
                              <div className="flex items-baseline gap-1.5 font-mono">
                                <span className="text-lg font-extrabold text-white">${price.toFixed(2)}</span>
                                {srv.discountPrice !== undefined && srv.price > srv.discountPrice && (
                                  <span className="text-xs text-gray-600 line-through">${srv.price.toFixed(2)}</span>
                                )}
                              </div>
                            </div>

                            {/* Service Badges */}
                            <span className="text-[9px] font-mono uppercase font-bold text-cyber-500 bg-cyber-500/10 px-2 py-0.5 rounded border border-cyber-500/20">
                              SSL Secure Build
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="space-y-2 pt-1 shrink-0">
                            {srv.showOrderButton && (
                              <button
                                onClick={() => {
                                  // Map custom service order into product schema on-the-fly
                                  const mockProd: Product = {
                                    id: `srv-order-${srv.id}`,
                                    name: `${srv.name} (Service Booking)`,
                                    tagline: `Official specialized design-to-code project tier`,
                                    category: Category.Apps,
                                    subcategory: "Bespoke Service",
                                    description: srv.description,
                                    features: srv.features,
                                    version: "v1.0.0 Custom Order",
                                    developer: "Soulverse Official Agency",
                                    price: srv.price,
                                    discountPrice: srv.discountPrice,
                                    rating: 5.0,
                                    reviewsCount: 1,
                                    image: srv.banner || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
                                    screenshots: [],
                                    downloadCount: 0,
                                    tags: ["service", srv.id]
                                  };
                                  addToCart(mockProd);
                                  setSelectedProduct(null);
                                  setShowCartPopover(true);
                                }}
                                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer text-center"
                              >
                                Order Service Package
                              </button>
                            )}

                            {srv.showWhatsAppButton && whatsAppConfig.isChatEnabled && (
                              <a
                                href={`https://wa.me/${whatsAppConfig.chatLink}?text=${encodeURIComponent(`Hi! I am interested in your bespoke service: "${srv.name}". Let me know your current project slots.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-900/40 hover:border-emerald-800/60 text-emerald-400 hover:text-emerald-300 font-mono text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                              >
                                WhatsApp Expert Chat <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {srv.showInquiryForm && (
                              <div className="bg-black/30 border border-gray-900 rounded-xl p-3 space-y-2 mt-2">
                                <span className="text-[10px] font-mono text-gray-500 uppercase block">Submit Custom Brief</span>
                                <textarea
                                  id={`brief-${srv.id}`}
                                  rows={2}
                                  placeholder="E.g., build me a 5-screen store app..."
                                  className="w-full bg-black/60 border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none placeholder-gray-700"
                                />
                                <button
                                  onClick={() => {
                                    const briefEl = document.getElementById(`brief-${srv.id}`) as HTMLTextAreaElement;
                                    if (briefEl && briefEl.value.trim()) {
                                      // Create dynamic support ticket for this service inquiry!
                                      const newTicket: SupportTicket = {
                                        id: "TCK-" + Math.floor(100 + Math.random() * 900),
                                        userEmail: user.email,
                                        subject: `Inquiry: ${srv.name}`,
                                        message: `Client Brief: ${briefEl.value.trim()}`,
                                        category: "technical",
                                        status: "open",
                                        date: new Date().toISOString().split('T')[0],
                                        replies: []
                                      };
                                      setSupportTickets(prev => [newTicket, ...prev]);
                                      briefEl.value = "";
                                      triggerNotification("Brief Submitted! 🚀", `Your custom brief for ${srv.name} is uploaded to helpdesk ticket ${newTicket.id}.`);
                                    } else {
                                      triggerNotification("Validation Error", "Please type a project brief first!");
                                    }
                                  }}
                                  className="w-full bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 font-mono text-[10px] py-1.5 rounded-lg transition-all cursor-pointer"
                                >
                                  Submit Inquiry Brief
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==========================================================================
               B3. STORE PRICING TAB (VIP MEMBERSHIP COMPARATIVE SCHEMES)
               ========================================================================== */}
            {storeTab === "pricing" && (
              <div className="space-y-8 max-w-5xl mx-auto font-sans">
                <div className="border-b border-gray-900 pb-4 text-center max-w-xl mx-auto">
                  <span className="text-xs font-mono text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/25 uppercase font-bold tracking-widest">
                    Subscription Plans
                  </span>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2.5 leading-tight">Ecosystem License Packages</h2>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">Unlock complete source code repository streams, unlimited Canva-like digital layouts, expert prompt setups, and instant APK downloads.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {/* Starter Tier */}
                  <div className="bg-gray-950/80 border border-gray-900 rounded-3xl p-6 space-y-6 flex flex-col relative">
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white tracking-tight">Ecosystem Starter</h4>
                      <p className="text-xs text-gray-400">Perfect for single developers or hobbyists exploring dynamic nodes.</p>
                    </div>

                    <div className="font-mono flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white">$49.00</span>
                      <span className="text-xs text-gray-500">/ month</span>
                    </div>

                    <div className="border-t border-gray-900/60 pt-4 flex-1 space-y-3 text-xs text-gray-300">
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                        <span>Access up to 5 Official App binaries</span>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                        <span>Download 3 premium templates per month</span>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                        <span>Basic technical support access tickets</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const mockPlan: Product = {
                          id: "sub-starter",
                          name: "Starter Membership (Monthly)",
                          tagline: "Explore dynamic application files",
                          category: Category.PremiumMemberships,
                          subcategory: "Plan Sub",
                          description: "Basic developer access subscription pass.",
                          features: ["5 App Binaries", "3 templates/month", "Standard helpdesk"],
                          version: "v1.0",
                          developer: "Soulverse VIP Club",
                          price: 49.00,
                          rating: 5.0,
                          reviewsCount: 1,
                          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
                          screenshots: [],
                          downloadCount: 0,
                          tags: ["plan", "monthly"]
                        };
                        addToCart(mockPlan);
                        setShowCartPopover(true);
                      }}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white border border-gray-800 font-mono text-xs font-bold py-3 rounded-xl transition-all cursor-pointer text-center shrink-0"
                    >
                      Subscribe Starter Plan
                    </button>
                  </div>

                  {/* Pro VIP Tier */}
                  <div className="bg-brand-950/20 border-2 border-brand-500 rounded-3xl p-6 space-y-6 flex flex-col relative shadow-xl shadow-brand-500/5">
                    <span className="absolute -top-3.5 right-6 bg-brand-600 text-white text-[9px] font-mono font-bold tracking-wider px-3 py-1 rounded-full border border-brand-400">
                      BEST VALUE CHOICE
                    </span>

                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white tracking-tight">Studio Professional</h4>
                      <p className="text-xs text-gray-400">The complete developer toolkit for creators, teams, and active sellers.</p>
                    </div>

                    <div className="font-mono flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-brand-400">$99.00</span>
                      <span className="text-xs text-gray-500">/ month</span>
                    </div>

                    <div className="border-t border-brand-900/40 pt-4 flex-1 space-y-3 text-xs text-gray-200">
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-cyber-500 shrink-0 mt-0.5" />
                        <span><strong>UNLIMITED</strong> Official App & APK downloads</span>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-cyber-500 shrink-0 mt-0.5" />
                        <span>Unlimited UI Kits, templates, & AI prompts</span>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-cyber-500 shrink-0 mt-0.5" />
                        <span>Priority 24/7 technical chat support</span>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-cyber-500 shrink-0 mt-0.5" />
                        <span>Verified "Ecosystem Seller" status option</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const mockPlan: Product = {
                          id: "sub-pro",
                          name: "Studio Professional Pass (Monthly)",
                          tagline: "Uncapped template, code, and app access",
                          category: Category.PremiumMemberships,
                          subcategory: "Plan Sub",
                          description: "Professional level VIP membership credentials.",
                          features: ["Unlimited App Files", "Unlimited UI Kits & Prompts", "Priority Helpdesk Support", "Seller Privilege"],
                          version: "v2.0",
                          developer: "Soulverse VIP Club",
                          price: 99.00,
                          rating: 5.0,
                          reviewsCount: 1,
                          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
                          screenshots: [],
                          downloadCount: 0,
                          tags: ["plan", "monthly", "pro"]
                        };
                        addToCart(mockPlan);
                        setShowCartPopover(true);
                      }}
                      className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all cursor-pointer text-center shrink-0 shadow-lg shadow-brand-500/20"
                    >
                      Subscribe Pro Plan
                    </button>
                  </div>

                  {/* Enterprise Custom Agency Tier */}
                  <div className="bg-gray-950/80 border border-gray-900 rounded-3xl p-6 space-y-6 flex flex-col relative">
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white tracking-tight">Enterprise/Agency Suite</h4>
                      <p className="text-xs text-gray-400">For enterprise organizations needing custom Flutter/SSL infrastructure builds.</p>
                    </div>

                    <div className="font-mono flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white">$299.00</span>
                      <span className="text-xs text-gray-500">/ month</span>
                    </div>

                    <div className="border-t border-gray-900/60 pt-4 flex-1 space-y-3 text-xs text-gray-300">
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                        <span>Everything in Studio Professional level</span>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                        <span>Custom database replication configuration</span>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                        <span>24 hours SLA engineer dedicated support</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const mockPlan: Product = {
                          id: "sub-enterprise",
                          name: "Enterprise Agency Pass (Monthly)",
                          tagline: "Enterprise database scaling & Flutter compile nodes",
                          category: Category.PremiumMemberships,
                          subcategory: "Plan Sub",
                          description: "Enterprise tier VIP membership pass.",
                          features: ["Full Agency Features", "Database Replication Setup", "24hr SLA Eng Support"],
                          version: "v3.0",
                          developer: "Soulverse VIP Club",
                          price: 299.00,
                          rating: 5.0,
                          reviewsCount: 1,
                          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
                          screenshots: [],
                          downloadCount: 0,
                          tags: ["plan", "monthly", "enterprise"]
                        };
                        addToCart(mockPlan);
                        setShowCartPopover(true);
                      }}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white border border-gray-800 font-mono text-xs font-bold py-3 rounded-xl transition-all cursor-pointer text-center shrink-0"
                    >
                      Subscribe Enterprise Plan
                    </button>
                  </div>
                </div>

                {/* SPECIAL: Lifetime Pass Card */}
                <div className="bg-gradient-to-tr from-[#0a0a0c] via-brand-950/10 to-[#101015] border border-brand-500/20 p-8 rounded-3xl mt-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group hover:border-brand-500/40 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/5 rounded-full blur-[90px] pointer-events-none group-hover:scale-110 transition-all"></div>
                  <div className="space-y-3 max-w-xl">
                    <span className="text-[10px] font-mono text-brand-400 uppercase tracking-widest font-extrabold flex items-center gap-1.5 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-full w-fit">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" /> Soulverse Prestige Tier
                    </span>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight leading-tight">Lifetime Ecosystem Access Pass</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Make a one-time contribution. Secure perpetual access to every single present and future digital asset, official app binary, source-code build, and live server dashboard template we ever deploy, with no ongoing licensing fees.
                    </p>
                  </div>

                  <div className="text-center font-mono space-y-3 shrink-0">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase block">One-Time Fee</span>
                      <span className="text-3xl font-extrabold text-brand-400">$999.00</span>
                    </div>
                    <button
                      onClick={() => {
                        const mockPlan: Product = {
                          id: "lifetime-vip",
                          name: "Lifetime Access Pass (VIP)",
                          tagline: "Perpetual licensing access to every single asset",
                          category: Category.PremiumMemberships,
                          subcategory: "VIP Life",
                          description: "Elite prestige level one-time membership pass.",
                          features: ["Lifetime apps access", "Lifetime templates access", "Lifetime agency hours", "Immediate Support channel"],
                          version: "v1.0",
                          developer: "Soulverse Executive Club",
                          price: 999.00,
                          rating: 5.0,
                          reviewsCount: 1,
                          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
                          screenshots: [],
                          downloadCount: 12,
                          tags: ["plan", "lifetime", "vip"]
                        };
                        addToCart(mockPlan);
                        setShowCartPopover(true);
                      }}
                      className="bg-white hover:bg-gray-100 text-black font-mono text-xs font-bold px-6 py-3 rounded-2xl transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      Acquire Lifetime Pass <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================================================
               B4. STORE CONTACT & HELP TICKET DESK VIEW
               ========================================================================== */}
            {storeTab === "contact" && (
              <div className="space-y-8 max-w-5xl mx-auto font-sans">
                <div className="border-b border-gray-900 pb-4">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">Contact & Helpdesk Support</h2>
                  <p className="text-xs text-gray-400 font-mono mt-1">Submit technical tickets, corporate bulk licensing briefs, or sync with our live WhatsApp communication nodes instantly.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left column: Ticket submit form */}
                  <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">Open Support Request</h4>
                      <p className="text-[11px] text-gray-500 font-mono">Our live administration panel processes requests instantly.</p>
                    </div>

                    <form onSubmit={submitTicket} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 mb-1.5">Query Topic / Category</label>
                        <select
                          value={ticketCategory}
                          onChange={(e: any) => setTicketCategory(e.target.value)}
                          className="w-full bg-black border border-gray-800 rounded-xl p-3 text-white focus:outline-none"
                        >
                          <option value="technical">Technical Assistance (App Bugs / Builds)</option>
                          <option value="billing">Billing & Purchases (Invoice issues)</option>
                          <option value="seller">Seller & Affiliate onboarding inquiries</option>
                          <option value="other">General Corporate Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 mb-1.5">Subject Heading</label>
                        <input
                          type="text"
                          required
                          value={ticketSubject}
                          onChange={(e) => setTicketSubject(e.target.value)}
                          placeholder="Short summary of issue..."
                          className="w-full bg-black border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-gray-400 mb-1.5">Detailed Description</label>
                        <textarea
                          required
                          rows={4}
                          value={ticketMessage}
                          onChange={(e) => setTicketMessage(e.target.value)}
                          placeholder="Provide error logs, environment setups, or detailed requests..."
                          className="w-full bg-black border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-brand-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/15"
                      >
                        <Send className="w-4 h-4" /> Dispatch Support Ticket
                      </button>
                    </form>
                  </div>

                  {/* Right column: WhatsApp Channel Info & live tickets listing */}
                  <div className="space-y-6">
                    {/* Live WhatsApp Syncing card */}
                    <div className="bg-emerald-950/10 border border-emerald-900/30 p-6 rounded-3xl space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-extrabold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> WhatsApp Support
                        </span>
                        <span className="text-xs text-gray-500 font-mono">Synced Live</span>
                      </div>

                      <h4 className="text-base font-bold text-white tracking-tight leading-snug">Instant WhatsApp Direct Support Link</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Prefer instant chats? Connect to our verified WhatsApp nodes directly without email waits.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {whatsAppConfig.isChannelEnabled && (
                          <a
                            href={whatsAppConfig.channelLink}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold py-2.5 px-4 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Broadcast Channel <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {whatsAppConfig.isChatEnabled && (
                          <a
                            href={`https://wa.me/${whatsAppConfig.chatLink}?text=${encodeURIComponent(whatsAppConfig.chatMessage)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-black text-emerald-400 hover:text-emerald-300 border border-emerald-900/30 font-mono text-xs font-bold py-2.5 px-4 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Support Live Chat <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Live active customer tickets history (showing real-time submission results!) */}
                    <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Your Raised Tickets ({supportTickets.length})</h4>
                        <p className="text-[10px] text-gray-500">Updates sync dynamically in the Master Admin panel helpdesk.</p>
                      </div>

                      <div className="space-y-3 max-h-[220px] overflow-y-auto scrollbar-none pr-1">
                        {supportTickets.map(t => (
                          <div key={t.id} className="bg-black/30 p-3 rounded-xl border border-gray-900 space-y-2 text-xs">
                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className="font-bold text-gray-300">{t.id}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold border ${
                                t.status === "resolved" 
                                  ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                                  : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                              }`}>
                                {t.status}
                              </span>
                            </div>
                            <div>
                              <strong className="text-white block text-xs">{t.subject}</strong>
                              <p className="text-gray-400 italic text-[11px] mt-1">"{t.message}"</p>
                            </div>

                            {t.replies.length > 0 && (
                              <div className="border-t border-gray-900 pt-2 mt-2 space-y-1 bg-brand-950/10 p-2 rounded-lg border border-brand-900/30">
                                <span className="text-[9px] text-brand-400 font-mono font-bold block">SUPPORT AGENT RESPONSE:</span>
                                {t.replies.map((rep, idx) => (
                                  <p key={idx} className="text-[11px] text-gray-300">"{rep.message}"</p>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================================================
               C. SELLER HUB & PRODUCT VERIFICATION ENGINE
               ========================================================================== */}
            {storeTab === "seller-hub" && (
              <div className="space-y-8 max-w-5xl mx-auto">
                <div className="border-b border-gray-900 pb-4 flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Soulverse Seller Hub</h2>
                    <p className="text-xs text-gray-500">Upload templates, prompt kits, or codebases. Keep 85% of each checkout sale.</p>
                  </div>
                  <span className="bg-cyber-500/10 text-cyber-400 px-3 py-1 rounded text-xs font-mono font-bold border border-cyber-500/20">
                    Sellers Status: FUTURE READY (Active)
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Seller stats & withdrawal */}
                  <div className="space-y-6">
                    <div className="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-4">
                      <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">Seller Dashboard Metrics</h4>
                      <div className="grid grid-cols-2 gap-3 font-mono text-center">
                        <div className="bg-black/40 p-3 rounded-xl border border-gray-900">
                          <span className="text-[9px] text-gray-500">Gross Sales</span>
                          <span className="text-base font-extrabold text-white block">$580.00</span>
                        </div>
                        <div className="bg-black/40 p-3 rounded-xl border border-gray-900">
                          <span className="text-[9px] text-gray-500">Net Profit</span>
                          <span className="text-base font-extrabold text-cyber-500 block">$493.00</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => triggerNotification("Withdrawal Processed", "Withdrawal request of $493 processed! Direct payout sent to EasyPaisa wallet.")}
                        className="w-full bg-cyber-600 hover:bg-cyber-500 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all"
                      >
                        Request Cash Withdrawal
                      </button>
                    </div>

                    <div className="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-3 text-xs">
                      <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">Commission Policy</h4>
                      <p className="text-gray-400 leading-relaxed">
                        We charge a simple flat <strong>15% commission</strong> to maintain microservice clusters, Edge CDN distributions, and payment processing fees.
                      </p>
                      <div className="border-t border-gray-900 pt-2 text-[11px] text-gray-500 font-mono">
                        Support Ticket response rate: ~12 min
                      </div>
                    </div>
                  </div>

                  {/* Upload product form */}
                  <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={submitProductForApproval} className="bg-gray-950 p-6 rounded-2xl border border-gray-900 space-y-4">
                      <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">Distribute New Digital Asset</h3>
                      <p className="text-xs text-gray-500">Fill out metadata details. Once submitted, our admins can verify and approve it in real-time, instantly listing it live on the marketplace grid!</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-gray-500 mb-1">Product Title</label>
                          <input 
                            type="text" 
                            required
                            value={newProdName}
                            onChange={e => setNewProdName(e.target.value)}
                            placeholder="e.g. ChatGPT Blog Writer Pack"
                            className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-brand-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-gray-500 mb-1">Target Price ($ USD)</label>
                          <input 
                            type="number" 
                            required
                            step="0.01"
                            value={newProdPrice}
                            onChange={e => setNewProdPrice(e.target.value)}
                            placeholder="e.g. 19.00"
                            className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-brand-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-gray-500 mb-1">Marketplace Category</label>
                          <select
                            value={newProdCategory}
                            onChange={e => setNewProdCategory(e.target.value as Category)}
                            className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                          >
                            {Object.values(Category).map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-gray-500 mb-1">Brief Catchy Tagline</label>
                          <input 
                            type="text" 
                            value={newProdTagline}
                            onChange={e => setNewProdTagline(e.target.value)}
                            placeholder="e.g. 300+ prompt templates for SEO bloggers"
                            className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white placeholder-gray-700 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-gray-500 mb-1">Detailed Description</label>
                        <textarea 
                          rows={3}
                          value={newProdDesc}
                          onChange={e => setNewProdDesc(e.target.value)}
                          placeholder="Provide a comprehensive summary of product benefits..."
                          className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-xs text-white placeholder-gray-700 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-gray-500 mb-1">Product Features (comma separated)</label>
                        <input 
                          type="text" 
                          value={newProdFeatures}
                          onChange={e => setNewProdFeatures(e.target.value)}
                          placeholder="Fully responsive, Includes source codes, Free lifetime updates"
                          className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white placeholder-gray-700 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all"
                      >
                        Submit Asset to Approval Queue
                      </button>
                    </form>

                    {/* Pending uploads queue */}
                    {sellerUploads.length > 0 && (
                      <div className="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-3">
                        <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">Your Pending Verifications ({sellerUploads.length})</h4>
                        <div className="space-y-2">
                          {sellerUploads.map(up => (
                            <div key={up.id} className="bg-black/40 p-3 rounded-xl border border-gray-900 flex justify-between items-center text-xs">
                              <div>
                                <span className="font-bold text-white block">{up.name}</span>
                                <span className="text-[10px] text-gray-500 font-mono">${up.price.toFixed(2)} • {up.category}</span>
                              </div>
                              <span className="text-[9px] uppercase font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 animate-pulse">
                                Under Review
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            )}

          </div>
        ) : activeSubdomain.id === "blog" ? (
          /* ==========================================================================
             B. BLOG.SOULVERSEAPPS.COM OFFICIAL TECH BLOG
             ========================================================================== */
          <div className="space-y-10 max-w-4xl mx-auto">
            <div className="text-center space-y-3 border-b border-gray-900 pb-6">
              <span className="bg-brand-500/10 text-brand-400 px-3 py-1 rounded-full text-xs font-mono font-bold border border-brand-500/25">
                SUBDOMAIN // blog.soulverseapps.com
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Soulverse Tech & Creative Blog
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
                Step-by-step low-latency encoding guides, AI voice makharij systems, and structural system updates.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {blogs.map(blog => (
                <div 
                  key={blog.id}
                  className="bg-gray-950/80 rounded-3xl overflow-hidden border border-gray-900 p-6 sm:p-8 flex flex-col md:flex-row gap-6 hover:border-gray-800 transition-all"
                >
                  <div className="md:w-1/3 aspect-video md:aspect-square bg-gray-900 rounded-2xl overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover opacity-75" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 text-[10px] font-mono text-gray-500">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                        <span>•</span>
                        <span className="text-brand-400 font-bold">{blog.author}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug hover:text-brand-400 transition-all cursor-pointer">
                        {blog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-900 pt-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {blog.tags.map((t, idx) => (
                          <span key={idx} className="bg-gray-900 text-gray-400 font-mono text-[9px] px-2 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => triggerNotification("Reading Mode", `Reading view for "${blog.title}" simulated successfully.`)}
                        className="text-brand-400 hover:text-brand-300 font-mono text-xs font-bold flex items-center gap-1 group"
                      >
                        Read Article <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeSubdomain.id === "support" ? (
          /* ==========================================================================
             C. SUPPORT.SOULVERSEAPPS.COM HELP & SUPPORT DESK
             ========================================================================== */
          <div className="space-y-10 max-w-4xl mx-auto">
            <div className="text-center space-y-2 border-b border-gray-900 pb-6">
              <span className="bg-brand-500/10 text-brand-400 px-3 py-1 rounded-full text-xs font-mono font-bold border border-brand-500/25">
                SUBDOMAIN // support.soulverseapps.com
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                Soulverse Help & Support Center
              </h2>
              <p className="text-xs text-gray-400 max-w-lg mx-auto">
                Submit help tickets directly to our engineering team. Keep track of resolving statuses in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Submission Form */}
              <div className="md:col-span-1">
                <form onSubmit={submitTicket} className="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-4">
                  <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">Raise New Ticket</h4>
                  
                  <div>
                    <label className="block text-[11px] font-mono text-gray-500 mb-1">Ticket Subject</label>
                    <input 
                      type="text" 
                      required
                      value={ticketSubject}
                      onChange={e => setTicketSubject(e.target.value)}
                      placeholder="Brief title of the issue"
                      className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-gray-500 mb-1">Issue Category</label>
                    <select
                      value={ticketCategory}
                      onChange={e => setTicketCategory(e.target.value as any)}
                      className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                    >
                      <option value="technical">Technical Ingestion</option>
                      <option value="billing">Payment & Checkout</option>
                      <option value="seller">Seller Application</option>
                      <option value="other">General Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-gray-500 mb-1">Detailed Explanation</label>
                    <textarea 
                      rows={4}
                      required
                      value={ticketMessage}
                      onChange={e => setTicketMessage(e.target.value)}
                      placeholder="Describe OBS settings, device models, or invoice IDs..."
                      className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-2.5 rounded-xl transition-all"
                  >
                    Submit Support Ticket
                  </button>
                </form>
              </div>

              {/* Tickets List */}
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">Your Active Support Tickets ({supportTickets.length})</h4>
                
                <div className="space-y-4">
                  {supportTickets.map(ticket => (
                    <div key={ticket.id} className="bg-gray-950 p-5 rounded-2xl border border-gray-900 space-y-3 text-xs">
                      <div className="flex justify-between items-center border-b border-gray-900 pb-2">
                        <div>
                          <strong className="text-white block font-sans text-sm">{ticket.subject}</strong>
                          <span className="text-[10px] text-gray-500 font-mono">ID: {ticket.id} • Registered to {ticket.userEmail}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          ticket.status === "open" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                          ticket.status === "in-progress" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                          "bg-cyber-500/10 text-cyber-500 border border-cyber-500/20"
                        }`}>
                          {ticket.status}
                        </span>
                      </div>

                      <div className="bg-black/20 p-3 rounded-lg border border-gray-900/60">
                        <span className="text-[10px] text-brand-400 font-mono block mb-1">Your query:</span>
                        <p className="text-gray-300 leading-normal font-medium">{ticket.message}</p>
                      </div>

                      {/* Ticket Replies block */}
                      {ticket.replies.map((reply, index) => (
                        <div key={index} className="bg-brand-950/20 p-3 rounded-lg border border-brand-900/25 ml-4">
                          <div className="flex justify-between items-center mb-1 text-[10px] font-mono">
                            <span className="font-bold text-brand-400">🎙️ Helpdesk Agent ({reply.sender})</span>
                            <span className="text-gray-500">{reply.date}</span>
                          </div>
                          <p className="text-gray-300 leading-normal italic">"{reply.message}"</p>
                        </div>
                      ))}

                      {ticket.replies.length === 0 && (
                        <p className="text-[10px] text-gray-500 italic pl-1">Awaiting review from our technical response operators...</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : activeSubdomain.id === "admin" ? (
          /* ==========================================================================
             D. MASTER ADMIN PANEL — DYNAMIC MULTI-MODULE OPERATIONS CONSOLE (WITH RBAC ENFORCEMENT)
             ========================================================================== */
          !isLoggedIn ? (
            <div className="max-w-md mx-auto py-12 px-4 space-y-6 font-sans">
              <div className="bg-gray-950 p-8 rounded-3xl border border-gray-900 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-500/5 via-transparent to-transparent opacity-60"></div>
                <div className="w-16 h-16 bg-brand-500/10 border border-brand-500/30 rounded-2xl flex items-center justify-center mx-auto text-brand-400 relative z-10">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-2 text-center relative z-10">
                  <h3 className="text-xl font-bold text-white tracking-tight">Ecosystem Administrative Lock</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Enter enterprise administrative credentials to access the Soulverse Apps core network.
                  </p>
                </div>

                <form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    const email = (document.getElementById("admin-login-email") as HTMLInputElement).value;
                    const pass = (document.getElementById("admin-login-pass") as HTMLInputElement).value;
                    const role = (document.getElementById("admin-login-role") as HTMLSelectElement).value;
                    
                    const authorizedEmails = [
                      "solv@gmail.com",
                      "soulversepk@gmail.com",
                      "admin@soulverseapps.com",
                      "manager@soulverseapps.com",
                      "support@soulverseapps.com"
                    ];

                    if (authorizedEmails.includes(email.toLowerCase())) {
                      const newUserObj: UserType = {
                        id: "usr-admin",
                        name: `Ecosystem ${role}`,
                        email,
                        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                        walletBalance: 9999.00,
                        role: role as any,
                        isPremium: true,
                        referralCode: "ADM99X",
                        referralsCount: 152,
                        earnings: 1485.00,
                        wishlist: [],
                        orders: []
                      };
                      setUser(newUserObj);
                      setIsLoggedIn(true);
                      localStorage.setItem("sv_is_logged_in", "true");
                      localStorage.setItem("sv_user", JSON.stringify(newUserObj));
                      triggerNotification("Console Authenticated 🚀", `${role} session loaded successfully.`);
                    } else {
                      triggerNotification("Authentication Failed ❌", "Invalid enterprise administrator email or cipher key mismatch.");
                    }
                  }}
                  className="space-y-4 relative z-10"
                >
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 mb-1">Administrative Email</label>
                    <input
                      id="admin-login-email"
                      type="email"
                      required
                      placeholder="e.g. solv@gmail.com"
                      className="w-full bg-black border border-gray-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500 transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 mb-1">Security Cipher Key (Password)</label>
                    <input
                      id="admin-login-pass"
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full bg-black border border-gray-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500 transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 mb-1">Select Administrative Role</label>
                    <select
                      id="admin-login-role"
                      className="w-full bg-black border border-gray-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-500 transition-all font-mono"
                    >
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Support">Support Operator</option>
                      <option value="Finance">Finance Auditor</option>
                      <option value="Moderator">Ecosystem Moderator</option>
                      <option value="Content Manager">Content Manager</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all shadow-lg shadow-brand-500/15 cursor-pointer text-center"
                  >
                    Authorize Administrator Login
                  </button>
                </form>

                <div className="text-[10px] text-center text-gray-600 font-mono border-t border-gray-900 pt-4 mt-2">
                  System Authorized for: <span className="text-brand-400">solv@gmail.com</span>
                </div>
              </div>
            </div>
          ) : !["Super Admin", "Admin", "Manager", "Support", "Finance", "Moderator", "Content Manager"].includes(user.role) ? (
            <div className="max-w-md mx-auto text-center py-16 space-y-6 font-sans">
              <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-rose-500/5">
                <ShieldAlert className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">Access Control Triggered</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-mono">
                  Your current account privilege level (<span className="text-rose-400 font-bold">{user.role}</span>) does not possess sufficient clearance keys to access telemetry subdomains.
                </p>
              </div>

              {/* Developer simulator helper option to elevate on-the-fly */}
              {!isProductionMode && (
                <div className="bg-gray-950 p-4 rounded-2xl border border-gray-900 space-y-3">
                  <span className="text-[10px] text-gray-400 font-mono block uppercase">Ecosystem Simulator Tool</span>
                  <p className="text-[11px] text-gray-500">Elevate your simulated session privilege below to unlock and test all administrative control tabs.</p>
                  <button
                    onClick={() => {
                      setUser(prev => ({ ...prev, role: "Super Admin" }));
                      triggerNotification("Simulator Elevate Successful", "Simulated privilege set to Super Admin.");
                    }}
                    className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-[11px] font-bold py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Elevate to Super Admin
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8 max-w-7xl mx-auto font-sans pb-12">
            
            {/* Admin Header Branding & Role Swapper */}
            <div className="border-b border-gray-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5 tracking-tight">
                  <ShieldCheck className="w-6 h-6 text-brand-500" /> Master Admin Operations Control
                </h2>
                <p className="text-xs text-gray-500 font-mono mt-1">Direct database management, pricing multipliers, verified media library, WhatsApp support, and live telemetry control.</p>
              </div>

              {/* Role Quick Swapper for Testing privileges */}
              {!isProductionMode ? (
                <div className="bg-gray-950 p-3 rounded-2xl border border-gray-900 flex items-center gap-3">
                  <div>
                    <span className="text-[9px] text-gray-500 font-mono block uppercase">Active Simulator Privilege</span>
                    <select
                      value={user.role}
                      onChange={(e: any) => {
                        const newRole = e.target.value;
                        setUser(prev => ({ ...prev, role: newRole as any }));
                        triggerNotification("Simulator Role Changed", `Ecosystem simulation privilege adjusted to: ${newRole}.`);
                      }}
                      className="bg-black text-brand-400 font-mono text-[11px] font-bold py-1 px-2.5 rounded-lg border border-gray-800 focus:outline-none"
                    >
                      <option value="Super Admin">Super Admin (All Privileges)</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Support">Support</option>
                      <option value="Finance">Finance</option>
                      <option value="Moderator">Moderator</option>
                      <option value="Content Manager">Content Manager</option>
                      <option value="Seller">Seller / Vendor</option>
                      <option value="Customer">Customer Account</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    Live Sync
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  Active Node Session: <span className="text-white font-bold ml-1">{user.role}</span>
                </div>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-center font-mono text-xs">
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-900">
                <span className="text-[10px] text-gray-500 block uppercase">Total Products</span>
                <span className="text-base font-extrabold text-white mt-1 block">{products.length} Items</span>
              </div>
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-900">
                <span className="text-[10px] text-gray-500 block uppercase">Custom Services</span>
                <span className="text-base font-extrabold text-brand-400 mt-1 block">{services.length} Live</span>
              </div>
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-900">
                <span className="text-[10px] text-gray-500 block uppercase">Media Assets</span>
                <span className="text-base font-extrabold text-purple-400 mt-1 block">{mediaLibrary.length} Files</span>
              </div>
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-900">
                <span className="text-[10px] text-gray-500 block uppercase">Coupons</span>
                <span className="text-base font-extrabold text-cyan-400 mt-1 block">{coupons.length} Active</span>
              </div>
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-900">
                <span className="text-[10px] text-gray-500 block uppercase">Unsolved Tickets</span>
                <span className="text-base font-extrabold text-amber-500 mt-1 block">
                  {supportTickets.filter(t => t.status !== "resolved").length} Open
                </span>
              </div>
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-900">
                <span className="text-[10px] text-gray-500 block uppercase">Gross Revenue</span>
                <span className="text-base font-extrabold text-emerald-500 mt-1 block">$18,485.00</span>
              </div>
            </div>

            {/* Admin Sub-Tabs Navigation (12 Module Control) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-gray-900 scrollbar-none">
              <button
                onClick={() => setAdminTab("dashboard")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  adminTab === "dashboard" ? "bg-brand-600 text-white" : "bg-gray-950 text-gray-400 border border-gray-900 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Approvals & Overview
              </button>
              <button
                onClick={() => setAdminTab("apps")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  adminTab === "apps" ? "bg-brand-600 text-white" : "bg-gray-950 text-gray-400 border border-gray-900 hover:text-white"
                }`}
              >
                <Code className="w-3.5 h-3.5" /> Official Apps CRUD
              </button>
              <button
                onClick={() => setAdminTab("services")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  adminTab === "services" ? "bg-brand-600 text-white" : "bg-gray-950 text-gray-400 border border-gray-900 hover:text-white"
                }`}
              >
                <Settings className="w-3.5 h-3.5" /> Services CRUD
              </button>
              <button
                onClick={() => setAdminTab("pricing")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  adminTab === "pricing" ? "bg-brand-600 text-white" : "bg-gray-950 text-gray-400 border border-gray-900 hover:text-white"
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" /> Dynamic Pricing
              </button>
              <button
                onClick={() => setAdminTab("whatsapp")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  adminTab === "whatsapp" ? "bg-brand-600 text-white" : "bg-gray-950 text-gray-400 border border-gray-900 hover:text-white"
                }`}
              >
                <Compass className="w-3.5 h-3.5" /> WhatsApp Control Panel
              </button>
              <button
                onClick={() => setAdminTab("media")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  adminTab === "media" ? "bg-brand-600 text-white" : "bg-gray-950 text-gray-400 border border-gray-900 hover:text-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5" /> Media Library
              </button>
              <button
                onClick={() => setAdminTab("coupons")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  adminTab === "coupons" ? "bg-brand-600 text-white" : "bg-gray-950 text-gray-400 border border-gray-900 hover:text-white"
                }`}
              >
                <Gift className="w-3.5 h-3.5" /> Coupons & Promos
              </button>
              <button
                onClick={() => setAdminTab("tickets")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  adminTab === "tickets" ? "bg-brand-600 text-white" : "bg-gray-950 text-gray-400 border border-gray-900 hover:text-white"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" /> Helpdesk Tickets
              </button>
            </div>

            {/* MODULE 1: APPROVALS & REVENUE OVERVIEW */}
            {adminTab === "dashboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product approval list */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">Seller Product Approvals Queue</h3>
                      <p className="text-xs text-gray-500 mt-1">Review, reject, or approve digital templates or APK binaries submitted by merchant sellers.</p>
                    </div>

                    <div className="space-y-3">
                      {sellerUploads.length > 0 ? (
                        sellerUploads.map(up => (
                          <div key={up.id} className="bg-black/40 p-4 rounded-xl border border-gray-900 space-y-2">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <strong className="text-white text-sm block">{up.name}</strong>
                                <span className="text-[10px] text-gray-500 font-mono">Category: {up.category} • Proposed Price: ${up.price.toFixed(2)} • By: {up.developer}</span>
                              </div>
                              <button
                                onClick={() => approveSellerProduct(up.id)}
                                className="bg-brand-600 hover:bg-brand-500 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all"
                              >
                                Approve & Publish
                              </button>
                            </div>
                            <p className="text-xs text-gray-400 italic">"{up.tagline}"</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 italic py-6 text-center font-mono">
                          Merchant approvals queue is fully processed.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Simulated Telemetry Logs */}
                <div className="space-y-6">
                  <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 space-y-4 font-mono text-xs">
                    <h3 className="text-xs font-extrabold uppercase text-gray-400 tracking-wider">Telemetry Diagnostics</h3>
                    <div className="bg-black/60 p-4 rounded-xl border border-gray-900 space-y-2 text-gray-500 text-[11px] max-h-[300px] overflow-y-auto">
                      <p><span className="text-emerald-500">[OK]</span> DB Replication Tunnel initialized</p>
                      <p><span className="text-emerald-500">[OK]</span> SSL certificates valid until Dec 2026</p>
                      <p><span className="text-emerald-500">[OK]</span> LocalStorage state synchronization loaded</p>
                      <p><span className="text-amber-400">[WARN]</span> Port 3000 mapping actively proxies iframe requests</p>
                      <p><span className="text-emerald-500">[OK]</span> WhatsApp Config verified: online status broadcast</p>
                      <p><span className="text-brand-400">[INFO]</span> Super Admin privilege simulated in local browser sandbox</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 2: OFFICIAL APPS CRUD OPERATIONS */}
            {adminTab === "apps" && (
              <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 space-y-6 text-xs font-sans">
                <div>
                  <h3 className="text-lg font-bold text-white">Ecosystem Official Apps Catalog Manager</h3>
                  <p className="text-xs text-gray-500 mt-1">Dynamically create, modify, delete, order or toggle download credentials of apps visible on the homepage.</p>
                </div>

                {/* Creation Form block */}
                <div className="bg-black/40 p-5 rounded-2xl border border-gray-900 space-y-4">
                  <strong className="text-xs font-bold text-white uppercase font-mono block">Deploy New App to Marketplace Catalog</strong>
                  <form
                    onSubmit={(e: any) => {
                      e.preventDefault();
                      const name = (document.getElementById("crud-app-name") as HTMLInputElement).value;
                      const tagline = (document.getElementById("crud-app-tagline") as HTMLInputElement).value;
                      const category = (document.getElementById("crud-app-category") as HTMLSelectElement).value as Category;
                      const price = parseFloat((document.getElementById("crud-app-price") as HTMLInputElement).value) || 0;
                      const dev = (document.getElementById("crud-app-dev") as HTMLInputElement).value || "Soulverse Apps";
                      const size = (document.getElementById("crud-app-size") as HTMLInputElement).value || "20 MB";
                      const image = (document.getElementById("crud-app-image") as HTMLInputElement).value || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80";
                      
                      const newApp: Product = {
                        id: "app-gen-" + Date.now(),
                        name,
                        tagline,
                        category,
                        subcategory: "Official",
                        description: tagline + ". Full compilation packages compiled via Cloud Node SSL keys. Ready for distribution.",
                        features: ["Interactive responsive view included", "Complete secure source code sandbox files"],
                        version: "v1.0.0",
                        developer: dev,
                        price,
                        rating: 5.0,
                        reviewsCount: 0,
                        image,
                        screenshots: [],
                        downloadCount: 0,
                        fileSize: size,
                        tags: ["official", "admin-created"],
                        isEnabled: true
                      };

                      setProducts(prev => [newApp, ...prev]);
                      e.target.reset();
                      triggerNotification("App Deployed! 🚀", `Successfully initialized and published ${name} to the marketplace.`);
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">App Name</label>
                      <input id="crud-app-name" required placeholder="e.g. CanvaPro Clone" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Tagline</label>
                      <input id="crud-app-tagline" required placeholder="e.g. High-performance design studio" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Category</label>
                      <select id="crud-app-category" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none">
                        {Object.values(Category).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Price ($)</label>
                      <input id="crud-app-price" type="number" step="0.01" required placeholder="0 for Free" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Developer</label>
                      <input id="crud-app-dev" placeholder="e.g. Soulverse Official" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">File Size</label>
                      <input id="crud-app-size" placeholder="e.g. 15.4 MB" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Banner Image URL</label>
                      <input id="crud-app-image" placeholder="Paste image link here..." className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>

                    <button
                      type="submit"
                      className="sm:col-span-2 md:col-span-4 bg-brand-600 hover:bg-brand-500 text-white font-mono font-bold py-2.5 rounded-xl transition-all cursor-pointer text-center"
                    >
                      Publish App to Front-Grid
                    </button>
                  </form>
                </div>

                {/* Editable catalog grid */}
                <div className="space-y-3">
                  <strong className="text-xs font-bold text-white uppercase font-mono block">Ecosystem App Inventory</strong>
                  <div className="space-y-2">
                    {products.map(prod => (
                      <div key={prod.id} className="bg-black/20 p-3 rounded-xl border border-gray-900 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <img src={prod.image} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <strong className="text-white block">{prod.name}</strong>
                            <span className="text-[10px] text-gray-500 font-mono">ID: {prod.id} • ${prod.price.toFixed(2)} • {prod.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Toggle visibility */}
                          <button
                            onClick={() => {
                              const updated = products.map(p => {
                                if (p.id === prod.id) {
                                  const newVal = p.isEnabled !== false ? false : true;
                                  return { ...p, isEnabled: newVal };
                                }
                                return p;
                              });
                              setProducts(updated);
                              triggerNotification("Catalog Visibility Updated", `Visibility for ${prod.name} toggled successfully.`);
                            }}
                            className={`px-3 py-1 rounded font-mono text-[10px] border font-bold transition-all ${
                              prod.isEnabled !== false
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                                : "bg-gray-900 text-gray-500 border-gray-800 hover:bg-gray-800"
                            }`}
                          >
                            {prod.isEnabled !== false ? "Visible" : "Hidden"}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to completely delete "${prod.name}" from catalog?`)) {
                                setProducts(products.filter(p => p.id !== prod.id));
                                triggerNotification("App Deleted", `${prod.name} removed from catalog.`);
                              }
                            }}
                            className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 p-1.5 rounded transition-all"
                            title="Delete App"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 3: SERVICES CRUD OPERATIONS */}
            {adminTab === "services" && (
              <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 space-y-6 text-xs font-sans">
                <div>
                  <h3 className="text-lg font-bold text-white">Dynamic Ecosystem Services Customizer</h3>
                  <p className="text-xs text-gray-500 mt-1">Manage, add, disable, or modify bespoke developer service packages presented in the client store page.</p>
                </div>

                {/* Create Service form */}
                <div className="bg-black/40 p-5 rounded-2xl border border-gray-900 space-y-4">
                  <strong className="text-xs font-bold text-white uppercase font-mono block font-bold">Register Custom Technical Service Tier</strong>
                  <form
                    onSubmit={(e: any) => {
                      e.preventDefault();
                      const name = (document.getElementById("srv-add-name") as HTMLInputElement).value;
                      const icon = (document.getElementById("srv-add-icon") as HTMLSelectElement).value;
                      const banner = (document.getElementById("srv-add-banner") as HTMLInputElement).value || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80";
                      const price = parseFloat((document.getElementById("srv-add-price") as HTMLInputElement).value) || 0;
                      const desc = (document.getElementById("srv-add-desc") as HTMLTextAreaElement).value;
                      const feats = (document.getElementById("srv-add-features") as HTMLInputElement).value;

                      const newSrv: ServiceItem = {
                        id: "srv-gen-" + Date.now(),
                        name,
                        icon,
                        banner,
                        gallery: [],
                        description: desc,
                        features: feats ? feats.split(",").map(f => f.trim()) : ["Custom Deployment Setup", "Tested binary packages code deliverables"],
                        price,
                        showOrderButton: true,
                        showWhatsAppButton: true,
                        showInquiryForm: true,
                        isEnabled: true
                      };

                      setServices(prev => [newSrv, ...prev]);
                      e.target.reset();
                      triggerNotification("Technical Service Created", `${name} package now live.`);
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Service Tier Name</label>
                      <input id="srv-add-name" required placeholder="e.g. Flutter Android App Compile" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Icon Category</label>
                      <select id="srv-add-icon" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none">
                        <option value="code">Code (Terminal Build)</option>
                        <option value="palette">Palette (UI Styling)</option>
                        <option value="smartphone">Smartphone (Mobile APK)</option>
                        <option value="database">Database (SQL Server Cloud)</option>
                        <option value="sparkles">Sparkles (AI/Prompt Special)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Tier Cost ($)</label>
                      <input id="srv-add-price" type="number" required placeholder="e.g. 199.00" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Features (Comma Separated)</label>
                      <input id="srv-add-features" placeholder="Interactive APK build, Full setup source, SSL proxy code" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Banner Image Link</label>
                      <input id="srv-add-banner" placeholder="Paste Unsplash or custom asset image link..." className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Core Deliverable Description</label>
                      <textarea id="srv-add-desc" rows={2} required placeholder="Compile and sign standard Flutter projects, releasing verified debug and release key APK binaries ready for Google Play uploads." className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>

                    <button
                      type="submit"
                      className="sm:col-span-2 md:col-span-4 bg-brand-600 hover:bg-brand-500 text-white font-mono font-bold py-2.5 rounded-xl transition-all cursor-pointer text-center"
                    >
                      Publish Bespoke Service Package
                    </button>
                  </form>
                </div>

                {/* Service Inventory list */}
                <div className="space-y-3">
                  <strong className="text-xs font-bold text-white uppercase font-mono block">Ecosystem Active Services</strong>
                  <div className="space-y-2">
                    {services.map(srv => (
                      <div key={srv.id} className="bg-black/20 p-3 rounded-xl border border-gray-900 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-brand-500/10 rounded-lg text-brand-400">
                            {srv.icon === "code" && <Code className="w-4 h-4" />}
                            {srv.icon === "palette" && <Palette className="w-4 h-4" />}
                            {srv.icon === "smartphone" && <Smartphone className="w-4 h-4" />}
                            {srv.icon === "database" && <Cpu className="w-4 h-4" />}
                            {srv.icon === "sparkles" && <Sparkles className="w-4 h-4" />}
                            {srv.icon !== "code" && srv.icon !== "palette" && srv.icon !== "smartphone" && srv.icon !== "database" && srv.icon !== "sparkles" && (
                              <Layers className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <strong className="text-white block">{srv.name}</strong>
                            <span className="text-[10px] text-gray-500 font-mono">ID: {srv.id} • Price: ${srv.price.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              const updated = services.map(s => {
                                if (s.id === srv.id) {
                                  const newVal = s.isEnabled !== false ? false : true;
                                  return { ...s, isEnabled: newVal };
                                }
                                return s;
                              });
                              setServices(updated);
                              triggerNotification("Service State Adjusted", `Toggled visibility parameters for ${srv.name}.`);
                            }}
                            className={`px-3 py-1 rounded font-mono text-[10px] border font-bold transition-all ${
                              srv.isEnabled !== false
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                                : "bg-gray-900 text-gray-500 border-gray-800 hover:bg-gray-800"
                            }`}
                          >
                            {srv.isEnabled !== false ? "Visible" : "Hidden"}
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Delete service tier "${srv.name}" completely?`)) {
                                setServices(services.filter(s => s.id !== srv.id));
                                triggerNotification("Service Tier Removed", `${srv.name} removed from registry.`);
                              }
                            }}
                            className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 p-1.5 rounded transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 4: DYNAMIC PRICING CONTROLS */}
            {adminTab === "pricing" && (
              <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 space-y-6 text-xs font-sans">
                <div>
                  <h3 className="text-lg font-bold text-white">Dynamic Pricing & Flash Discount Control Center</h3>
                  <p className="text-xs text-gray-500 mt-1">Set discount prices, trigger dynamic flash sales, or enable free downloads directly across all catalog nodes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Global multiplier multipliers */}
                  <div className="bg-black/40 p-5 rounded-2xl border border-gray-900 space-y-4">
                    <strong className="text-xs font-bold text-white uppercase font-mono block">Flash Discount Promotions Builder</strong>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-1">Target Product Catalog Node</label>
                        <select id="pricing-target-app" className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-white focus:outline-none">
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name} (Original: ${p.price.toFixed(2)})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 mb-1">Promotional Sale Price ($)</label>
                        <input id="pricing-sale-val" type="number" step="0.01" required placeholder="E.g. 5.99" className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-white focus:outline-none" />
                      </div>

                      <button
                        onClick={() => {
                          const targetId = (document.getElementById("pricing-target-app") as HTMLSelectElement).value;
                          const salePrice = parseFloat((document.getElementById("pricing-sale-val") as HTMLInputElement).value);
                          
                          if (targetId && !isNaN(salePrice)) {
                            const updated = products.map(p => {
                              if (p.id === targetId) {
                                return { ...p, discountPrice: salePrice };
                              }
                              return p;
                            });
                            setProducts(updated);
                            triggerNotification("Discount Authorized", "Promo/sale price modified successfully on Front-Grid.");
                          } else {
                            triggerNotification("Pricing Parameter Error", "Please verify and input numeric prices correctly.");
                          }
                        }}
                        className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono font-bold py-2.5 rounded-xl transition-all cursor-pointer text-center"
                      >
                        Apply Discount Price Control
                      </button>
                    </div>
                  </div>

                  {/* Free toggle & clean list */}
                  <div className="bg-black/40 p-5 rounded-2xl border border-gray-900 space-y-4 font-mono">
                    <strong className="text-xs font-bold text-white uppercase block">Quick Promotion Presets</strong>
                    <div className="space-y-3">
                      <p className="text-[10px] text-gray-500 leading-normal">Instantly set specific products to "Free Download" status, or clear discount prices to return them to original costs.</p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (confirm("Reset ALL discounts across all products to original rates?")) {
                              const updated = products.map(p => {
                                const { discountPrice, ...rest } = p;
                                return rest;
                              });
                              setProducts(updated);
                              triggerNotification("Discounts Flushed", "All promotional sale multipliers returned to baseline rates.");
                            }
                          }}
                          className="flex-1 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 py-2.5 rounded-xl text-center text-xs font-bold cursor-pointer"
                        >
                          Flush All Sale Promos
                        </button>

                        <button
                          onClick={() => {
                            if (confirm("Trigger temporary 50% flat discount on ALL premium app catalog nodes?")) {
                              const updated = products.map(p => {
                                if (p.price > 0) {
                                  return { ...p, discountPrice: p.price * 0.5 };
                                }
                                return p;
                              });
                              setProducts(updated);
                              triggerNotification("Ecosystem Flash Sale", "Global flat 50% discount rules applied live.");
                            }
                          }}
                          className="flex-1 bg-brand-600 hover:bg-brand-500 text-white py-2.5 rounded-xl text-center text-xs font-bold cursor-pointer shadow-md shadow-brand-500/10"
                        >
                          Ecosystem 50% Sale
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 5: WHATSAPP CONTROL PANEL */}
            {adminTab === "whatsapp" && (
              <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 space-y-6 text-xs font-sans">
                <div>
                  <h3 className="text-lg font-bold text-white">Ecosystem WhatsApp Node Control Panel</h3>
                  <p className="text-xs text-gray-500 mt-1">Configure broadcast channel links, technical chat links, prefilled text messages, and overall widget toggle visibilities.</p>
                </div>

                <div className="bg-black/40 p-5 rounded-2xl border border-gray-900 space-y-4">
                  <strong className="text-xs font-bold text-white uppercase font-mono block">WhatsApp Link Parameters Config</strong>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">WhatsApp Channel Address Link</label>
                      <input 
                        type="text" 
                        id="wa-cfg-channel" 
                        defaultValue={whatsAppConfig.channelLink} 
                        className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-white focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Support Contact Number (e.g. 923001234567)</label>
                      <input 
                        type="text" 
                        id="wa-cfg-chat" 
                        defaultValue={whatsAppConfig.chatLink} 
                        className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-white focus:outline-none" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Prefilled Chat Welcome Message</label>
                      <input 
                        type="text" 
                        id="wa-cfg-msg" 
                        defaultValue={whatsAppConfig.chatMessage} 
                        className="w-full bg-black border border-gray-800 rounded-lg p-2.5 text-white focus:outline-none" 
                      />
                    </div>
                    
                    {/* Toggles */}
                    <div className="flex items-center gap-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="wa-cfg-channel-toggle" 
                        defaultChecked={whatsAppConfig.isChannelEnabled} 
                        className="w-4 h-4 accent-brand-500 rounded border-gray-800 bg-black"
                      />
                      <label className="font-mono text-[11px] text-gray-300">Enable Broadcast Channel visibility</label>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="wa-cfg-chat-toggle" 
                        defaultChecked={whatsAppConfig.isChatEnabled} 
                        className="w-4 h-4 accent-brand-500 rounded border-gray-800 bg-black"
                      />
                      <label className="font-mono text-[11px] text-gray-300">Enable Tech Chat Support visibility</label>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const channelLink = (document.getElementById("wa-cfg-channel") as HTMLInputElement).value;
                      const chatLink = (document.getElementById("wa-cfg-chat") as HTMLInputElement).value;
                      const chatMessage = (document.getElementById("wa-cfg-msg") as HTMLInputElement).value;
                      const isChannelEnabled = (document.getElementById("wa-cfg-channel-toggle") as HTMLInputElement).checked;
                      const isChatEnabled = (document.getElementById("wa-cfg-chat-toggle") as HTMLInputElement).checked;

                      const newCfg = { channelLink, isChannelEnabled, chatLink, isChatEnabled, chatMessage };
                      setWhatsAppConfig(newCfg);
                      triggerNotification("WhatsApp Config Saved 💬", "Ecosystem WhatsApp support nodes and links reconfigured in local cache.");
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold py-2.5 rounded-xl transition-all cursor-pointer text-center mt-2 shadow-md shadow-emerald-500/10"
                  >
                    Save WhatsApp Gateway Configuration
                  </button>
                </div>
              </div>
            )}

            {/* MODULE 6: CENTRAL MEDIA LIBRARY */}
            {adminTab === "media" && (
              <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 space-y-6 text-xs font-sans">
                <div>
                  <h3 className="text-lg font-bold text-white">Central Media Library Manager</h3>
                  <p className="text-xs text-gray-500 mt-1">Upload verified application assets (Banners, screenshots, APKs, source-code ZIPs, PDFs) and copy their URLs for dynamic product mappings.</p>
                </div>

                {/* Add asset form */}
                <div className="bg-black/40 p-5 rounded-2xl border border-gray-900 space-y-4">
                  <strong className="text-xs font-bold text-white uppercase font-mono block">Add Verified Asset Link to Repository</strong>
                  <form
                    onSubmit={(e: any) => {
                      e.preventDefault();
                      const name = (document.getElementById("media-add-name") as HTMLInputElement).value;
                      const type = (document.getElementById("media-add-type") as HTMLSelectElement).value as any;
                      const url = (document.getElementById("media-add-url") as HTMLInputElement).value;
                      const size = (document.getElementById("media-add-size") as HTMLInputElement).value || "12.4 MB";

                      const newMedia: MediaAsset = {
                        id: "media-" + Date.now(),
                        name,
                        type,
                        url,
                        size,
                        date: new Date().toISOString().split('T')[0]
                      };

                      setMediaLibrary(prev => [newMedia, ...prev]);
                      e.target.reset();
                      triggerNotification("Asset Uploaded", `${name} added to secure CDN registry.`);
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Asset Label Name</label>
                      <input id="media-add-name" required placeholder="e.g. SehrLive APK Sign" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">Asset Type</label>
                      <select id="media-add-type" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none">
                        <option value="Image">Image Banner</option>
                        <option value="APK">Android APK Binary</option>
                        <option value="ZIP">Source Code ZIP Archive</option>
                        <option value="PDF">Ebook/Documentation PDF</option>
                        <option value="Logo">Official Vector Logo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">File URL Address</label>
                      <input id="media-add-url" required placeholder="e.g. https://images.unsplash.com..." className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 mb-1">File Weight Size</label>
                      <input id="media-add-size" placeholder="e.g. 18.5 MB" className="w-full bg-black border border-gray-800 rounded-lg p-2 text-white focus:outline-none" />
                    </div>

                    <button
                      type="submit"
                      className="sm:col-span-2 md:col-span-4 bg-brand-600 hover:bg-brand-500 text-white font-mono font-bold py-2.5 rounded-xl transition-all cursor-pointer text-center"
                    >
                      Authorize & Upload to CDN Registry
                    </button>
                  </form>
                </div>

                {/* Grid display of existing assets */}
                <div className="space-y-3">
                  <strong className="text-xs font-bold text-white uppercase font-mono block">Secured Assets Catalog ({mediaLibrary.length} Items)</strong>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {mediaLibrary.map(asset => (
                      <div key={asset.id} className="bg-black/30 border border-gray-900 rounded-2xl p-4 space-y-3 flex flex-col justify-between hover:border-gray-800 transition-all">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20 font-bold uppercase">{asset.type}</span>
                            <span className="text-[9px] font-mono text-gray-500">{asset.size}</span>
                          </div>
                          <strong className="text-white text-xs block truncate" title={asset.name}>{asset.name}</strong>
                          <p className="text-[10px] font-mono text-gray-600 truncate">{asset.url}</p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(asset.url);
                              triggerNotification("URL Copied", "Media asset link copied to your clipboard successfully.");
                            }}
                            className="flex-1 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 py-1.5 rounded-lg text-center font-mono text-[10px] font-bold cursor-pointer"
                          >
                            Copy Link URL
                          </button>
                          <button
                            onClick={() => {
                              setMediaLibrary(mediaLibrary.filter(m => m.id !== asset.id));
                              triggerNotification("Asset Deleted", "Asset linkage cleared from CDN repo.");
                            }}
                            className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 p-1.5 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 7: COUPONS ENGINE */}
            {adminTab === "coupons" && (
              <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 space-y-6 text-xs font-sans">
                <div>
                  <h3 className="text-lg font-bold text-white">Promo Coupon Management Engine</h3>
                  <p className="text-xs text-gray-500 mt-1">Deploy global discount percentages, authenticate coupon credentials, and clear expired codes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Creator Form */}
                  <div className="bg-black/40 p-5 rounded-2xl border border-gray-900 space-y-4">
                    <strong className="text-xs font-bold text-white uppercase font-mono block">Create Active Coupon Code</strong>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-mono text-gray-500 mb-1">Coupon Code</label>
                        <input 
                          type="text" 
                          id="admin-coupon-code" 
                          placeholder="e.g. FLASH30" 
                          className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-mono text-gray-500 mb-1">Discount Percent (%)</label>
                        <input 
                          type="number" 
                          id="admin-coupon-percent" 
                          placeholder="e.g. 30" 
                          className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none" 
                        />
                      </div>

                      <button
                        onClick={() => {
                          const codeEl = document.getElementById("admin-coupon-code") as HTMLInputElement;
                          const percentEl = document.getElementById("admin-coupon-percent") as HTMLInputElement;
                          if (codeEl && percentEl && codeEl.value.trim() && !isNaN(parseInt(percentEl.value))) {
                            addCouponCode(codeEl.value, parseInt(percentEl.value));
                            codeEl.value = "";
                            percentEl.value = "";
                          } else {
                            triggerNotification("Validation Error", "Please provide a valid coupon code and numeric discount percent.");
                          }
                        }}
                        className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        Authorize Coupon Code
                      </button>
                    </div>
                  </div>

                  {/* Coupon list */}
                  <div className="md:col-span-2 bg-black/40 p-5 rounded-2xl border border-gray-900 space-y-4">
                    <strong className="text-xs font-bold text-white uppercase font-mono block">Ecosystem Registered Promo Codes</strong>
                    <div className="space-y-2">
                      {coupons.map(c => (
                        <div key={c.code} className="bg-black/50 p-3 rounded-xl border border-gray-900 flex justify-between items-center text-xs font-mono">
                          <div>
                            <span className="font-bold text-brand-400 text-sm block">{c.code}</span>
                            <span className="text-[10px] text-gray-500">Exp: {c.expiryDate} • Status: Active</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="text-cyber-500 font-bold">-{c.discountPercent}% OFF</span>
                            <button
                              onClick={() => {
                                setCoupons(coupons.filter(cop => cop.code !== c.code));
                                triggerNotification("Coupon Revoked", `Discount code ${c.code} deleted.`);
                              }}
                              className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 p-1 rounded-md transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 8: HELPDESK SUPPORT TICKETS */}
            {adminTab === "tickets" && (
              <div className="bg-gray-950 p-6 rounded-3xl border border-gray-900 space-y-6 text-xs font-sans">
                <div>
                  <h3 className="text-lg font-bold text-white">Ecosystem Helpdesk Ticket Queue</h3>
                  <p className="text-xs text-gray-500 mt-1">Review user error logs, bulk-licensing requests, service inquiry briefs, and transmit official replies.</p>
                </div>

                <div className="space-y-4">
                  {supportTickets.map(t => (
                    <div key={t.id} className="bg-black/40 p-4 rounded-xl border border-gray-900 space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs">{t.subject}</span>
                            <span className="text-[9px] uppercase font-mono text-gray-500">[{t.id}]</span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono block mt-0.5">Raised by: {t.userEmail} • Date: {t.date} • Type: {t.category}</span>
                        </div>
                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border ${
                          t.status === "resolved" 
                            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                            : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Query Description: "{t.message}"</p>
                      
                      {t.replies.length > 0 && (
                        <div className="bg-brand-950/10 border border-brand-900/30 p-2.5 rounded-xl space-y-1 text-gray-300">
                          <span className="text-[9px] font-mono font-bold text-brand-400 uppercase">Transmit Log / Replies:</span>
                          {t.replies.map((rep, idx) => (
                            <p key={idx} className="text-xs italic">- "{rep.message}" <span className="text-[10px] text-gray-500">({rep.date})</span></p>
                          ))}
                        </div>
                      )}

                      <div className="pt-2 flex gap-2">
                        <textarea
                          rows={2}
                          placeholder="Type official admin reply..."
                          id={`reply-to-${t.id}`}
                          className="flex-1 bg-black border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none placeholder-gray-700"
                        />
                        <button
                          onClick={() => {
                            const textarea = document.getElementById(`reply-to-${t.id}`) as HTMLTextAreaElement;
                            if (textarea && textarea.value.trim()) {
                              replyToTicket(t.id, textarea.value);
                              textarea.value = "";
                            } else {
                              triggerNotification("Validation Error", "Please type a support response first before sending.");
                            }
                          }}
                          className="bg-brand-600 hover:bg-brand-500 text-white font-mono text-[10px] font-bold px-4 rounded-xl transition-all cursor-pointer shrink-0"
                        >
                          Send Helpdesk Reply
                        </button>
                      </div>
                    </div>
                  ))}

                  {supportTickets.length === 0 && (
                    <p className="text-xs text-gray-500 italic py-6 text-center font-mono">
                      No active tickets submitted yet. Try creating one in the Helpdesk/Contact tab!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          )
        ) : (
          /* ==========================================================================
             E. RENDER SUBDOMAIN CUSTOM INTERACTIVE MINI-APP SANDBOXES
             ========================================================================== */
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-900 pb-4">
              <div>
                <span className="bg-brand-500/10 text-brand-400 px-3 py-1 rounded-full text-xs font-mono font-bold border border-brand-500/25">
                  SUBDOMAIN // {activeSubdomain.subdomain}
                </span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight mt-1">
                  {activeSubdomain.name}
                </h2>
                <p className="text-xs text-gray-400">{activeSubdomain.description}</p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setActiveSubdomain(initialSubdomains[0])} // Go to store
                  className="bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 hover:border-gray-700 font-mono text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                >
                  Back to App Store
                </button>
                <button
                  onClick={() => triggerNotification("SSL Tunnel Activated", "Redirecting secure SSL tunnels to simulated container endpoints in a secure sandbox.")}
                  className="bg-white text-black font-mono text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-1 shadow-md"
                >
                  Open in New Tab <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Subdomain interactive widget container */}
            <SubdomainsHub subdomain={activeSubdomain} />
          </div>
        )}

      </main>

      {/* DETAILED PRODUCT DIALOG OVERLAY */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              layoutId={`prod-card-${selectedProduct.id}`}
              className="bg-dark-900 border border-gray-750 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              {/* Hero header background */}
              <div className="relative h-48 bg-gray-900 shrink-0">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent"></div>
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 bg-black/60 text-gray-400 hover:text-white p-2 rounded-xl border border-gray-800/40 transition-all"
                >
                  ✕
                </button>

                <div className="absolute bottom-4 left-6">
                  <span className="bg-brand-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {selectedProduct.subcategory}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-sans tracking-tight leading-tight mt-1">
                    {selectedProduct.name}
                  </h3>
                </div>
              </div>

              {/* Detailed scrollable content */}
              <div className="overflow-y-auto p-6 space-y-6 flex-1 text-xs">
                
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-white font-sans tracking-tight">Product Overview</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProduct.longDescription || selectedProduct.description}
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white font-sans tracking-tight">Key Product Deliverables</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProduct.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-gray-300">
                        <Check className="w-4 h-4 text-cyber-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid stats layout */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-900 font-mono text-center">
                  <div className="bg-gray-950 p-2 rounded-xl border border-gray-900">
                    <span className="text-[10px] text-gray-500 block">Version</span>
                    <span className="text-xs font-bold text-white">{selectedProduct.version}</span>
                  </div>
                  <div className="bg-gray-950 p-2 rounded-xl border border-gray-900">
                    <span className="text-[10px] text-gray-500 block">File Size</span>
                    <span className="text-xs font-bold text-white">{selectedProduct.fileSize || "15.4 MB"}</span>
                  </div>
                  <div className="bg-gray-950 p-2 rounded-xl border border-gray-900">
                    <span className="text-[10px] text-gray-500 block">Developer</span>
                    <span className="text-xs font-bold text-white truncate max-w-[100px] inline-block">{selectedProduct.developer}</span>
                  </div>
                  <div className="bg-gray-950 p-2 rounded-xl border border-gray-900">
                    <span className="text-[10px] text-gray-500 block">Downloads</span>
                    <span className="text-xs font-bold text-white">{selectedProduct.downloadCount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Subdomain direct jump if company app */}
                {selectedProduct.isCompanyApp && selectedProduct.subdomain && (
                  <div className="bg-brand-500/10 border border-brand-500/20 p-4 rounded-2xl flex justify-between items-center">
                    <div className="space-y-0.5">
                      <strong className="text-white text-xs block">Experience Interactive {selectedProduct.name} Mockup</strong>
                      <span className="text-[10px] text-gray-400 font-mono">Hosted on: {selectedProduct.subdomain}.soulverseapps.com</span>
                    </div>
                    <button
                      onClick={() => {
                        const sub = initialSubdomains.find(s => s.id === selectedProduct.subdomain);
                        if (sub) {
                          handleSubdomainChange(sub);
                        }
                      }}
                      className="bg-brand-600 hover:bg-brand-500 text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all shrink-0"
                    >
                      Enter App Hub
                    </button>
                  </div>
                )}

                {/* Reviews section */}
                <div className="space-y-4 pt-4 border-t border-gray-900">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-white font-sans tracking-tight">Verified User Reviews ({selectedProduct.reviewsCount})</h4>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {selectedProduct.rating} Rating
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {mockReviews.map((rev, i) => (
                      <div key={rev.id} className="bg-black/30 p-3 rounded-xl border border-gray-900/60 text-xs">
                        <div className="flex justify-between items-center mb-1 text-[10px] font-mono">
                          <span className="font-bold text-purple-300">{rev.user}</span>
                          <span className="text-gray-500">{rev.date}</span>
                        </div>
                        <p className="text-gray-400 italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Checkout actions bar */}
              <div className="p-5 border-t border-gray-900 bg-gray-950/40 flex justify-between items-center shrink-0">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Single License price</span>
                  <span className="text-lg font-extrabold text-white font-mono">
                    {selectedProduct.price === 0 ? "Free App Store" : `$${(selectedProduct.discountPrice !== undefined ? selectedProduct.discountPrice : selectedProduct.price).toFixed(2)}`}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      toggleWishlist(selectedProduct.id);
                    }}
                    className={`p-2 rounded-xl border transition-all ${
                      user.wishlist.includes(selectedProduct.id) 
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/30" 
                        : "bg-gray-900 text-gray-400 border-gray-800"
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  {selectedProduct.price > 0 ? (
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                        setShowCartPopover(true);
                      }}
                      className="bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-all"
                    >
                      Purchase Package License
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        triggerNotification("Secure Download Started", "Binary files are downloading via SSL Edge CDN. Check your local computer imports.");
                        setSelectedProduct(null);
                      }}
                      className="bg-cyber-600 hover:bg-cyber-500 text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-all"
                    >
                      Get Free App Binary
                    </button>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEVOPS & SIMULATION CONTROL PANEL */}
      {!isProductionMode && (
        <div className="fixed bottom-24 right-6 z-50 font-mono text-xs">
          <div className="relative">
            {/* Collapsible toggle button */}
            <button
              onClick={() => setShowDevPanel(!showDevPanel)}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold p-3 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-brand-400/20"
              title="DevOps & Simulation Panel"
            >
              <Settings className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {showDevPanel && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="absolute bottom-14 right-0 w-80 bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-4 space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-gray-900 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-brand-400" />
                      <span className="font-bold text-white tracking-wider">DevOps Panel</span>
                    </div>
                    <span className="text-[9px] bg-brand-500/10 text-brand-400 px-1.5 py-0.5 rounded border border-brand-500/20 uppercase font-bold">Simulator</span>
                  </div>

                  {/* Simulated role swapper */}
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Simulation Privilege Keys</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {["Super Admin", "Customer", "Manager", "Seller"].map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            setUser(prev => ({ ...prev, role: role as any }));
                            triggerNotification("Privilege Swapped", `Simulated role changed to ${role}.`);
                          }}
                          className={`py-1.5 px-2 rounded-lg text-[10px] font-bold text-center border capitalize transition-all ${
                            user.role === role
                              ? "bg-brand-600 text-white border-brand-400"
                              : "bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-700"
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Route Integrity simulator */}
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Simulate Error Responses</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setSimulatedError("404");
                          setShowDevPanel(false);
                        }}
                        className="bg-amber-950/20 hover:bg-amber-950/40 border border-amber-900/30 text-amber-400 py-1.5 px-3 rounded-lg text-center font-bold text-[10px]"
                      >
                        Trigger 404
                      </button>
                      <button
                        onClick={() => {
                          setSimulatedError("500");
                          setShowDevPanel(false);
                        }}
                        className="bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 text-rose-400 py-1.5 px-3 rounded-lg text-center font-bold text-[10px]"
                      >
                        Trigger 500
                      </button>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Developer Actions</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setUser(prev => ({ ...prev, walletBalance: prev.walletBalance + 100 }));
                          triggerNotification("Funds Injected", "Injected $100 simulated funds.");
                        }}
                        className="bg-gray-900 hover:bg-gray-800 border border-gray-850 text-gray-300 py-1.5 px-2 rounded-lg text-center font-bold text-[10px] flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3 h-3 text-brand-400" /> Wallet +$100
                      </button>
                      <button
                        onClick={() => {
                          localStorage.clear();
                          triggerNotification("Cache Flushed", "Cleared simulated site local storage.");
                          setTimeout(() => window.location.reload(), 1000);
                        }}
                        className="bg-gray-900 hover:bg-gray-800 border border-gray-850 text-gray-300 py-1.5 px-2 rounded-lg text-center font-bold text-[10px] flex items-center justify-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3 text-rose-400" /> Reset DB
                      </button>
                    </div>
                  </div>

                  <div className="text-[9px] text-center text-gray-600 border-t border-gray-900 pt-2 flex justify-between">
                    <span>SSL Active: TLS 1.3</span>
                    <span>soulverseapps.com</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL GATEWAY */}
      <CheckoutGateway
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cartItems={cart}
        userWalletBalance={user.walletBalance}
        onSuccess={handlePaymentSuccess}
      />

      {/* AUTHENTICATION OVERLAY MODAL */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 font-sans"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-gray-950 border border-gray-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col p-6 space-y-6"
            >
              {/* Close Button */}
              {authMode !== "google-loading" && (
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-all text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/80 cursor-pointer"
                >
                  ✕
                </button>
              )}

              {/* A. GOOGLE LOADING COMPONENT */}
              {authMode === "google-loading" ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin"></div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white font-mono">Google SSO Ingress Handshake</h3>
                    <p className="text-[11px] text-gray-500">Exchanging cryptographically secured session keys...</p>
                  </div>
                </div>
              ) : authMode === "verifying" ? (
                /* B. EMAIL VERIFICATION STEP */
                <div className="space-y-4 py-4 text-center">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400">
                    <Mail className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white">Verify Your Mail Address</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      We have simulated sending an activation token to <strong className="text-gray-200">{authEmail || "your email"}</strong>.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 text-left">
                    <label className="text-[10px] font-mono text-gray-500 uppercase font-bold block">Enter 6-Digit Activation Token</label>
                    <input
                      type="text"
                      defaultValue="SV-8840"
                      placeholder="e.g. SV-1234"
                      className="w-full bg-black border border-gray-900 rounded-xl p-3 text-xs text-center text-white tracking-widest font-mono focus:outline-none focus:border-brand-500"
                    />
                    <span className="text-[10px] font-mono text-gray-600 block text-center italic">Tip: Click verify below to confirm instant trust activation.</span>
                  </div>

                  <button
                    onClick={handleEmailVerifyAndLogin}
                    className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-950/40 cursor-pointer"
                  >
                    Verify & Activate Session
                  </button>
                </div>
              ) : (
                /* C. MAIN LOGIN / SIGN UP PANEL */
                <div className="space-y-4">
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-white tracking-tight">Soulverse Identity Portal</h3>
                    <p className="text-xs text-gray-500 font-mono">Sign up or sign in to establish client trust level</p>
                  </div>

                  {/* Mode Toggles */}
                  <div className="grid grid-cols-2 bg-black p-1 rounded-xl border border-gray-900 text-center font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      className={`py-1.5 rounded-lg transition-all font-bold cursor-pointer ${authMode === "login" ? "bg-gray-900 text-brand-400" : "text-gray-500 hover:text-white"}`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode("signup")}
                      className={`py-1.5 rounded-lg transition-all font-bold cursor-pointer ${authMode === "signup" ? "bg-gray-900 text-brand-400" : "text-gray-500 hover:text-white"}`}
                    >
                      Create Account
                    </button>
                  </div>

                  {/* Form Submission */}
                  <form onSubmit={authMode === "login" ? handleEmailLogin : handleEmailSignUp} className="space-y-3.5">
                    {authMode === "signup" && (
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-gray-500 uppercase font-bold block">Your Name</label>
                        <input
                          type="text"
                          required
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          placeholder="Sarmad Rizwan"
                          className="w-full bg-black border border-gray-900 rounded-xl p-2.5 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-brand-500 font-mono"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 uppercase font-bold block">Email Address</label>
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="soulversepk@gmail.com"
                        className="w-full bg-black border border-gray-900 rounded-xl p-2.5 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-brand-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-gray-500 uppercase font-bold block">Access Password</label>
                      <input
                        type="password"
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-black border border-gray-900 rounded-xl p-2.5 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-brand-500 font-mono"
                      />
                    </div>

                    {authMode === "signup" && (
                      <div className="flex items-start gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="auth-agree"
                          checked={authAgree}
                          onChange={(e) => setAuthAgree(e.target.checked)}
                          className="mt-0.5 rounded border-gray-800 bg-black text-brand-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                        <label htmlFor="auth-agree" className="text-[11px] text-gray-400 leading-normal">
                          I agree to complete payments via the 50/50 upfront downpayment and release remaining 50% upon code compilation.
                        </label>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-brand-950/40 cursor-pointer"
                    >
                      {authMode === "login" ? "Secure Login Session" : "Initiate Verification Send"}
                    </button>
                  </form>

                  <div className="flex items-center justify-center gap-2 py-1">
                    <span className="w-full h-[1px] bg-gray-900"></span>
                    <span className="text-[10px] font-mono text-gray-600 uppercase whitespace-nowrap">Or SSO Trust Partner</span>
                    <span className="w-full h-[1px] bg-gray-900"></span>
                  </div>

                  {/* Google Login Trigger */}
                  <button
                    type="button"
                    onClick={handleGoogleLoginSimulate}
                    className="w-full bg-gray-900 hover:bg-gray-850 border border-gray-800 text-gray-300 font-mono text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    Authenticate with Google Identity
                  </button>

                  <div className="text-[10px] text-center text-gray-500 font-mono leading-normal pt-1">
                    Support / Admin Gmail: <a href="mailto:solv@gmail.com" className="text-gray-400 hover:underline">solv@gmail.com</a>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL FOOTER */}
      <footer className="absolute bottom-0 left-0 right-0 border-t border-gray-900 bg-black/60 py-6 text-center text-xs font-mono text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Soulverse Apps (soulverseapps.com). All Rights Reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => triggerNotification("Privacy Simulation", "Privacy policy document loaded successfully.")} className="hover:text-white">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => triggerNotification("Terms Simulation", "Terms and conditions license terms loaded successfully.")} className="hover:text-white">Terms of Service</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
