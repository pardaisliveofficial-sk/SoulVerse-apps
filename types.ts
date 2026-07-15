export enum Category {
  Apps = "Apps",
  AITools = "AI Tools",
  Templates = "Website Templates",
  UIKits = "UI Kits",
  SourceCode = "Source Code/Projects",
  Prompts = "AI Prompts",
  PremiumMemberships = "Memberships",
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  subcategory: string;
  description: string;
  longDescription?: string;
  features: string[];
  version: string;
  developer: string;
  price: number;
  discountPrice?: number; // Promo/discount price
  rating: number;
  reviewsCount: number;
  reviews?: Review[];
  image: string; // Main display image
  screenshots: string[]; // Screenshot URLs or placeholders
  demoVideo?: string; // YouTube or mock video link
  downloadCount: number;
  tags: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isLatest?: boolean;
  isCompanyApp?: boolean; // True for Sehr Live, Dramaverse, etc.
  subdomain?: string; // e.g. "sehrlive" for sehrlive.soulverseapps.com
  fileSize?: string;
  compatibility?: string[]; // e.g. ["Android", "iOS", "Web"]
  downloadUrl?: string;
  
  // Admin-controlled official app fields
  googlePlayLink?: string;
  appleStoreLink?: string;
  apkDownloadLink?: string;
  websiteUrl?: string;
  isComingSoon?: boolean;
  isOfficialBadge?: boolean;
  displayOrder?: number;
  isEnabled?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  walletBalance: number;
  role: "Super Admin" | "Admin" | "Manager" | "Editor" | "Seller" | "Support" | "Customer" | "Finance" | "Moderator" | "Content Manager";
  isPremium: boolean;
  referralCode: string;
  referralsCount: number;
  earnings: number; // For affiliates / sellers
  wishlist: string[]; // Product IDs
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  products: {
    id: string;
    name: string;
    price: number;
    category: string;
  }[];
  total: number;
  paymentMethod: string;
  status: "completed" | "pending" | "failed";
  invoiceNumber: string;
}

export interface Seller {
  id: string;
  companyName: string;
  email: string;
  status: "approved" | "pending" | "rejected";
  rating: number;
  totalSales: number;
  totalEarnings: number;
  joinedDate: string;
}

export interface SupportTicket {
  id: string;
  userEmail: string;
  subject: string;
  message: string;
  category: "billing" | "technical" | "seller" | "other";
  status: "open" | "in-progress" | "resolved";
  date: string;
  replies: {
    sender: "user" | "admin";
    message: string;
    date: string;
  }[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  expiryDate: string;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface Subdomain {
  id: string;
  subdomain: string;
  name: string;
  description: string;
  status: "active" | "maintenance" | "development";
  type: "app" | "utility" | "service" | "docs";
  customStyles?: {
    primaryBg: string;
    primaryText: string;
  };
}

export interface ServiceItem {
  id: string;
  name: string;
  icon: string; // lucide icon name (e.g., Code, Layout, Video, Database)
  banner: string;
  gallery: string[];
  description: string;
  features: string[];
  price: number;
  discountPrice?: number;
  showOrderButton: boolean;
  showWhatsAppButton: boolean;
  showInquiryForm: boolean;
  isEnabled?: boolean;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: "Image" | "Video" | "Icon" | "Logo" | "Animation" | "Document" | "APK" | "PDF" | "ZIP";
  url: string;
  size: string;
  date: string;
}
