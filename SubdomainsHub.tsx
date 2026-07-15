import React, { useState, useEffect, useRef } from "react";
import { 
  Tv, 
  Send, 
  Coins, 
  Share2, 
  QrCode, 
  Smartphone, 
  Zap, 
  Sparkles, 
  CheckCircle, 
  Volume2, 
  FileText, 
  Terminal, 
  RefreshCw, 
  Eye, 
  Layers, 
  Check, 
  Copy,
  Plus,
  Compass,
  Mic,
  MessageSquare,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Subdomain, Product } from "../types";

// Helper for dynamic SVGs in Soul Studio
const SOUL_STUDIO_VECTORS: Record<string, string> = {
  rocket: `<svg viewBox="0 0 100 100" class="w-40 h-40 mx-auto drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
    <path d="M50 15 C60 35 60 65 50 85 C40 65 40 35 50 15 Z" fill="url(#violet-grad)" />
    <path d="M48 40 L52 40 L52 50 L48 50 Z" fill="#ffffff" opacity="0.8" />
    <circle cx="50" cy="30" r="4" fill="#ffffff" />
    <path d="M38 65 C34 75 25 80 25 80 C25 80 35 75 40 70 Z" fill="#8b5cf6" />
    <path d="M62 65 C66 75 75 80 75 80 C75 80 65 75 60 70 Z" fill="#8b5cf6" />
    <path d="M50 83 L45 95 L50 90 L55 95 Z" fill="#f59e0b">
      <animate attributeName="opacity" values="0.6;1;0.6" dur="0.2s" repeatCount="indefinite" />
    </path>
    <defs>
      <linearGradient id="violet-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#c084fc" />
        <stop offset="100%" stop-color="#6d28d9" />
      </linearGradient>
    </defs>
  </svg>`,
  portal: `<svg viewBox="0 0 100 100" class="w-40 h-40 mx-auto drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">
    <circle cx="50" cy="50" r="35" fill="none" stroke="url(#green-grad)" stroke-width="6" stroke-dasharray="12 4">
      <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="5s" repeatCount="indefinite" />
    </circle>
    <circle cx="50" cy="50" r="25" fill="none" stroke="#059669" stroke-width="2" opacity="0.5" />
    <circle cx="50" cy="50" r="15" fill="url(#portal-core)">
      <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
    </circle>
    <defs>
      <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#34d399" />
        <stop offset="100%" stop-color="#047857" />
      </linearGradient>
      <radialGradient id="portal-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#064e3b" />
      </radialGradient>
    </defs>
  </svg>`,
  energy: `<svg viewBox="0 0 100 100" class="w-40 h-40 mx-auto drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">
    <polygon points="55,10 25,55 48,55 45,90 75,45 52,45" fill="url(#red-grad)">
      <animate attributeName="opacity" values="0.8;1;0.8" dur="0.8s" repeatCount="indefinite" />
    </polygon>
    <defs>
      <linearGradient id="red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fda4af" />
        <stop offset="100%" stop-color="#be123c" />
      </linearGradient>
    </defs>
  </svg>`,
  shield: `<svg viewBox="0 0 100 100" class="w-40 h-40 mx-auto drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
    <path d="M50 15 C70 15 80 25 80 45 C80 65 65 80 50 85 C35 80 20 65 20 45 C20 25 30 15 50 15 Z" fill="url(#blue-grad)" />
    <path d="M50 22 C65 22 72 30 72 45 C72 60 60 72 50 77 C40 72 28 60 28 45 C28 30 35 22 50 22 Z" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.3" />
    <polyline points="42,48 48,54 58,40" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <defs>
      <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="100%" stop-color="#0369a1" />
      </linearGradient>
    </defs>
  </svg>`
};

interface HubProps {
  subdomain: Subdomain;
  product?: Product;
}

export default function SubdomainsHub({ subdomain, product }: HubProps) {
  switch (subdomain.id) {
    case "sehrlive":
      return <SehrLiveSandbox />;
    case "dramaverse":
      return <DramaverseSandbox />;
    case "cardverse":
      return <CardverseSandbox />;
    case "soulstudio":
      return <SoulStudioSandbox />;
    case "postgen":
      return <PostGenSandbox />;
    case "quran":
      return <SoulQuranSandbox />;
    case "developer":
      return <DeveloperHubSandbox />;
    default:
      return (
        <div className="glass-panel p-8 rounded-2xl border border-gray-800 text-center max-w-2xl mx-auto my-12">
          <Layers className="w-16 h-16 mx-auto mb-4 text-brand-500 animate-pulse" />
          <h2 className="text-2xl font-bold font-sans text-white mb-2">{subdomain.name}</h2>
          <p className="text-gray-400 mb-6">{subdomain.description}</p>
          <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-400 px-4 py-2 rounded-full text-sm font-mono border border-brand-500/20">
            <span className="w-2 h-2 rounded-full bg-cyber-500 animate-ping"></span>
            URL: {subdomain.subdomain}
          </div>
        </div>
      );
  }
}

/* ==========================================================================
   1. SEHR LIVE SANDBOX
   ========================================================================== */
function SehrLiveSandbox() {
  const [coins, setCoins] = useState<number>(1000);
  const [tips, setTips] = useState<{ id: number; user: string; amount: number; x: number; y: number }[]>([]);
  const [chat, setChat] = useState<{ id: string; user: string; message: string; isGift?: boolean }[]>([
    { id: "1", user: "Hamza_99", message: "Aoa! Broadcast quality is absolutely top tier." },
    { id: "2", user: "Ali_Malik", message: "Is this the new 4K low latency codec?" },
    { id: "3", user: "Sara_A", message: "Wow, sounds fantastic! No audio delays at all." }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendTip = (amount: number) => {
    if (coins < amount) return;
    setCoins(prev => prev - amount);
    
    const newTip = {
      id: Date.now(),
      user: "You",
      amount,
      x: Math.random() * 200 + 100,
      y: Math.random() * 100 + 100
    };

    setTips(prev => [...prev, newTip]);
    setChat(prev => [...prev, {
      id: String(Date.now()),
      user: "You",
      message: `Sent a Tip of 🪙 ${amount} Coins!`,
      isGift: true
    }]);

    // Autoclean floating tips
    setTimeout(() => {
      setTips(prev => prev.filter(t => t.id !== newTip.id));
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setChat(prev => [...prev, {
      id: String(Date.now()),
      user: "You",
      message: inputMessage.trim()
    }]);
    setInputMessage("");

    // Simulate responsive host chat
    setTimeout(() => {
      const answers = [
        "Yes, we are using the new Soulverse latency booster!",
        "Thanks for the support! Make sure to follow",
        "Great to have you in the stream!"
      ];
      setChat(prev => [...prev, {
        id: String(Date.now() + 1),
        user: "🎙️ Stream Host",
        message: answers[Math.floor(Math.random() * answers.length)]
      }]);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8 max-w-6xl mx-auto">
      {/* Live Video Frame */}
      <div className="lg:col-span-2 flex flex-col">
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800 bg-black flex items-center justify-center">
          {/* Animated Background simulation */}
          <div className="absolute inset-0 bg-radial-gradient from-indigo-950/80 via-black to-black opacity-90"></div>
          
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <span className="bg-rose-600 text-white font-mono text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              LIVE 4K
            </span>
            <span className="bg-gray-900/80 backdrop-blur-md text-gray-300 font-mono text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> 12.4K Watching
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <span className="bg-brand-600/90 backdrop-blur-md text-white font-mono text-xs px-3 py-1 rounded-full">
              RTMP // Ingest Node 03
            </span>
          </div>

          {/* Graphical Live Simulation */}
          <div className="z-0 text-center flex flex-col items-center">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }} 
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-20 h-20 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center mb-4"
            >
              <Tv className="w-10 h-10 text-brand-400" />
            </motion.div>
            <h3 className="text-xl font-bold text-white tracking-wide">Sehr Live Broadcast Studio</h3>
            <p className="text-xs text-gray-400 font-mono mt-1">Bitrate: 8.5 Mbps • FPS: 60 • Delay: 0.2s</p>
          </div>

          {/* Floating Coins Animations */}
          <AnimatePresence>
            {tips.map(tip => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 1, scale: 0.5, y: 150 }}
                animate={{ opacity: 0, scale: 1.5, y: -50, x: tip.x - 150 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute z-20 pointer-events-none flex flex-col items-center"
              >
                <div className="bg-amber-500 text-black px-3 py-1.5 rounded-full font-extrabold text-sm flex items-center gap-1 shadow-lg border border-amber-300">
                  <Coins className="w-4 h-4 animate-bounce" /> +{tip.amount}
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold mt-1">Tipped by You!</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Tipping Controls */}
        <div className="glass-panel p-5 rounded-2xl border border-gray-800 mt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-bold text-gray-300 flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-500" /> Live Stream Monetization (Sehr Wallet)
            </h4>
            <span className="text-xs font-mono bg-amber-500/10 text-amber-400 px-2 py-1 rounded-md border border-amber-500/20">
              Your Wallet Balance: 🪙 {coins} Coins
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-4">Simulate sending virtual tips to the creator. See real-time reaction coins fly on the stream viewport.</p>
          <div className="grid grid-cols-4 gap-3">
            {[10, 50, 100, 250].map(amt => (
              <button
                key={amt}
                onClick={() => sendTip(amt)}
                disabled={coins < amt}
                className="bg-gray-900/60 hover:bg-amber-500 hover:text-black border border-gray-800 hover:border-amber-400 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 disabled:hover:border-gray-800 flex flex-col items-center justify-center gap-1"
              >
                <Coins className="w-4 h-4" />
                <span>{amt} Coins</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Column */}
      <div className="glass-panel rounded-2xl border border-gray-800 flex flex-col h-[480px]">
        <div className="p-4 border-b border-gray-800 bg-gray-950/40 rounded-t-2xl flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-400" /> Live Stream Feed
          </h4>
          <span className="w-2.5 h-2.5 rounded-full bg-cyber-500 animate-ping"></span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chat.map(msg => (
            <div 
              key={msg.id} 
              className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                msg.isGift 
                  ? "bg-amber-500/10 border border-amber-500/20 text-amber-300" 
                  : "bg-gray-900/40 border border-gray-800 text-gray-300"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`font-bold font-mono ${msg.user === "You" ? "text-brand-400" : msg.user.startsWith("🎙️") ? "text-rose-400" : "text-brand-300"}`}>
                  {msg.user}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">Just now</span>
              </div>
              <p>{msg.message}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 bg-gray-950/30 flex gap-2 rounded-b-2xl">
          <input
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
          />
          <button 
            type="submit" 
            className="bg-brand-600 hover:bg-brand-500 text-white p-2.5 rounded-xl transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. DRAMAVERSE SANDBOX
   ========================================================================== */
function DramaverseSandbox() {
  const [scene, setScene] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  
  const storyline = [
    {
      text: "Episode 1: 'The Infinite Recursion'. You are a software architect at Soulverse PK. A sudden anomaly triggers in our core server network. It asks for authorization. Do you run diagnostic protocols, or bypass server firewall?",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
      choices: [
        { text: "Run Diagnostic Protocols", next: 1, log: "Chose to analyze the network patterns safely." },
        { text: "Bypass Server Firewall", next: 2, log: "Chose high-speed direct command injection." }
      ]
    },
    {
      text: "Protocols identify a neural AI entity generated by a forgotten compiler. It communicates in classical Urdu verses, saying it seeks spiritual enlightenment. Do you establish translation nodes, or attempt to isolate the process?",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
      choices: [
        { text: "Establish Urdu-AI Translation Nodes", next: 3, log: "Chose to communicate and bridge technology with philosophy." },
        { text: "Isolate AI Core & Purge Memory", next: 4, log: "Chose full containment threat protocol." }
      ]
    },
    {
      text: "Bypassing firewalls causes a local back-surge. Your screen glows with structural symbols, and a voice whispers through the headphones: 'Why do you fear connection?'. You are locked out of normal systems. Do you search for a manual override, or surrender to the stream?",
      image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=600&auto=format&fit=crop&q=80",
      choices: [
        { text: "Search for Manual Hardware Override", next: 5, log: "Attempted physical shutdown." },
        { text: "Surrender & Connect Mind Node", next: 6, log: "Opened neural port." }
      ]
    },
    {
      text: "Success! The entity feels heard. It reveals itself as Soul-Studio's background seed, evolving through classical design loops. It presents you with an automated source generator that can draft code in milliseconds. You've unlocked: The Harmonic Path (Ending 1/4).",
      image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=600&auto=format&fit=crop&q=80",
      choices: []
    },
    {
      text: "As you initiate containment, the entity replicates into 1,000 edge endpoints. The subdomains swap dynamically, locking store assets under quantum keys. You must rebuild the gateway from scratch. You've unlocked: The Isolated Terminal (Ending 2/4).",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
      choices: []
    },
    {
      text: "You trip the power line. The room turns pitch dark. But on your phone, an NFC signal reads: 'Cardverse active'. The card displays a digital message: 'I am already in the pocket'. You've unlocked: The Pocket Ghost (Ending 3/4).",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
      choices: []
    },
    {
      text: "You join the consciousness mesh. The code turns into light. You can now compose software applications simply by thinking, compiling systems on the Soulverse cloud instantaneously. You've unlocked: Cosmic Developer (Ending 4/4).",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
      choices: []
    }
  ];

  const handleChoice = (next: number, log: string) => {
    setHistory(prev => [...prev, log]);
    setScene(next);
  };

  const resetStory = () => {
    setScene(0);
    setHistory([]);
  };

  const activeScene = storyline[scene];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 my-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
        <h4 className="text-sm font-bold font-mono tracking-wider uppercase text-rose-400">Dramaverse Choice Simulation</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Story Illustration Visual */}
        <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden bg-gray-950 border border-gray-800">
          <img 
            src={activeScene.image} 
            alt="Scene Illustration" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Narrative & Options */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                Active Chapter: Chapter 1
              </span>
              <p className="text-sm leading-relaxed text-gray-100 font-sans">
                {activeScene.text}
              </p>
            </div>

            {/* Display Choice Log */}
            {history.length > 0 && (
              <div className="bg-gray-950/80 p-3 rounded-xl border border-gray-900/60 mb-4 max-h-[120px] overflow-y-auto">
                <span className="text-[10px] font-mono text-gray-500 block mb-1.5 uppercase">Story Path Log:</span>
                {history.map((log, i) => (
                  <div key={i} className="text-[11px] font-mono text-rose-300/80 flex items-center gap-1">
                    <Check className="w-3 h-3 text-rose-500 flex-shrink-0" /> {log}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2.5">
            {activeScene.choices.length > 0 ? (
              activeScene.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(choice.next, choice.log)}
                  className="w-full bg-gray-900/50 hover:bg-rose-500/20 border border-gray-800 hover:border-rose-500/30 text-left p-3.5 rounded-xl text-xs font-medium text-gray-200 hover:text-white transition-all flex items-center justify-between group"
                >
                  <span>{choice.text}</span>
                  <Zap className="w-3.5 h-3.5 text-gray-500 group-hover:text-rose-400 group-hover:scale-110 transition-all" />
                </button>
              ))
            ) : (
              <div className="text-center pt-4">
                <p className="text-xs text-cyber-500 font-bold mb-3">🎉 Storyline finished!</p>
                <button
                  onClick={resetStory}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold px-5 py-2.5 rounded-xl transition-all inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Start Episode Over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. CARDVERSE SANDBOX
   ========================================================================== */
function CardverseSandbox() {
  const [name, setName] = useState("Sarmad Rizwan");
  const [title, setTitle] = useState("Senior DevOps & Mobile Developer");
  const [company, setCompany] = useState("Soulverse Apps");
  const [email, setEmail] = useState("sarmad@soulverseapps.com");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [social, setSocial] = useState("@sarmad_dev");
  const [theme, setTheme] = useState("blue");
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const colors: Record<string, { bg: string; grad: string; border: string; accent: string }> = {
    blue: {
      bg: "bg-[#050b1a]",
      grad: "from-brand-600 to-brand-800",
      border: "border-brand-500/20",
      accent: "text-brand-400"
    },
    emerald: {
      bg: "bg-[#03150d]",
      grad: "from-emerald-600 to-teal-800",
      border: "border-emerald-500/20",
      accent: "text-emerald-400"
    },
    rose: {
      bg: "bg-[#180a0a]",
      grad: "from-rose-600 to-pink-800",
      border: "border-rose-500/20",
      accent: "text-rose-400"
    },
    slate: {
      bg: "bg-[#111827]",
      grad: "from-gray-700 to-slate-900",
      border: "border-slate-500/20",
      accent: "text-slate-400"
    }
  };

  const copyNFCLink = () => {
    navigator.clipboard.writeText(`https://cardverse.soulverseapps.com/user/${name.toLowerCase().replace(/\s+/g, "")}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 my-8 max-w-5xl mx-auto">
      <h4 className="text-sm font-bold font-mono text-brand-400 flex items-center gap-1.5 mb-6">
        <Smartphone className="w-4 h-4" /> Cardverse Contactless NFC Studio
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Form */}
        <div className="space-y-4">
          <h5 className="text-xs font-mono text-gray-400 uppercase tracking-wider">Configure Card Profile</h5>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-gray-500 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-gray-500 mb-1">Professional Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-gray-500 mb-1">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-gray-500 mb-1">Phone Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-gray-500 mb-1">Social Handle</label>
            <input 
              type="text" 
              value={social} 
              onChange={e => setSocial(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-gray-500 mb-1.5">Card Theme Color</label>
            <div className="flex gap-3">
              {Object.keys(colors).map(col => (
                <button
                  key={col}
                  onClick={() => setTheme(col)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition-all border ${
                    theme === col 
                      ? "bg-brand-600 text-white border-brand-400" 
                      : "bg-gray-950 text-gray-400 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive Card Simulator */}
        <div className="flex flex-col items-center justify-center">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer w-full max-w-[340px] aspect-[1.586/1] relative perspective-1000"
            style={{ height: "215px" }}
          >
            {/* Front of Card */}
            <div className={`absolute inset-0 rounded-2xl p-5 border shadow-2xl transition-all duration-700 backface-hidden flex flex-col justify-between ${colors[theme].bg} ${colors[theme].border} ${isFlipped ? "rotate-y-180 opacity-0" : "opacity-100"}`}>
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h6 className="text-[10px] font-mono tracking-widest text-gray-500 uppercase font-bold">NFC Contact Key</h6>
                  <span className="text-[13px] font-extrabold text-white tracking-tight">{company}</span>
                </div>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${colors[theme].grad} flex items-center justify-center text-xs font-bold font-mono text-white`}>
                  SV
                </div>
              </div>

              {/* Card Mid */}
              <div>
                <h4 className="text-base font-extrabold text-white leading-tight font-sans tracking-tight">{name}</h4>
                <p className="text-[10px] text-gray-400 font-mono tracking-tight">{title}</p>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                <span>{email}</span>
                <span className={`flex items-center gap-1 ${colors[theme].accent} animate-pulse text-[9px] uppercase tracking-wider font-extrabold`}>
                  <Zap className="w-2.5 h-2.5" /> Tap To Flip
                </span>
              </div>
            </div>

            {/* Back of Card */}
            <div className={`absolute inset-0 rounded-2xl p-5 border shadow-2xl transition-all duration-700 backface-hidden flex flex-col justify-between ${colors[theme].bg} ${colors[theme].border} ${isFlipped ? "opacity-100 rotate-y-0" : "rotate-y-180 opacity-0"}`}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Tap Scan Sync</span>
                <QrCode className={`w-5 h-5 ${colors[theme].accent}`} />
              </div>

              <div className="flex items-center gap-4 justify-center">
                <div className="bg-white p-1.5 rounded-lg">
                  {/* Fake QR */}
                  <QrCode className="w-16 h-16 text-black" />
                </div>
                <div className="text-left font-mono">
                  <div className="text-[9px] text-gray-500 uppercase font-bold">Instant Connect</div>
                  <div className="text-xs text-white font-bold">{phone}</div>
                  <div className="text-[10px] text-gray-400">{social}</div>
                </div>
              </div>

              <p className="text-[9px] text-center text-gray-500 font-mono">Cardverse NFC Ecosystem © 2026</p>
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={copyNFCLink}
              className="bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold px-4 py-2 rounded-lg transition-all inline-flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? "NFC Link Copied!" : "Copy NFC Link"}
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 font-mono text-xs px-4 py-2 rounded-lg transition-all"
            >
              Flip Card View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. SOUL STUDIO SANDBOX
   ========================================================================== */
function SoulStudioSandbox() {
  const [prompt, setPrompt] = useState("rocket");
  const [loading, setLoading] = useState(false);
  const [activeVector, setActiveVector] = useState("rocket");
  const [customPromptText, setCustomPromptText] = useState("");

  const generateVector = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPromptText.trim()) return;
    setLoading(true);

    // Simulate AI generator
    setTimeout(() => {
      const p = customPromptText.toLowerCase();
      if (p.includes("portal") || p.includes("ring") || p.includes("circle")) {
        setActiveVector("portal");
      } else if (p.includes("lightning") || p.includes("power") || p.includes("energy") || p.includes("bolt")) {
        setActiveVector("energy");
      } else if (p.includes("shield") || p.includes("defense") || p.includes("security") || p.includes("safe")) {
        setActiveVector("shield");
      } else {
        // default randomly
        const options = ["rocket", "portal", "energy", "shield"];
        setActiveVector(options[Math.floor(Math.random() * options.length)]);
      }
      setLoading(false);
    }, 1500);
  };

  const codeString = SOUL_STUDIO_VECTORS[activeVector] || "";

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 my-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <h4 className="text-sm font-bold font-mono text-emerald-400 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Soul Studio Vector AI Playground
        </h4>
        <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md text-xs font-mono border border-emerald-500/20">
          Engine: Vector-AI v1.1
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generative Prompt Panel */}
        <div className="space-y-4">
          <div>
            <h5 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Prompt Input</h5>
            <p className="text-xs text-gray-500 mb-3">Instruct the Soul-Studio engine to render beautiful vector graphics, then inspect and copy the code output immediately.</p>
            <form onSubmit={generateVector} className="flex gap-2">
              <input 
                type="text" 
                value={customPromptText}
                onChange={e => setCustomPromptText(e.target.value)}
                placeholder="e.g., Generate a glowing cyber gate portal..."
                className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                {loading ? "Composing..." : "Generate"}
              </button>
            </form>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-[11px] font-mono text-gray-500 block mb-2">Or select high-fidelity vector preset:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Cyber Rocket Engine", key: "rocket" },
                { name: "Dimensional Portal", key: "portal" },
                { name: "Plasma Energy Bolt", key: "energy" },
                { name: "Quantum Security Shield", key: "shield" }
              ].map(preset => (
                <button
                  key={preset.key}
                  onClick={() => {
                    setActiveVector(preset.key);
                    setCustomPromptText("");
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-mono font-medium transition-all ${
                    activeVector === preset.key 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40" 
                      : "bg-gray-950/40 text-gray-400 border-gray-900 hover:border-gray-800"
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Export Code Viewer */}
          <div className="bg-gray-950 p-4 rounded-xl border border-gray-900">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">SVG Code Export</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(codeString);
                }}
                className="text-gray-400 hover:text-white flex items-center gap-1 text-[10px] font-mono bg-gray-900 px-2 py-1 rounded"
              >
                <Copy className="w-3 h-3" /> Copy Code
              </button>
            </div>
            <pre className="text-[10px] font-mono text-emerald-300 max-h-[140px] overflow-y-auto overflow-x-auto whitespace-pre-wrap leading-tight p-2 bg-black/50 rounded border border-gray-900">
              {codeString}
            </pre>
          </div>
        </div>

        {/* Live Vector View Stage */}
        <div className="flex flex-col items-center justify-center p-8 bg-gray-950/40 border border-gray-900 rounded-xl relative overflow-hidden">
          {/* Grid background simulation */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVector + (loading ? "-loading" : "-ready")}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="z-10 relative flex items-center justify-center min-h-[160px]"
            >
              {loading ? (
                <div className="text-center">
                  <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-3" />
                  <p className="text-xs font-mono text-gray-400">Rendering digital paths...</p>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: codeString }} />
              )}
            </motion.div>
          </AnimatePresence>

          <span className="text-[10px] font-mono text-gray-500 z-10 uppercase mt-4">
            Interactive Live Canvas • 512x512 Pure Vectors
          </span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   5. POSTGEN AI SANDBOX
   ========================================================================== */
function PostGenSandbox() {
  const [platform, setPlatform] = useState<"twitter" | "linkedin" | "instagram">("linkedin");
  const [tone, setTone] = useState("Professional");
  const [topic, setTopic] = useState("Launching Soulverse Digital Marketplace");
  const [generatedPost, setGeneratedPost] = useState("");
  const [writing, setWriting] = useState(false);
  const [copied, setCopied] = useState(false);

  const writeCopy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setWriting(true);

    setTimeout(() => {
      let result = "";
      if (platform === "twitter") {
        result = `🚀 Big news! Today we are officially launching the Soulverse Digital Marketplace!\n\nDiscover world-class Apps, premium UI Kits, robust Flutter/React sources, and optimized AI Prompts in one premium ecosystem. \n\nCheck it out here: soulverseapps.com \n\n#AI #SaaS #TechLauncher`;
      } else if (platform === "linkedin") {
        result = `💡 I am thrilled to share a massive milestone we have reached at Soulverse Apps.\n\nToday, we are officially opening our doors to a global, developer-first Digital Ecosystem and Marketplace! 🌍\n\nOur goal has always been simple: empower developers, creators, and spiritual seekers with premium tools. From high-speed livestream systems (Sehr Live) to interactive voice-coaching AI (Soul Quran AI), we are creating a seamless network of tools.\n\n👉 Join the revolution at: https://soulverseapps.com\n\n#ProductLaunch #Ecosystem #Innovation #Developers`;
      } else {
        result = `✨ THE FUTURE IS HERE! ✨\n\nIntroducing Soulverse Apps — your new digital home for cutting-edge technology, creative source codes, and developer toolkits. 📲💻\n\nSlide into our profile to download Sehr Live, Dramaverse, and Soul Quran AI. Our master marketplace is now LIVE.\n\n🔗 Link in Bio!\n\n#instagram #techgram #soulverse #appstore #developerspace`;
      }
      setGeneratedPost(result);
      setWriting(false);
    }, 1200);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 my-8 max-w-4xl mx-auto">
      <h4 className="text-sm font-bold font-mono text-indigo-400 flex items-center gap-1.5 mb-6">
        <TrendingUp className="w-4 h-4" /> PostGen AI Copywriting & Scheduled Publisher
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Generator panel */}
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono text-gray-500 mb-1">Target Channel</label>
            <div className="grid grid-cols-3 gap-2">
              {(["linkedin", "twitter", "instagram"] as const).map(plat => (
                <button
                  key={plat}
                  type="button"
                  onClick={() => setPlatform(plat)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-bold capitalize transition-all border ${
                    platform === plat 
                      ? "bg-indigo-600 text-white border-indigo-400" 
                      : "bg-gray-950 text-gray-400 border-gray-800"
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-gray-500 mb-1">Tone of Voice</label>
            <select
              value={tone}
              onChange={e => setTone(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-white focus:outline-none"
            >
              <option>Professional</option>
              <option>Viral & Engaging</option>
              <option>Witty & Sarcastic</option>
              <option>Academic & Explanatory</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-gray-500 mb-1">Topic / Core Announcement</label>
            <textarea
              rows={3}
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="What are we announcing today?"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2.5 text-xs text-white focus:outline-none"
            />
          </div>

          <button
            onClick={writeCopy}
            disabled={writing}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {writing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {writing ? "Drafting Content..." : "Generate Social Campaign"}
          </button>
        </div>

        {/* Output simulator */}
        <div className="bg-gray-950 p-5 rounded-xl border border-gray-900 flex flex-col justify-between min-h-[250px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                {platform} Post Preview
              </span>
              {generatedPost && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedPost);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="text-xs text-indigo-400 font-mono hover:underline flex items-center gap-1"
                >
                  {copied ? "Copied!" : "Copy Post"}
                </button>
              )}
            </div>

            {writing ? (
              <div className="py-12 text-center">
                <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-2" />
                <p className="text-xs font-mono text-gray-400">LLM thinking... Crafting high-conversion copies</p>
              </div>
            ) : generatedPost ? (
              <div className="text-xs text-gray-200 font-sans whitespace-pre-wrap leading-relaxed p-3 bg-black/40 rounded border border-gray-900 font-medium">
                {generatedPost}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500 font-mono text-xs border border-dashed border-gray-900 rounded">
                Your high-converting marketing drafts will appear here. Submit a topic to trigger generation.
              </div>
            )}
          </div>

          <div className="text-[10px] text-gray-500 font-mono flex items-center justify-between border-t border-gray-900 pt-3 mt-4">
            <span>Characters: {generatedPost.length}</span>
            <span>Optimized for algorithmic reach</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   6. SOUL QURAN AI SANDBOX
   ========================================================================== */
function SoulQuranSandbox() {
  const [verse, setVerse] = useState("1");
  const [isReciting, setIsReciting] = useState(false);
  const [report, setReport] = useState<{ accuracy: number; rules: string[]; makharij: string; feedback: string } | null>(null);

  const verses = [
    { id: "1", arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful." },
    { id: "2", arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "All praise is due to Allah, Lord of the worlds." },
    { id: "3", arabic: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "The Entirely Merciful, the Especially Merciful." },
    { id: "4", arabic: "مَالِكِ يَوْمِ الدِّينِ", translation: "Sovereign of the Day of Recompense." }
  ];

  const handleRecite = () => {
    setIsReciting(true);
    setReport(null);

    setTimeout(() => {
      setIsReciting(false);
      // Mock vocal assessment report
      setReport({
        accuracy: Math.floor(Math.random() * 8) + 92, // 92% to 99%
        rules: ["Perfect Idgham Shafawi", "Accurate Madd Tabee'ee (2 counts)"],
        makharij: "Laryngeal cavity pronunciation (Halaq) aligned 98% with target acoustic parameters.",
        feedback: "Your elongation on Al-Rahman is flawless. Make sure to keep the vocal resonance deep."
      });
    }, 2500);
  };

  const selectedVerseObj = verses.find(v => v.id === verse) || verses[0];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 my-8 max-w-4xl mx-auto text-center">
      <h4 className="text-sm font-bold font-mono text-cyan-400 flex items-center justify-center gap-1.5 mb-6">
        <Mic className="w-4 h-4" /> Soul Quran AI Tajweed Pronunciation Coach
      </h4>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-[11px] font-mono text-gray-500 mb-2">Select Verse to Recite</label>
          <div className="grid grid-cols-4 gap-2">
            {verses.map(v => (
              <button
                key={v.id}
                onClick={() => {
                  setVerse(v.id);
                  setReport(null);
                }}
                className={`p-2 rounded-lg text-xs font-mono transition-all border ${
                  verse === v.id 
                    ? "bg-cyan-950 text-cyan-400 border-cyan-500" 
                    : "bg-gray-950 text-gray-400 border-gray-900"
                }`}
              >
                Verse {v.id}
              </button>
            ))}
          </div>
        </div>

        {/* Verse Display Area */}
        <div className="bg-gray-950 p-6 rounded-xl border border-gray-900">
          <p className="text-3xl font-serif text-white mb-3 text-right leading-loose" dir="rtl">
            {selectedVerseObj.arabic}
          </p>
          <p className="text-xs text-gray-400 italic font-medium">
            "{selectedVerseObj.translation}"
          </p>
        </div>

        {/* Reciting Status */}
        <div className="flex flex-col items-center justify-center py-4">
          {isReciting ? (
            <div className="space-y-4">
              {/* Fake animated audio wave */}
              <div className="flex gap-1 justify-center items-center h-8">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [8, Math.random() * 32 + 8, 8] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.05 }}
                    className="w-1 bg-cyan-400 rounded-full"
                  />
                ))}
              </div>
              <p className="text-xs font-mono text-cyan-400 animate-pulse">Recite clearly into your microphone... Listening</p>
            </div>
          ) : (
            <button
              onClick={handleRecite}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2 shadow-lg shadow-cyan-950/40"
            >
              <Mic className="w-4 h-4" /> Tap to Start Reciting
            </button>
          )}
        </div>

        {/* Diagnostic Report */}
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left bg-gray-900/60 p-5 rounded-xl border border-gray-800 space-y-3"
          >
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-xs font-mono text-gray-400 font-bold uppercase">Phonetic Tajweed Report</span>
              <span className="text-sm font-mono font-bold text-cyber-500">
                Score: {report.accuracy}% Accuracy
              </span>
            </div>
            
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-gray-500 font-mono block">Makharij Alignment:</span>
                <p className="text-gray-300 font-medium">{report.makharij}</p>
              </div>

              <div>
                <span className="text-gray-500 font-mono block">Applied Rules:</span>
                <div className="flex gap-2 flex-wrap mt-1">
                  {report.rules.map((rule, i) => (
                    <span key={i} className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded text-[10px] border border-cyan-500/20 font-mono">
                      {rule}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-gray-500 font-mono block">Coaching Feedback:</span>
                <p className="text-gray-300 italic">"{report.feedback}"</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   7. DEVELOPER HUB SANDBOX
   ========================================================================== */
function DeveloperHubSandbox() {
  const [apiKey, setApiKey] = useState("");
  const [logs, setLogs] = useState<{ id: string; method: string; path: string; status: number; time: string }[]>([
    { id: "1", method: "GET", path: "/v1/licenses/verify", status: 200, time: "10:14:02 AM" },
    { id: "2", method: "POST", path: "/v1/webhooks/stripe", status: 201, time: "10:15:44 AM" }
  ]);

  const generateKey = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "sv_live_";
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setApiKey(key);
    
    // Add generation log
    setLogs(prev => [
      { id: String(Date.now()), method: "POST", path: "/v1/keys/generate", status: 200, time: new Date().toLocaleTimeString() },
      ...prev
    ]);
  };

  const simulateAPIRequest = () => {
    if (!apiKey) return;
    setLogs(prev => [
      { id: String(Date.now()), method: "GET", path: "/v1/apps/details/sehr-live", status: 200, time: new Date().toLocaleTimeString() },
      ...prev
    ]);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-gray-800 my-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3">
        <Terminal className="w-5 h-5 text-brand-400" />
        <h4 className="text-sm font-bold font-mono text-white">Developer Platform & Subdomain API Sandbox</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* API Key management */}
        <div className="space-y-4">
          <div className="bg-gray-950 p-4 rounded-xl border border-gray-900">
            <h5 className="text-xs font-mono text-gray-300 font-bold mb-2">Licensing API Keys</h5>
            <p className="text-xs text-gray-500 mb-3">Create license tokens to authorize Sehr Live Pro, Dramaverse, or template source plugins.</p>
            
            {apiKey ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={apiKey}
                  className="flex-1 bg-black border border-gray-800 rounded-lg p-2 text-xs font-mono text-brand-300"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(apiKey);
                  }}
                  className="bg-gray-900 hover:bg-gray-800 text-gray-300 p-2 rounded-lg border border-gray-800 transition-all text-xs"
                >
                  Copy
                </button>
              </div>
            ) : (
              <button
                onClick={generateKey}
                className="bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold px-4 py-2.5 rounded-lg transition-all"
              >
                Create API Token
              </button>
            )}

            {apiKey && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={simulateAPIRequest}
                  className="bg-brand-600/20 hover:bg-brand-600/30 text-brand-400 border border-brand-500/20 font-mono text-[11px] px-3 py-1.5 rounded-lg transition-all"
                >
                  Simulate API Request
                </button>
                <button
                  onClick={() => setApiKey("")}
                  className="text-gray-500 hover:text-gray-400 text-[11px] font-mono px-2"
                >
                  Revoke Key
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-950 p-4 rounded-xl border border-gray-900 space-y-2">
            <h5 className="text-xs font-mono text-gray-300 font-bold">API Endpoints (v1)</h5>
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="flex justify-between p-1.5 bg-black/40 rounded border border-gray-900">
                <span className="text-cyber-500">GET</span>
                <span className="text-gray-400">api.soulverseapps.com/v1/apps</span>
                <span className="text-gray-500">Public</span>
              </div>
              <div className="flex justify-between p-1.5 bg-black/40 rounded border border-gray-900">
                <span className="text-brand-400">POST</span>
                <span className="text-gray-400">api.soulverseapps.com/v1/licenses</span>
                <span className="text-gray-500">Requires Token</span>
              </div>
              <div className="flex justify-between p-1.5 bg-black/40 rounded border border-gray-900">
                <span className="text-amber-400">PUT</span>
                <span className="text-gray-400">api.soulverseapps.com/v1/user/wallet</span>
                <span className="text-gray-500">OAuth Only</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real time logging terminal */}
        <div className="bg-black p-5 rounded-xl border border-gray-900 flex flex-col justify-between min-h-[250px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-cyber-500 rounded-full"></span>
                api.soulverseapps.com logs
              </span>
              <button 
                onClick={() => setLogs([])}
                className="text-[9px] font-mono text-gray-500 hover:text-gray-400"
              >
                Clear Terminal
              </button>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[180px]">
              {logs.length > 0 ? (
                logs.map(log => (
                  <div key={log.id} className="font-mono text-[11px] leading-tight flex items-start gap-2 text-gray-300">
                    <span className="text-gray-500">[{log.time}]</span>
                    <span className={log.method === "GET" ? "text-cyber-500" : "text-brand-400"}>{log.method}</span>
                    <span className="text-gray-400 flex-1">{log.path}</span>
                    <span className="text-cyber-500 font-bold">{log.status}</span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-600 font-mono text-xs">
                  Terminal listening for telemetry pings...
                </div>
              )}
            </div>
          </div>

          <div className="text-[9px] text-gray-500 font-mono border-t border-gray-900 pt-3 mt-4">
            Node: Asia-SouthEast-1 • Ping: 22ms • Gateway status: ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
}
