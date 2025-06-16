import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useCallback, useMemo } from "react";
import { X, Zap, Shield, Users, MessageSquare, Eye, Copy, Brain, CheckCircle, Lock, ExternalLink, Rocket, Target, Database } from "lucide-react";
import './App.css';

interface Tool {
  id: number;
  name: string;
  desc: string;
  price: string;
  icon: React.ComponentType<any>;
  badge?: string;
  detailedDesc?: string;
  whatYouGet?: string;
}

interface LockedTool {
  id: number;
  name: string;
  subtitle: string;
  icon: React.ComponentType<any>;
}

export default function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [contact, setContact] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'solana' | 'ethereum'>('solana');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const solanaAddress = "3tTShbEpdB9F8Lu4eyCrrnRUvssXUDr6n7hNnk4R6kB6";
  const ethereumAddress = "0xd8567Be0Fe08f8ED100BF20e0Cd8EcC4F85da2C0";

  // Memoize tools data to prevent unnecessary re-renders
  const tools: Tool[] = useMemo(() => [
    {
      id: 1,
      name: "Outreach Pack Generator",
      desc: "Cold email, WhatsApp, and DM packs crafted for high hit-rates. Plug in your target, get heat back.",
      price: "$12",
      icon: MessageSquare,
      badge: "Popular",
      detailedDesc: "A custom-crafted set of cold email, WhatsApp, and DM messages made for founders, creators, and builders. Tailored to your niche, these packs plug into your workflow and get replies fast.",
      whatYouGet: "Personalized outreach pack (Email, WhatsApp, DM) based on your niche + target. Built to boost response rates, crypto-native style."
    },
    {
      id: 2,
      name: "Inbox Cleaner Kit",
      desc: "Auto-delete spam, sort messages, and auto-respond with AI in your Telegram, WhatsApp, or Discord.",
      price: "$10",
      icon: Shield,
      detailedDesc: "Clean up your chaos. This kit auto-sorts, deletes spam, and auto-replies using AI inside your Telegram, WhatsApp, or Discord. Built for degens, founders, or ops running multiple channels.",
      whatYouGet: "Auto-clean setup + AI responder config. Delivered as ready-to-plug-in scripts with setup instructions for your preferred app."
    },
    {
      id: 3,
      name: "NoMod Stealth Suite",
      desc: "For degens who want no noise. Temp emails, burner chats, stealth forms – all in one dark kit.",
      price: "$9",
      icon: Eye,
      badge: "Stealth",
      detailedDesc: "Total stealth mode. Use temp email, burner chat, and stealth form tools to stay off the grid. No names, no noise, no trace. Built for low-profile drops, shadow testing, or underground ops.",
      whatYouGet: "Toolkit includes 1 temp email, 1 stealth burner chat config, and a no-trace form you can drop anywhere."
    },
    {
      id: 4,
      name: "AI Drop Composer",
      desc: "Auto-create tweet/X threads and replies for your project. Keyword-rich, viral-ready.",
      price: "$7",
      icon: Zap,
      detailedDesc: "Write viral X threads, drops, or update announcements with AI. Just input your project name or keywords — get sharp, attention-grabbing content that sounds human, not botted.",
      whatYouGet: "AI config + prompt list + custom thread drafts. Drop-ready for degen Twitter/X heat."
    },
    {
      id: 5,
      name: "Burner Form Link",
      desc: "Create a custom form link with stealth submission, no trace, no storage. Client fills it, you get the fire.",
      price: "$6",
      icon: Users,
      detailedDesc: "Create a stealth form link where your buyer can drop info with zero trace. Great for anonymous client ops, private surveys, or unlogged requests. No storage, no trail — just the fire.",
      whatYouGet: "1 stealth form setup (custom question text) + redirect logic. Includes burner inbox delivery."
    },
    {
      id: 6,
      name: "Degen AI Assistant",
      desc: "A crypto-trained AI agent that answers ops questions, drops alerts, and helps you move faster. Built for degen chaos.",
      price: "$11",
      icon: Brain,
      badge: "AI Powered",
      detailedDesc: "A lightweight agent trained for the crypto trenches. It handles token alerts, roadmap breakdowns, and even helps with launch ideas or threads.",
      whatYouGet: "Ready-to-use AI config + premium prompts. Drop into ChatGPT Plus or your own Telegram bot for instant crypto intelligence."
    }
  ], []);

  // Memoize locked tools data
  const lockedTools: LockedTool[] = useMemo(() => [
    {
      id: 7,
      name: "Launch Sequence Automator",
      subtitle: "Auto-schedule drops, tweets, and community pings for your next launch",
      icon: Rocket
    },
    {
      id: 8,
      name: "Whale Tracker Pro",
      subtitle: "Real-time alerts when big wallets move in your target tokens",
      icon: Target
    },
    {
      id: 9,
      name: "Shadow Database Kit",
      subtitle: "Store and query data without leaving traces or logs anywhere",
      icon: Database
    }
  ], []);

  // Optimized handlers with useCallback to prevent unnecessary re-renders
  const handleBuy = useCallback((tool: Tool) => {
    setSelectedTool(tool);
    setPaymentMethod('solana');
    setContact("");
    setAdditionalNotes("");
    setTransactionId("");
  }, []);

  const copyWalletAddress = useCallback(() => {
    const address = paymentMethod === 'solana' ? solanaAddress : ethereumAddress;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [paymentMethod, solanaAddress, ethereumAddress]);

  const handleOrderSubmit = useCallback(async () => {
    if (!selectedTool || !contact.trim() || !transactionId.trim()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        product: selectedTool.name,
        delivery_contact: contact.trim(),
        additional_notes: additionalNotes.trim() || "",
        transaction_id: transactionId.trim(),
        payment_chain: paymentMethod === 'solana' ? 'Solana' : 'Ethereum'
      };

      const response = await fetch('https://hook.eu2.make.com/qt4873sx3kminb2yge5v2pglwogjhl52', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSelectedTool(null);
        setShowSuccessModal(true);
        setContact("");
        setAdditionalNotes("");
        setTransactionId("");
        setPaymentMethod('solana');
      } else {
        console.error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedTool, contact, additionalNotes, transactionId, paymentMethod]);

  const closeSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedTool(null);
  }, []);

  const handlePaymentMethodChange = useCallback((method: 'solana' | 'ethereum') => {
    setPaymentMethod(method);
  }, []);

  // Memoize form validation
  const isFormValid = useMemo(() => contact.trim() && transactionId.trim(), [contact, transactionId]);

  // Memoize wallet address
  const currentWalletAddress = useMemo(() => 
    paymentMethod === 'solana' ? solanaAddress : ethereumAddress, 
    [paymentMethod, solanaAddress, ethereumAddress]
  );

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Optimized Background Effects - Using transform3d for hardware acceleration */}
      <div className="fixed inset-0 w-full h-full bg-black will-change-transform" />
      <div className="fixed inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent pointer-events-none will-change-transform" />
      <div className="fixed inset-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none will-change-transform" />
      
      <div className="relative z-10 w-full max-w-none px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Optimized Header */}
        <header className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center will-change-transform">
              <Zap className="w-3 h-3 sm:w-5 sm:h-5 text-black" />
            </div>
            <h1 className="fireprint-title text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-green-200 to-green-400 bg-clip-text text-transparent">
              FirePrint
            </h1>
          </div>
          <p className="crypto-subtitle text-lg sm:text-xl md:text-2xl font-semibold text-green-400 mb-3 md:mb-4">
            Darkflow Ops
          </p>
          <p className="underground-text text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed px-2">
            Crypto-native utilities for Nomads, Degens, and Underground Ops. 
            Built for those who operate in the shadows.
          </p>
        </header>

        {/* Underground Tools Grid with Hidden Headlines - Mobile & Desktop */}
        <section className="w-full max-w-6xl mx-auto mb-16 md:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-green-500/50 active:border-green-500/50 cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/20 active:shadow-2xl active:shadow-green-500/20 relative overflow-hidden will-change-transform"
                  onClick={() => handleBuy(tool)}
                >
                  {/* Enhanced Underground Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 will-change-transform" />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 will-change-transform" />
                  
                  <CardContent className="p-4 sm:p-6 relative z-10">
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center group-hover:from-green-500/40 group-hover:to-green-600/40 group-hover:scale-110 group-active:from-green-500/40 group-active:to-green-600/40 group-active:scale-110 transition-all duration-500 will-change-transform">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 group-hover:text-green-300 group-active:text-green-300 transition-colors duration-500" />
                      </div>
                      {tool.badge && (
                        <Badge variant="secondary" className="badge-text bg-green-500/20 text-green-300 border-green-500/30 text-xs group-hover:bg-green-500/30 group-hover:border-green-400/50 group-hover:text-green-200 group-active:bg-green-500/30 group-active:border-green-400/50 group-active:text-green-200 transition-all duration-500">
                          {tool.badge}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Underground Hidden Title - 90% Invisible by Default on ALL devices */}
                    <h3 className="underground-title text-lg sm:text-xl font-bold mb-2 sm:mb-3 leading-tight transition-all duration-500 opacity-10 group-hover:opacity-100 group-active:opacity-100 group-hover:text-green-300 group-active:text-green-300 group-hover:scale-105 group-active:scale-105 group-hover:text-shadow-glow group-active:text-shadow-glow transform-gpu">
                      {tool.name}
                    </h3>
                    
                    <p className="underground-text text-zinc-400 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 group-hover:text-zinc-300 group-active:text-zinc-300 transition-colors duration-500">
                      {tool.desc}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="price-text text-xl sm:text-2xl font-bold text-green-400 group-hover:text-green-300 group-active:text-green-300 group-hover:scale-105 group-active:scale-105 transition-all duration-500">
                        {tool.price}
                      </span>
                      <span className="badge-text text-xs text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-full group-hover:bg-zinc-700/70 group-hover:text-zinc-400 group-active:bg-zinc-700/70 group-active:text-zinc-400 transition-all duration-500">
                        crypto only
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Optimized Gatekeeper Divider */}
        <section className="w-full max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-orange-900/20 to-red-900/10 backdrop-blur-sm rounded-2xl border border-red-500/20 will-change-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent rounded-2xl will-change-transform" />
            
            <div className="relative z-10 text-center py-8 sm:py-12 px-6 sm:px-8">
              <div className="space-y-2">
                <div className="gatekeeper-text text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                    🔥 FirePrint isn't for everyone.
                  </span>
                </div>
                <div className="gatekeeper-text text-xl sm:text-2xl md:text-3xl font-bold">
                  <span className="bg-gradient-to-r from-orange-300 via-red-300 to-orange-400 bg-clip-text text-transparent">
                    It's only for those who actually move.
                  </span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <div className="bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1">
                  <span className="badge-text text-red-400 text-xs font-medium tracking-wider">
                    Classified Ops
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Optimized Locked Tools Section */}
        <section className="w-full max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="crypto-subtitle text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent">
                Want More Fire? 🔥
              </span>
            </h2>
            <p className="crypto-subtitle text-lg sm:text-xl font-semibold text-orange-400 mb-2">
              Add Drops to Your Chamber
            </p>
            <p className="underground-text text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
              Premium tools in development. Coming soon for the underground ops community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {lockedTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="relative bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 overflow-hidden will-change-transform"
                >
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 will-change-transform" />
                  
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-8 h-8 bg-zinc-800/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-zinc-700">
                      <Lock className="w-4 h-4 text-zinc-400" />
                    </div>
                  </div>
                  
                  <CardContent className="p-4 sm:p-6 relative">
                    <div className="mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400/70" />
                      </div>
                    </div>
                    
                    <h3 className="card-title text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-zinc-300/70 leading-tight">
                      {tool.name}
                    </h3>
                    <p className="underground-text text-zinc-500 text-sm leading-relaxed mb-4">
                      {tool.subtitle}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="badge-text text-sm text-zinc-600 bg-zinc-800/30 px-2 py-1 rounded-full">
                        coming soon
                      </span>
                      <span className="underground-text text-xs text-zinc-600">
                        🔥 fire incoming
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Optimized CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto will-change-transform">
              <div className="mb-6">
                <h3 className="cta-title text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Got Ideas? Or Ready to Unlock a New Tool? 🔥
                </h3>
                <p className="underground-text text-zinc-400 text-sm sm:text-base leading-relaxed">
                  Drop into our Telegram to suggest new tools, request custom builds, or get early access to locked chambers.
                </p>
              </div>
              
              <Button 
                asChild
                className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-semibold py-3 px-6 transition-all duration-200 group will-change-transform"
              >
                <a 
                  href="https://t.me/FirePrintOrders" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Join FirePrint Telegram
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </Button>
              
              <p className="underground-text text-xs text-zinc-500 mt-4">
                🔥 Where the real fire gets dropped first
              </p>
            </div>
          </div>
        </section>

        {/* Optimized Purchase Modal */}
        {selectedTool && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto will-change-transform">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative my-4 will-change-transform">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10 rounded-2xl will-change-transform" />
              
              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center shrink-0">
                      <selectedTool.icon className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="modal-title text-xl sm:text-2xl font-bold text-white leading-tight">{selectedTool.name}</h2>
                      <p className="price-text text-green-400 font-semibold">{selectedTool.price}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800 shrink-0 ml-2 transition-colors duration-200"
                    onClick={closeModal}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="mb-6 space-y-3">
                  <p className="underground-text text-zinc-300 leading-relaxed text-sm sm:text-base">
                    {selectedTool.detailedDesc || selectedTool.desc}
                  </p>
                  {selectedTool.whatYouGet && (
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 sm:p-4">
                      <p className="underground-text text-zinc-300 text-sm leading-relaxed">
                        🧩 <strong>What you get:</strong> {selectedTool.whatYouGet}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-300 mb-3">
                    Delivery Contact (Telegram @handle or email) *
                  </label>
                  <Input
                    placeholder="@yourhandle or email@domain.com"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500 focus:border-green-500 focus:ring-green-500/20 text-sm sm:text-base transition-colors duration-200"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-300 mb-3">
                    Additional Notes (optional)
                  </label>
                  <Input
                    placeholder="e.g. niche, config request, use-case, or any other detail"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500 focus:border-green-500 focus:ring-green-500/20 text-sm sm:text-base transition-colors duration-200"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-300 mb-3">
                    Paste your transaction ID *
                  </label>
                  <Input
                    placeholder="0x... / paste Solscan or Etherscan hash"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="hacker-mono bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500 focus:border-green-500 focus:ring-green-500/20 text-sm sm:text-base transition-colors duration-200"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-300 mb-3">
                    Payment Method
                  </label>
                  <div className="flex bg-zinc-800 rounded-lg p-1">
                    <button
                      onClick={() => handlePaymentMethodChange('solana')}
                      className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                        paymentMethod === 'solana'
                          ? 'bg-green-600 text-white shadow-md'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                      }`}
                    >
                      Solana
                    </button>
                    <button
                      onClick={() => handlePaymentMethodChange('ethereum')}
                      className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                        paymentMethod === 'ethereum'
                          ? 'bg-green-600 text-white shadow-md'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                      }`}
                    >
                      Ethereum
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="underground-text text-sm text-zinc-400 mb-3">
                      Send payment to {paymentMethod === 'solana' ? 'Solana' : 'Ethereum'} address:
                    </p>
                    <div className="bg-zinc-800 border border-zinc-600 rounded-lg p-3 sm:p-4 flex items-center gap-2">
                      <code className="hacker-mono text-green-400 text-xs sm:text-sm break-all flex-1 leading-relaxed">
                        {currentWalletAddress}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyWalletAddress}
                        className="text-zinc-400 hover:text-green-400 shrink-0 p-2 transition-colors duration-200"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    {copied && (
                      <p className="underground-text text-green-400 text-xs mt-2">Address copied!</p>
                    )}
                    <p className="underground-text text-xs text-zinc-500 mt-2 leading-relaxed">
                      {paymentMethod === 'solana' 
                        ? 'Send USDC/USDT on Solana chain only.'
                        : 'Use ERC20 only (no BEP20 or other chains).'
                      }
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleOrderSubmit}
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full font-semibold py-3 transition-all duration-200 text-sm sm:text-base ${
                      isFormValid && !isSubmitting
                        ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-black'
                        : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Submitting Order...' : 'Confirm Order & Await Delivery'}
                  </Button>
                  
                  <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-3 sm:p-4">
                    <p className="underground-text text-xs text-zinc-400 text-center leading-relaxed">
                      <strong className="text-zinc-300">Your toolkit will be delivered within 24h after payment confirmation.</strong><br />
                      All transactions are reviewed manually.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Optimized Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 will-change-transform">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md relative overflow-hidden will-change-transform">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 rounded-2xl will-change-transform" />
              
              <div className="relative z-10 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                
                <div className="mb-8">
                  <div className="text-2xl mb-4">🔥</div>
                  <h3 className="success-title text-xl font-bold text-white mb-3">Order received.</h3>
                  <p className="underground-text text-zinc-300 leading-relaxed">
                    We'll verify the transaction and drop your delivery within 24h.
                  </p>
                </div>
                
                <Button 
                  onClick={closeSuccessModal}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-black font-semibold py-3 transition-all duration-200"
                >
                  ✅ Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}