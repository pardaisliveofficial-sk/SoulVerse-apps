import React, { useState } from "react";
import { 
  X, 
  CreditCard, 
  Wallet, 
  Tag, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Smartphone, 
  RefreshCw,
  Gift,
  ArrowRight
} from "lucide-react";
import { Product, CartItem, Coupon } from "../types";
import { initialCoupons } from "../mockData";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  userWalletBalance: number;
  onSuccess: (paymentMethod: string, total: number) => void;
}

export default function CheckoutGateway({ 
  isOpen, 
  onClose, 
  cartItems, 
  userWalletBalance, 
  onSuccess 
}: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("stripe");
  const [promoCode, setPromoCode] = useState<string>("");
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [promoError, setPromoError] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<{ invoiceNum: string; totalPaid: number; downPayment: number; remainingPayment: number } | null>(null);

  if (!isOpen) return null;

  const baseTotal = cartItems.reduce((acc, item) => {
    const price = item.product.discountPrice !== undefined ? item.product.discountPrice : item.product.price;
    return acc + (price * item.quantity);
  }, 0);

  const discountPercent = activeCoupon ? activeCoupon.discountPercent : 0;
  const discountAmount = (baseTotal * discountPercent) / 100;
  const finalTotal = baseTotal - discountAmount;
  
  // 50% Downpayment split configuration
  const downPayment = finalTotal / 2;
  const remainingPayment = finalTotal / 2;

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const matched = initialCoupons.find(c => c.code.toUpperCase() === promoCode.trim().toUpperCase() && c.isActive);
    if (matched) {
      setActiveCoupon(matched);
      setPromoCode("");
    } else {
      setPromoError("Invalid or expired coupon code.");
    }
  };

  const handleCheckout = () => {
    if (!agreedToTerms) {
      alert("Please accept the 50/50 Downpayment & Delivery terms agreement first.");
      return;
    }

    if (paymentMethod === "wallet" && userWalletBalance < downPayment) {
      alert("Insufficient Soulverse wallet balance for the 50% downpayment.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const invoiceNum = "SV-" + Math.floor(100000 + Math.random() * 900000);
      setReceipt({
        invoiceNum,
        totalPaid: finalTotal,
        downPayment,
        remainingPayment
      });
    }, 2000);
  };

  const completeAndClose = () => {
    onSuccess(paymentMethod, finalTotal);
    setReceipt(null);
    setActiveCoupon(null);
    setAgreedToTerms(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-dark-900 border border-gray-750 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-800 bg-gray-950/40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            <h3 className="font-bold text-white tracking-tight">Secure Checkout Gateway</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-gray-900/60 p-2 rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {receipt ? (
            /* Success Receipt */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-cyber-500/10 border border-cyber-500/30 rounded-full flex items-center justify-center mx-auto text-cyber-500">
                <CheckCircle className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-white font-sans">50% Downpayment Received!</h4>
                <p className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-wider">Order Status: PENDING DELIVERY</p>
              </div>
              <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                Thank you! Your 50% downpayment is verified. Your custom codebase delivery has been scheduled. Our team will contact you and deliver the code within 24 to 48 hours.
              </p>

              <div className="bg-gray-950 p-5 rounded-2xl border border-gray-900 max-w-md mx-auto text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Invoice ID</span>
                  <span className="text-white font-bold">{receipt.invoiceNum}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Gateway Provider</span>
                  <span className="text-white font-bold capitalize">{paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t border-gray-900/60 pt-2.5">
                  <span className="text-gray-500 font-bold">50% Paid (Now)</span>
                  <span className="text-brand-400 font-extrabold">${receipt.downPayment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">50% Due (On Delivery)</span>
                  <span className="text-amber-500 font-extrabold">${receipt.remainingPayment.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-900/60 pt-2.5">
                  <span className="text-gray-500">Official Contact</span>
                  <span className="text-white font-bold">solv@gmail.com</span>
                </div>
                <div className="bg-black/40 border border-dashed border-gray-800 p-2.5 rounded-lg text-[10px] text-gray-400 mt-2 text-center leading-normal">
                  ⏳ <strong>Delivery Timeframe:</strong> 24 - 48 Hours. The remaining 50% payment is due once we supply you with the clean build zip files and setup instructions.
                </div>
              </div>

              <button
                onClick={completeAndClose}
                className="bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold px-6 py-3 rounded-xl transition-all inline-flex items-center gap-1.5 shadow-lg shadow-brand-950"
              >
                Go to My License Hub <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : isProcessing ? (
            /* Loading Spinner */
            <div className="text-center py-16 space-y-4">
              <RefreshCw className="w-12 h-12 text-brand-500 animate-spin mx-auto mb-2" />
              <h4 className="text-base font-bold text-white font-mono">Securing Gateway Transaction...</h4>
              <p className="text-xs text-gray-500">Encrypting token assets, routing 50% split billing hooks with {paymentMethod}</p>
            </div>
          ) : (
            /* Main Checkout Flow */
            <div className="space-y-6">
              
              {/* Cart Summary */}
              <div className="bg-gray-950/60 p-5 rounded-2xl border border-gray-900 space-y-3">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">Order Summary</h4>
                <div className="space-y-1.5">
                  {cartItems.map(item => {
                    const price = item.product.discountPrice !== undefined ? item.product.discountPrice : item.product.price;
                    return (
                      <div key={item.product.id} className="flex justify-between text-xs font-medium">
                        <span className="text-gray-300">{item.product.name} (x{item.quantity})</span>
                        <span className="text-white font-mono">${(price * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
                
                {activeCoupon && (
                  <div className="flex justify-between text-xs text-cyber-500 font-bold bg-cyber-500/10 p-2.5 rounded-xl border border-cyber-500/20">
                    <span className="flex items-center gap-1"><Gift className="w-3.5 h-3.5" /> Code: {activeCoupon.code}</span>
                    <span className="font-mono">-{activeCoupon.discountPercent}% OFF</span>
                  </div>
                )}

                <div className="border-t border-gray-900 pt-3 space-y-2">
                  <div className="flex justify-between text-xs font-medium text-gray-400">
                    <span>Full Total Price</span>
                    <span className="font-mono">${finalTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-brand-400 font-bold">
                    <span>50% Downpayment Due (Now)</span>
                    <span className="font-mono">${downPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-amber-500 font-bold">
                    <span>50% Balance (On Delivery)</span>
                    <span className="font-mono">${remainingPayment.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-900 pt-2.5 flex justify-between text-sm font-extrabold text-white">
                    <span>Payable Now</span>
                    <span className="font-mono text-brand-400">
                      ${downPayment.toFixed(2)} <span className="text-[10px] text-gray-500 font-normal"> (~PKR {(downPayment * 280).toLocaleString()})</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo Coupon Form */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="Enter Coupon (e.g., SOULFIRST)"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none"
                  />
                  {promoError && (
                    <span className="absolute left-0 -bottom-5 text-[10px] text-rose-500 font-mono">
                      {promoError}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 rounded-xl px-4 py-2 text-xs font-mono font-bold transition-all"
                >
                  Apply Promo
                </button>
              </form>

              {/* Gateway Provider Selection */}
              <div className="space-y-2 pt-2">
                <label className="block text-[11px] font-mono text-gray-500 uppercase tracking-wider">Select Billing Gateway</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: "stripe", label: "Credit / Debit Card", icon: <CreditCard className="w-4 h-4" /> },
                    { id: "easypaisa", label: "EasyPaisa Pakistan", icon: <Smartphone className="w-4 h-4 text-emerald-400" /> },
                    { id: "jazzcash", label: "JazzCash Pakistan", icon: <Smartphone className="w-4 h-4 text-amber-400" /> },
                    { id: "paypal", label: "PayPal Express", icon: <CreditCard className="w-4 h-4 text-blue-400" /> },
                    { id: "wallet", label: "Soulverse Wallet", icon: <Wallet className="w-4 h-4 text-brand-400" /> },
                    { id: "playstore", label: "Google Play In-App", icon: <Smartphone className="w-4 h-4" /> }
                  ].map(gateway => (
                    <button
                      key={gateway.id}
                      onClick={() => setPaymentMethod(gateway.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                        paymentMethod === gateway.id 
                          ? "bg-brand-600/10 border-brand-500 text-brand-400" 
                          : "bg-gray-950/60 border-gray-900 text-gray-400 hover:border-gray-800"
                      }`}
                    >
                      {gateway.icon}
                      <span className="text-[11px] font-bold font-sans tracking-tight">{gateway.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gateway details simulation */}
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-900">
                {paymentMethod === "stripe" && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Stripe Card Secure Vault</span>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={e => {
                        // Format credit card numbers nicely
                        const val = e.target.value.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim();
                        setCardNumber(val);
                      }}
                      placeholder="Card Number: 4111 2222 3333 4444"
                      className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white placeholder-gray-700 font-mono"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="MM/YY" maxLength={5} className="bg-black border border-gray-800 rounded-lg p-2 text-xs text-white placeholder-gray-700 font-mono text-center" />
                      <input type="password" placeholder="CVC" maxLength={3} className="bg-black border border-gray-800 rounded-lg p-2 text-xs text-white placeholder-gray-700 font-mono text-center" />
                    </div>
                  </div>
                )}

                {paymentMethod === "easypaisa" && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block">EasyPaisa Mobile Banking</span>
                    <p className="text-[11px] text-gray-400">Enter your EasyPaisa account number. You will receive an instant push-authorization request on your mobile device.</p>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={e => setMobileNumber(e.target.value)}
                      placeholder="e.g. 03451234567"
                      className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white placeholder-gray-700 font-mono"
                    />
                  </div>
                )}

                {paymentMethod === "jazzcash" && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase block">JazzCash Wallet System</span>
                    <p className="text-[11px] text-gray-400">Enter your registered JazzCash phone number to process direct invoice authorization.</p>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={e => setMobileNumber(e.target.value)}
                      placeholder="e.g. 03001234567"
                      className="w-full bg-black border border-gray-800 rounded-lg p-2 text-xs text-white placeholder-gray-700 font-mono"
                    />
                  </div>
                )}

                {paymentMethod === "wallet" && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-brand-400 uppercase block">Internal Soul Wallet Deduction</span>
                    <p className="text-xs text-gray-300">
                      We will debit <strong className="text-white">${downPayment.toFixed(2)}</strong> (50% downpayment) directly from your dashboard wallet.
                    </p>
                    <p className="text-[10px] text-gray-500 font-mono">Current Wallet balance: ${userWalletBalance.toFixed(2)}</p>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <p className="text-xs text-gray-400 italic">Redirecting to verified PayPal checkout popup in secure sandboxed container environment.</p>
                )}

                {paymentMethod === "playstore" && (
                  <p className="text-xs text-gray-400 italic">Injecting native Google Play overlay. Authorized via standard fingerprint or device password.</p>
                )}
              </div>

              {/* 50/50 Contract Agreement Box */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 space-y-3">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-amber-400 font-sans">Soulverse 50/50 Code & Assets Agreement</h5>
                    <p className="text-[11px] text-gray-400 leading-normal">
                      By checking the box below, you establish a trusted developer contract. You agree to pay exactly <strong>50% now</strong> as a downpayment. We commit to compiling, preparing, and delivering the complete codebase and technical files to your profile within <strong>24 to 48 Hours</strong>. The remaining <strong>50% is payable upon delivery</strong> of your download binaries.
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Official Contact Email: <strong className="text-white">solv@gmail.com</strong>
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-2.5 bg-black/40 p-2.5 rounded-xl border border-gray-900 cursor-pointer hover:bg-black/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={e => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-500 border-gray-800 bg-black focus:ring-0 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-gray-300 leading-none">
                    I accept the 50/50 downpayment agreement and scheduled delivery window.
                  </span>
                </label>
              </div>

              {/* Action trigger button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-mono text-xs font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" /> Authorize Split Downpayment of ${downPayment.toFixed(2)}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
