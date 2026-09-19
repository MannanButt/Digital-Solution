"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Clock3, CreditCard, MessageCircle, Minus, Plus, Search, ShieldCheck, ShoppingBag, Upload, X } from "lucide-react";
import { AgencyFooter } from "@/src/components/layout/AgencyFooter";
import { ServicePageHeader } from "./ServicePageHeader";
import { softwareTools, toolCategories, toolLogoSources, type SoftwareTool } from "@/src/features/services/data/softwareToolsData";

type CartItem = SoftwareTool & { quantity: number };
type PaymentMethod = "Easypaisa" | "JazzCash" | "NayaPay";

const SUPPORT_WHATSAPP = "923096548143";
const formatPkr = (value: number) => `Rs ${value.toLocaleString("en-PK")}`;
const getSavings = (tool: SoftwareTool) => Math.round((1 - tool.price / tool.originalPrice) * 100);

export function SoftwareToolsView() {
  const [activeCategory, setActiveCategory] = useState<(typeof toolCategories)[number]>("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Easypaisa");
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [cancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);

  useEffect(() => {
    if (!checkoutOpen || secondsLeft === 0) return;
    const timer = window.setInterval(() => setSecondsLeft((time) => Math.max(0, time - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [checkoutOpen, secondsLeft]);

  const visibleTools = useMemo(() => softwareTools.filter((tool) => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    const searchable = `${tool.name} ${tool.plan} ${tool.category}`.toLowerCase();
    return matchesCategory && searchable.includes(query.trim().toLowerCase());
  }), [activeCategory, query]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const timer = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  function addToCart(tool: SoftwareTool) {
    setCart((items) => {
      const existing = items.find((item) => item.id === tool.id);
      return existing ? items.map((item) => item.id === tool.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...tool, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function updateQuantity(id: string, nextQuantity: number) {
    setCart((items) => nextQuantity < 1 ? items.filter((item) => item.id !== id) : items.map((item) => item.id === id ? { ...item, quantity: nextQuantity } : item));
  }

  function startCheckout() {
    setCartOpen(false);
    setCheckoutOpen(true);
    setSecondsLeft(5 * 60);
    setReceiptFile(null);
    setVerificationStatus("");
  }

  function cancelOrder() {
    setCart([]);
    setCartOpen(false);
    setCheckoutOpen(false);
    setCancelConfirmationOpen(false);
    setReceiptFile(null);
    setVerificationStatus("");
  }

  function selectReceipt(file: File | null) {
    setVerificationStatus("");
    if (!file) {
      setReceiptFile(null);
      return;
    }
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
      setReceiptFile(null);
      setVerificationStatus("Upload a PNG, JPG or WebP receipt under 10 MB.");
      return;
    }
    setReceiptFile(file);
  }

  async function sendForVerification() {
    if (!receiptFile || secondsLeft === 0) return;
    const orderLines = cart.map((item) => `${item.name} (${item.plan}) × ${item.quantity}`).join("\n");
    const message = [
      "Assalam-o-Alaikum Digital Solutions,",
      "I have completed payment and want verification.",
      `Payment method: ${paymentMethod}`,
      `Amount: ${formatPkr(cartTotal)}`,
      `Order:\n${orderLines}`,
      "I will attach the selected transaction receipt in WhatsApp.",
    ].join("\n\n");

    const shareData: ShareData = { title: "Digital Solutions payment verification", text: message, files: [receiptFile] };
    try {
      if (navigator.share && navigator.canShare?.({ files: [receiptFile] })) {
        await navigator.share(shareData);
        setVerificationStatus("Receipt shared. Our team will verify your payment shortly.");
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }

    window.open(`https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setVerificationStatus("WhatsApp opened. Attach the selected receipt before sending.");
  }

  return (
    <div className="ds-store-page" id="top">
      <ServicePageHeader backHref="/#services" backLabel="Back to Services" />

      <main>
        <section className="ds-store-catalog" id="catalog">
          <div className="ds-store-shell">
            <div className="ds-store-catalog-heading">
              <div><p className="ds-store-eyebrow ds-store-eyebrow--dark"><span /> Curated catalog</p><h2>Find the tool that fits.</h2></div>
              <p>Simple plans, clear terms, and help from a real person—not a confusing marketplace.</p>
            </div>
            <div className="ds-store-filter-bar">
              <label className="ds-store-search"><Search size={18} /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ChatGPT, Canva, Cursor…" /></label>
              <div className="ds-store-category-tabs" role="tablist" aria-label="Catalog categories">
                {toolCategories.map((category) => <button type="button" key={category} className={activeCategory === category ? "is-active" : ""} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}
              </div>
            </div>
            <div className="ds-store-results"><span>{visibleTools.length} tools available</span><span>Prices in PKR · activation details confirmed after order</span></div>
            <div className="ds-store-grid">
              {visibleTools.map((tool) => <article key={tool.id} className="ds-store-product-card">
                <div className="ds-store-product-head">
                  <div className="ds-store-logo"><Image src={toolLogoSources[tool.logoSlug]} alt={`${tool.name} logo`} width={36} height={36} unoptimized /></div>
                  <div>{tool.badge && <span className="ds-store-badge">{tool.badge}</span>}<span className="ds-store-category-label">{tool.category}</span></div>
                </div>
                <div className="ds-store-product-copy"><h3>{tool.name}</h3><p className="ds-store-plan">{tool.plan}</p><p>{tool.description}</p></div>
                <ul>{tool.highlights.map((highlight) => <li key={highlight}><Check size={14} /> {highlight}</li>)}</ul>
                <div className="ds-store-price-row"><div><p><s>{formatPkr(tool.originalPrice)}</s> <span>save {getSavings(tool)}%</span></p><strong>{formatPkr(tool.price)}</strong><small>{tool.period}</small></div><button type="button" onClick={() => addToCart(tool)} aria-label={`Add ${tool.name} to cart`}><Plus size={18} /></button></div>
              </article>)}
            </div>
            {visibleTools.length === 0 && <div className="ds-store-empty"><Search size={24} /><strong>No matching tool yet</strong><span>Try a product name or choose another category.</span></div>}
          </div>
        </section>

        <section className="ds-store-assurance"><div className="ds-store-shell ds-store-assurance-grid"><div><ShieldCheck size={24} /><h3>Purchase with clarity</h3><p>Plan type and delivery details are confirmed before activation.</p></div><div><Clock3 size={24} /><h3>Fast activation</h3><p>Orders are reviewed promptly during support hours.</p></div><div><MessageCircle size={24} /><h3>Human support</h3><p>Need a recommendation? Message our team directly on WhatsApp.</p></div></div></section>
      </main>

      <button type="button" className="ds-store-cart-fab" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${itemCount} items`}><ShoppingBag size={21} /><span>{itemCount}</span></button>
      <a className="ds-store-whatsapp" href="https://wa.me/923096548143" target="_blank" rel="noreferrer" aria-label="Chat with Digital Solutions on WhatsApp"><MessageCircle size={23} /></a>

      {cartOpen && <div className="ds-store-overlay"><aside className="ds-store-cart" role="dialog" aria-modal="true" aria-label="Your cart"><div className="ds-store-drawer-head"><div><p>Your order</p><h2>Cart ({itemCount})</h2></div><button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={20} /></button></div>{cart.length === 0 ? <div className="ds-store-cart-empty"><ShoppingBag size={28} /><strong>Your cart is empty.</strong><p>Add a plan from the catalog to get started.</p><button type="button" onClick={() => setCartOpen(false)}>Browse tools</button></div> : <><div className="ds-store-cart-lines">{cart.map((item) => <div className="ds-store-cart-line" key={item.id}><div className="ds-store-logo ds-store-logo--small"><Image src={toolLogoSources[item.logoSlug]} alt="" width={25} height={25} unoptimized /></div><div className="ds-store-cart-line-copy"><strong>{item.name}</strong><span>{item.plan}</span><b>{formatPkr(item.price)}</b></div><div className="ds-store-quantity"><button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Remove one ${item.name}`}><Minus size={14} /></button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Add one ${item.name}`}><Plus size={14} /></button></div></div>)}</div><div className="ds-store-cart-total"><span>Total</span><strong>{formatPkr(cartTotal)}</strong></div><button type="button" className="ds-store-checkout-button" onClick={startCheckout}>Continue to payment <ArrowRight size={18} /></button><p className="ds-store-cart-note"><ShieldCheck size={15} /> Your activation details are confirmed after payment verification.</p></>}</aside></div>}

      {checkoutOpen && <div className="ds-store-overlay ds-store-checkout-overlay" role="presentation"><section className="ds-store-checkout" role="dialog" aria-modal="true" aria-label="Payment checkout"><button type="button" className="ds-store-checkout-close" onClick={() => setCheckoutOpen(false)} aria-label="Close payment"><X size={20} /></button><div className="ds-store-checkout-intro"><div className="ds-store-checkout-icon"><CreditCard size={22} /></div><p>Digital Solutions Store</p><h2>Payment<br />verification.</h2><span className="ds-store-checkout-reference">Order held while you complete the transfer</span><div className="ds-store-timer"><Clock3 size={18} /><div><span>Payment window</span><strong>{timer}</strong></div></div><div className="ds-store-checkout-trust"><ShieldCheck size={16} /> Receipt reviewed before activation</div></div><div className="ds-store-checkout-details"><div className="ds-store-checkout-topline"><div><span>Order summary</span><p>{itemCount} item{itemCount === 1 ? "" : "s"} ready for payment</p></div><strong>{formatPkr(cartTotal)}</strong></div><fieldset className="ds-store-payment-methods"><legend>Select wallet</legend>{(["Easypaisa", "JazzCash", "NayaPay"] as PaymentMethod[]).map((method) => <label key={method} className={paymentMethod === method ? "is-selected" : ""}><input type="radio" name="payment-method" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} /><span className={`ds-store-wallet-mark ds-store-wallet-mark--${method.toLowerCase()}`} aria-hidden="true">{method === "Easypaisa" ? "e" : method === "JazzCash" ? "JC" : "N"}</span><span className="ds-store-method-copy"><b>{method}</b><small>Mobile wallet transfer</small></span><Check size={16} /></label>)}</fieldset><div className="ds-store-account"><div className="ds-store-account-heading"><span>Transfer details</span><strong>{formatPkr(cartTotal)}</strong></div><div><small>Account title</small><b>Burhan Ahmad</b></div><div><small>{paymentMethod} account number</small><b className="ds-store-account-number">0332 8113888</b></div><p>Transfer the exact amount to the account above, then attach your transaction receipt.</p></div><label className={`ds-store-upload ${receiptFile ? "has-file" : ""}`}><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => selectReceipt(event.target.files?.[0] ?? null)} /><Upload size={19} /><span>{receiptFile?.name || "Attach transaction receipt"}</span><small>JPG, PNG or WEBP · max 10 MB</small></label><button type="button" className="ds-store-verify-button" disabled={!receiptFile || secondsLeft === 0} onClick={sendForVerification}><ShieldCheck size={17} /> {secondsLeft === 0 ? "Payment window expired" : "Send for verification"}</button>{verificationStatus && <p className="ds-store-verification-status" role="status">{verificationStatus}</p>}<p className="ds-store-verification-note">We&apos;ll verify your receipt before the plan is activated.</p><a className="ds-store-payment-help" href={`https://wa.me/${SUPPORT_WHATSAPP}`} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Need help? WhatsApp +92 309 6548143</a><button type="button" className="ds-store-cancel-order" onClick={() => setCancelConfirmationOpen(true)}>Cancel order</button></div>{cancelConfirmationOpen && <div className="ds-store-cancel-confirm"><div><span>Cancel this order?</span><p>Your cart and payment hold will be cleared.</p></div><button type="button" onClick={() => setCancelConfirmationOpen(false)}>Keep order</button><button type="button" onClick={cancelOrder}>Yes, cancel</button></div>}</section></div>}

      <AgencyFooter />
    </div>
  );
}
