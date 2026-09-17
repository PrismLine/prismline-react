import { Link } from 'react-router-dom';
import { useHeroAmbient } from '../hooks/useHeroAmbient';
import { useLaptopSequence } from '../hooks/useLaptopSequence';
import { usePhoneSequence } from '../hooks/usePhoneSequence';

export default function HeroSection() {
  useHeroAmbient();
  useLaptopSequence();
  usePhoneSequence();

  return (
    <section className="hero-section scroll-section" id="hero-stage">
      <div className="hero-grain-overlay" aria-hidden="true"></div>
      <canvas id="hero-ambient-canvas" className="hero-ambient-canvas" aria-hidden="true"></canvas>
      <div className="hero-ambient-orb-left" aria-hidden="true"></div>
      <div className="container">
        <div className="hero-grid">

          {/* ── Left: Hero Copy ────────────────────────────────────────────── */}
          <div className="hero-left">
            <h1 className="hero-headline">
              <span className="hero-title-main">Software<br />engineered<br />bold.</span>
              <span className="hero-title-accent">Secured<br />unbreakable.</span>
            </h1>
            <p className="hero-desc">
              PrismLine is a modern web development studio &mdash; custom websites, e-commerce stores,
              and web apps built on a hardened secure foundation by default, shipped at an affordable
              price and backed by our anytime rectification guarantee.
            </p>
            <div className="hero-btn-group">
              <Link to="/contact" className="btn-hero-primary">Start Your Web Project &searr;</Link>
              <a href="tel:9952934596" className="btn-hero-phone">
                <span style={{ color: '#FF5722' }}>📞</span> +91 99529 34596
              </a>
            </div>
          </div>

          {/* ── Right: MacBook + Phone ──────────────────────────────────────── */}
          <div className="hero-right">
            <div className="devices-combo-wrap">

              {/* ════ MacBook ════════════════════════════════════════════════ */}
              <div className="macbook-device" id="macbook-stage">
                <div className="macbook-lid-wrapper" id="macbook-lid-wrapper">
                  <div className="macbook-lid">
                    <div className="macbook-camera"></div>
                    <div className="macbook-screen" id="macbook-screen">
                      <div className="screen-browser-bar">
                        <div className="browser-dots">
                          <span className="dot dot-red"></span>
                          <span className="dot dot-yellow"></span>
                          <span className="dot dot-green"></span>
                        </div>
                        <div className="browser-address" id="screen-browser-address">
                          <span className="ssl-lock" id="screen-ssl-lock">💻</span>
                          <span className="address-url" id="screen-address-url">workspace://auragift/src/AuraGift.tsx</span>
                        </div>
                        <div className="browser-action">
                          <button className="btn-laptop-mode btn-laptop-mode-term" id="btn-showcase-terminal">⚡ CMD</button>
                          <button className="btn-laptop-mode" id="btn-showcase-code">💻 Code</button>
                          <button className="btn-laptop-mode" id="btn-showcase-store">🛍️ Store</button>
                        </div>
                      </div>

                      <div className="screen-viewport" id="screen-viewport">
                        {/* VS Code Editor */}
                        <div className="mock-code-editor" id="mock-code-editor">
                          <div className="editor-header">
                            <div className="editor-tabs">
                              <span className="editor-tab active" id="tab-editor-app">
                                <svg className="vscode-icon-svg" width="13" height="13" viewBox="0 0 24 24" fill="none">
                                  <path d="M17.5 2.06L7.2 10.12L2.5 6.88L0.8 8.12L4.5 12L0.8 15.88L2.5 17.12L7.2 13.88L17.5 21.94L23.2 19.3V4.7L17.5 2.06Z" fill="#007ACC"/>
                                  <path d="M17.5 2.06L7.2 10.12L11.2 12L17.5 7.3V2.06Z" fill="#1F9CF0"/>
                                  <path d="M17.5 16.7L11.2 12L7.2 13.88L17.5 21.94V16.7Z" fill="#0065A9"/>
                                  <path d="M2.5 6.88L0.8 8.12L4.5 12L0.8 15.88L2.5 17.12L7.2 13.88L5.2 12L7.2 10.12L2.5 6.88Z" fill="#007ACC"/>
                                </svg>
                                <span>AuraGift.tsx</span>
                              </span>
                              <span className="editor-tab" id="tab-editor-pages"><span className="tab-icon">📄</span><span>pages.tsx</span></span>
                              <span className="editor-tab" id="tab-editor-sec"><span className="tab-icon">🛡️</span><span>security.ts</span></span>
                            </div>
                          </div>
                          <div className="editor-body">
                            <div className="code-line-numbers">
                              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
                            </div>
                            <div className="code-typing-area"><span id="code-typed-content"></span><span className="code-cursor" id="code-cursor">▎</span></div>
                          </div>
                        </div>

                        {/* AuraGift App Header */}
                        <div className="mock-site-header" id="mock-site-header">
                          <div className="mock-logo">
                            <span className="auragift-brand-gem">✨</span>
                            <span className="auragift-brand-name">AuraGift <span>Atelier</span></span>
                          </div>
                          <div className="mock-nav-tabs" id="mock-nav-tabs">
                            <span className="nav-tab active" id="tab-home">Home</span>
                            <span className="nav-tab" id="tab-shop">Shop</span>
                            <span className="nav-tab" id="tab-about">About</span>
                            <span className="nav-tab" id="tab-cart">Cart (1)</span>
                          </div>
                        </div>

                        {/* Store */}
                        <div className="store-scroll-container" id="store-scroll-container">
                          <div className="store-scroll-track" id="store-scroll-track">
                            <div className="store-scroll-section" id="section-home">
                              <div className="auragift-hero">
                                <img src="/assets/images/auragift/hero.png" alt="AuraGift" className="auragift-hero-img" />
                              </div>
                              <div className="home-categories-row">
                                {[['🌸 Resin Flora','Preserved botanicals'],['🎁 Gift Hampers','Curated luxury boxes'],['✨ Artisan Decor','24K gold collection']].map(([t,d]) => (
                                  <div className="home-cat-card" key={t}><strong>{t}</strong><span>{d}</span><span className="cat-link">Explore →</span></div>
                                ))}
                              </div>
                            </div>
                            <div className="store-scroll-section" id="section-shop">
                              <div className="view-section-header"><span>✦ CURATED BOTANICAL COLLECTION</span><span className="sec-badge">OWASP Protected</span></div>
                              <div className="shop-products-grid">
                                {[
                                  { src: '/assets/images/auragift/products/shopping.jpeg', title: 'Botanical Floral Keepsake', price: '₹1,499', stock: 'In Stock', id: 'btn-shop-add-mock' },
                                  { src: '/assets/images/auragift/products/gold-coasters.jpg', title: '24K Gold Leaf Coasters', price: '₹2,199', stock: 'Handmade' },
                                  { src: '/assets/images/auragift/products/gift-hamper.jpg', title: 'Curated Gift Hamper', price: '₹3,499', stock: 'Bestseller' },
                                  { src: '/assets/images/auragift/products/floral-art.jpg', title: 'Preserved Floral Art', price: '₹4,299', stock: 'Artisan Pick' },
                                ].map(({ src, title, price, stock, id }) => (
                                  <div className="shop-product-card" key={title}>
                                    <img src={src} alt={title} className="shop-product-thumb" />
                                    <div className="shop-product-details">
                                      <div className="shop-product-title">{title}</div>
                                      <div className="shop-product-row">
                                        <span className="shop-product-price">{price}</span>
                                        <span className="shop-product-stock">{stock}</span>
                                      </div>
                                      <button className="btn-shop-add" id={id}>Add to Bag +</button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="store-scroll-section" id="section-about">
                              <div className="view-section-header"><span>✦ OUR CRAFT &amp; PHILOSOPHY</span><span className="sec-badge">Eco-Certified</span></div>
                              <div className="about-card">
                                <div className="about-hero-title">Handcrafted Luxury with Eco Bio-Resin</div>
                                <p className="about-text">Every botanical keepsake is hand-poured in small batches using non-toxic bio-resin.</p>
                                <div className="about-pillars-row">
                                  {[['🌿','Bio-Resin','Non-Toxic'],['✋','Handmade','Small Batch'],['📦','Eco Pack','Plastic-Free']].map(([icon,t,sub]) => (
                                    <div className="about-pillar" key={t}><span className="pillar-icon">{icon}</span><strong>{t}</strong><small>{sub}</small></div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="store-scroll-section" id="section-cart">
                              <div className="view-section-header"><span>✦ YOUR GIFT BAG (1 ITEM)</span><span className="sec-badge">PCI-DSS Encrypted</span></div>
                              <div className="cart-box">
                                <div className="cart-item-row">
                                  <img src="/assets/images/auragift/products/shopping.jpeg" alt="Botanical Keepsake" className="cart-item-img" />
                                  <div className="cart-item-meta"><strong>Botanical Resin Floral Keepsake</strong><small>Qty: 1 · Custom Gift Box Included</small></div>
                                  <span className="cart-item-price">₹1,499</span>
                                </div>
                                <div className="cart-summary-line"><span>Subtotal</span><span>₹1,499.00</span></div>
                                <div className="cart-summary-line"><span>Express Delivery</span><span style={{ color: '#059669', fontWeight: 700 }}>FREE</span></div>
                                <div className="cart-summary-line total-line"><span>Total Due</span><span style={{ color: '#0F172A', fontWeight: 800 }}>₹1,499.00</span></div>
                                <button className="btn-cart-checkout" id="mock-checkout-btn"><span>🔒 Pay ₹1,499 with Zero-Trust →</span></button>
                                <div className="cart-security-note"><span>🔒</span> 256-Bit SSL Encrypted · PCI-DSS Ready</div>
                              </div>
                            </div>
                          </div>
                          <div className="payment-success-modal" id="payment-success-modal">
                            <div className="pay-success-circle">✓</div>
                            <h4 className="pay-success-title">Payment Successful!</h4>
                            <p className="pay-success-order">Order #AG-8942 Confirmed · ₹1,499.00 Paid</p>
                            <div className="pay-success-vault"><span>🛡️</span> Zero-Trust Encrypted Transaction Verified</div>
                          </div>
                        </div>

                        <div className="view-403-nginx" id="view-403-nginx">
                          <div className="nginx-403-content">
                            <h1 className="nginx-title">403 Forbidden</h1>
                            <hr className="nginx-divider" />
                            <div className="nginx-server">nginx/1.18.0 (Ubuntu)</div>
                          </div>
                        </div>
                        <div className="xss-live-banner" id="xss-live-banner">
                          <span className="xss-icon">⚠️</span>
                          <div className="xss-body">
                            <span className="xss-tag">XSS INJECTION DETECTED</span>
                            <span className="xss-code">&lt;script&gt;alert('XSS')&lt;/script&gt;</span>
                          </div>
                        </div>
                        <div className="mock-attack-cmd" id="mock-attack-cmd">
                          <div className="attack-cmd-header">
                            <div className="cmd-dots">
                              <span className="cmd-dot dot-red"></span>
                              <span className="cmd-dot dot-yellow"></span>
                              <span className="cmd-dot dot-green"></span>
                            </div>
                            <span className="cmd-title">bash - attacker@kali: ~ (Exploit Injection Console)</span>
                            <span className="cmd-tag">EXEC</span>
                          </div>
                          <div className="attack-cmd-body" id="attack-cmd-body">
                            <span id="cmd-typed-text"></span>
                            <span className="cmd-cursor" id="cmd-cursor">▎</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="macbook-base" aria-hidden="true"><div className="macbook-notch-indent"></div></div>
                <div className="macbook-shadow" id="macbook-shadow"></div>
              </div>

              {/* ════ Phone ══════════════════════════════════════════════════ */}
              <div className="phone-mockup-device" id="phone-mockup-stage" aria-label="Mobile App Showcase">
                <div className="phone-frame">
                  {/* Notch sits on top of the screen */}
                  <div className="phone-notch">
                    <div className="phone-camera-dot"></div>
                    <div className="phone-speaker"></div>
                  </div>

                  {/* phone-screen: flex column — status bar then screen area */}
                  <div className="phone-screen">

                    {/* STATUS BAR — regular flex item, never absolute, always visible */}
                    <div className="ph-status-bar">
                      <span className="ph-status-time">9:41</span>
                      <div className="ph-status-icons">
                        <svg width="11" height="9" viewBox="0 0 12 10" fill="currentColor">
                          <rect x="0" y="7" width="2" height="3" rx="0.5"/>
                          <rect x="3" y="5" width="2" height="5" rx="0.5"/>
                          <rect x="6" y="3" width="2" height="7" rx="0.5"/>
                          <rect x="9" y="1" width="2" height="9" rx="0.5"/>
                        </svg>
                        <span className="ph-status-pct">100%</span>
                      </div>
                    </div>

                    {/* SCREEN CONTAINER — absolute-stacked ph-screens live here */}
                    <div className="ph-screen-container">

                      {/* ── SPLASH ─────────────────────────────────────────── */}
                      <div className="ph-screen ph-active" id="ph-screen-splash">
                        <div className="ph-splash-bg">
                          <div className="ph-splash-logo">
                            <div className="ph-splash-emblem">✨</div>
                            <div className="ph-splash-brand">AuraGift</div>
                            <div className="ph-splash-tagline">Artisan Botanicals &amp; Gifts</div>
                          </div>
                          <div className="ph-splash-loader">
                            <div className="ph-splash-track">
                              <div className="ph-splash-bar" id="ph-splash-bar"></div>
                            </div>
                            <div className="ph-splash-hint">Loading your collection…</div>
                          </div>
                        </div>
                      </div>

                      {/* ── HOME ───────────────────────────────────────────── */}
                      <div className="ph-screen" id="ph-screen-home">
                        <div className="ph-app-topbar">
                          <div className="ph-app-logo-row">
                            <span className="ph-app-gem">✨</span>
                            <span className="ph-app-brand">AuraGift</span>
                          </div>
                          <div className="ph-cart-wrap">
                            <span className="ph-cart-icon-emoji">🛍️</span>
                            <span className="ph-cart-badge" id="ph-cart-badge" style={{display:'none'}}>0</span>
                          </div>
                        </div>
                        <div className="ph-banner">
                          <img src="/assets/images/auragift/hero.png" alt="AuraGift" className="ph-banner-img" />
                          <div className="ph-banner-overlay">
                            <div className="ph-banner-tag">✦ NEW ARRIVALS</div>
                            <div className="ph-banner-title">Botanical<br/>Keepsakes</div>
                            <div className="ph-banner-cta">Shop Now →</div>
                          </div>
                        </div>
                        <div className="ph-section-label">🌸 Featured</div>
                        <div className="ph-products-outer">
                          <div className="ph-products-track" id="ph-home-scroll-track">
                            {[
                              { src: '/assets/images/auragift/products/shopping.jpeg',    name: 'Floral Keepsake', price: '₹1,499' },
                              { src: '/assets/images/auragift/products/gold-coasters.jpg', name: '24K Coasters',   price: '₹2,199' },
                              { src: '/assets/images/auragift/products/gift-hamper.jpg',  name: 'Gift Hamper',     price: '₹3,499' },
                              { src: '/assets/images/auragift/products/floral-art.jpg',   name: 'Floral Art',      price: '₹4,299' },
                            ].map(({ src, name, price }) => (
                              <div className="ph-product-card" key={name}>
                                <img src={src} alt={name} className="ph-product-img" />
                                <div className="ph-product-name">{name}</div>
                                <div className="ph-product-price">{price}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="ph-bottom-nav">
                          <div className="ph-nav-item ph-nav-active"><span className="ph-nav-icon">🏠</span><span>Home</span></div>
                          <div className="ph-nav-item"><span className="ph-nav-icon">🔍</span><span>Search</span></div>
                          <div className="ph-nav-item"><span className="ph-nav-icon">❤️</span><span>Saved</span></div>
                          <div className="ph-nav-item"><span className="ph-nav-icon">👤</span><span>Profile</span></div>
                        </div>
                      </div>

                      {/* ── PRODUCT DETAIL ─────────────────────────────────── */}
                      <div className="ph-screen" id="ph-screen-detail">
                        <div className="ph-detail-header">
                          <span className="ph-back-btn">← Back</span>
                          <span className="ph-detail-title-bar">Product Details</span>
                          <span className="ph-share-btn">⎋</span>
                        </div>
                        <div className="ph-detail-img-wrap">
                          <img src="/assets/images/auragift/products/shopping.jpeg" alt="Product" className="ph-detail-img" id="ph-detail-img" />
                          <div className="ph-detail-badge">🌿 Handcrafted</div>
                        </div>
                        <div className="ph-detail-body">
                          <div className="ph-detail-name" id="ph-detail-name">Botanical Floral Keepsake</div>
                          <div className="ph-detail-meta">
                            <span className="ph-detail-price" id="ph-detail-price">₹1,499</span>
                            <span className="ph-detail-stars">⭐ 4.9 (128)</span>
                          </div>
                          <div className="ph-detail-desc">Hand-poured in small batches using non-toxic bio-resin. Each piece preserves real botanicals.</div>
                          <div className="ph-detail-tags">
                            <span className="ph-tag">🌿 Bio-Resin</span>
                            <span className="ph-tag">✋ Handmade</span>
                            <span className="ph-tag">📦 Eco-Pack</span>
                          </div>
                        </div>
                        <div className="ph-detail-actions">
                          <button className="ph-add-to-cart-btn" id="ph-add-to-cart-btn">🛍️ Add to Cart</button>
                        </div>
                        <div className="ph-detail-secure">🔒 PCI-DSS Encrypted Checkout</div>
                      </div>

                      {/* ── CART ───────────────────────────────────────────── */}
                      <div className="ph-screen" id="ph-screen-cart">
                        <div className="ph-detail-header">
                          <span className="ph-back-btn">← Back</span>
                          <span className="ph-detail-title-bar">🛍️ Your Bag</span>
                          <span></span>
                        </div>
                        <div className="ph-cart-item-row">
                          <img src="/assets/images/auragift/products/shopping.jpeg" alt="item" className="ph-cart-item-img" id="ph-cart-item-img" />
                          <div className="ph-cart-item-info">
                            <div className="ph-cart-item-name" id="ph-cart-item-name">Botanical Floral Keepsake</div>
                            <div className="ph-cart-item-sub">Qty: 1 · Custom Gift Box</div>
                            <div className="ph-cart-item-price" id="ph-cart-item-price">₹1,499</div>
                          </div>
                        </div>
                        <div className="ph-cart-summary">
                          <div className="ph-cart-row"><span>Subtotal</span><span>₹1,499.00</span></div>
                          <div className="ph-cart-row"><span>Delivery</span><span style={{color:'#059669',fontWeight:700}}>FREE</span></div>
                          <div className="ph-cart-row ph-cart-total"><span>Total</span><span>₹1,499.00</span></div>
                        </div>
                        <button className="ph-checkout-btn" id="ph-checkout-btn">🔒 Secure Checkout →</button>
                        <div className="ph-cart-trust"><span>🛡️</span> 256-bit SSL · PCI-DSS</div>
                      </div>

                      {/* ── PAYMENT ────────────────────────────────────────── */}
                      <div className="ph-screen" id="ph-screen-pay">
                        <div className="ph-pay-header">
                          <div className="ph-pay-title">🔒 Secure Payment</div>
                          <div className="ph-pay-sub">Zero-Trust Encrypted</div>
                        </div>
                        <div className="ph-pay-card">
                          <div className="ph-pay-card-row">
                            <div className="ph-card-chip"></div>
                            <div className="ph-card-brand">💳</div>
                          </div>
                          <div className="ph-card-number">•••• •••• •••• 4296</div>
                          <div className="ph-card-row2">
                            <span>Valid Thru 08/27</span>
                            <span>CVV •••</span>
                          </div>
                        </div>
                        <div className="ph-pay-amount">
                          <span className="ph-pay-label">Amount Due</span>
                          <span className="ph-pay-value">₹1,499.00</span>
                        </div>
                        <div className="ph-pay-progress-wrap">
                          <div className="ph-pay-progress-track">
                            <div className="ph-pay-bar" id="ph-pay-bar"></div>
                          </div>
                          <div className="ph-pay-pct" id="ph-pay-pct">0%</div>
                        </div>
                        <div className="ph-pay-status">Verifying with zero-trust protocol…</div>
                        <div className="ph-pay-shields">
                          <span className="ph-shield-pill">🛡️ OWASP</span>
                          <span className="ph-shield-pill">🔒 TLS 1.3</span>
                          <span className="ph-shield-pill">✅ PCI-DSS</span>
                        </div>
                      </div>

                      {/* ── SUCCESS ────────────────────────────────────────── */}
                      <div className="ph-screen" id="ph-screen-success">
                        <div className="ph-success-wrap">
                          <div className="ph-success-circle">
                            <span className="ph-success-check">✓</span>
                          </div>
                          <div className="ph-success-title">Order Confirmed!</div>
                          <div className="ph-success-order">Order #AG-{Math.floor(Math.random()*9000+1000)}</div>
                          <div className="ph-success-amount">₹1,499.00 Paid</div>
                          <div className="ph-success-delivery">
                            <span>📦</span><span>Estimated delivery: 3–5 days</span>
                          </div>
                          <div className="ph-success-vault">
                            <span>🛡️</span><span>Zero-Trust Verified</span>
                          </div>
                        </div>
                      </div>

                    </div>{/* end ph-screen-container */}
                  </div>{/* end phone-screen */}

                  <div className="phone-bottom-bar">
                    <div className="phone-home-indicator"></div>
                  </div>
                </div>{/* end phone-frame */}
              </div>{/* end phone-mockup-device */}

            </div>{/* end devices-combo-wrap */}
          </div>
        </div>
      </div>
    </section>
  );
}
