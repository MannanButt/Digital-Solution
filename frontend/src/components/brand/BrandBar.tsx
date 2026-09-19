const SERVICE_PLATFORMS = [
  {
    name: "Meta Ads",
    category: "Marketing",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Meta infinity loop — two tilted ovals */}
        <ellipse cx="7.5" cy="12" rx="4" ry="6.5" stroke="#0081FB" strokeWidth="2.5" fill="none" transform="rotate(-20 7.5 12)" />
        <ellipse cx="15.5" cy="12" rx="4" ry="6.5" stroke="#0081FB" strokeWidth="2.5" fill="none" transform="rotate(20 15.5 12)" />
        <text x="25" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="700" fill="currentColor">Meta Ads</text>
      </svg>
    ),
  },
  {
    name: "Google Ads",
    category: "Marketing",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Google G mark — 4-colour official */}
        <path d="M21.6 12.24c0-.72-.06-1.41-.18-2.07H12v3.91h5.4a4.62 4.62 0 0 1-2 3.03v2.52h3.23c1.89-1.74 2.97-4.3 2.97-7.39Z" fill="#4285F4"/>
        <path d="M12 22c2.7 0 4.97-.9 6.63-2.43l-3.23-2.51c-.9.6-2.04.96-3.4.96-2.61 0-4.82-1.76-5.61-4.13H3.06v2.6A9.99 9.99 0 0 0 12 22Z" fill="#34A853"/>
        <path d="M6.39 13.89A6.02 6.02 0 0 1 6.07 12c0-.66.11-1.3.32-1.89V7.51H3.06A10 10 0 0 0 2 12c0 1.61.38 3.14 1.06 4.49l3.33-2.6Z" fill="#FBBC05"/>
        <path d="M12 5.98c1.47 0 2.79.51 3.83 1.5l2.86-2.86C16.96 3.03 14.7 2 12 2A9.99 9.99 0 0 0 3.06 7.51l3.33 2.6C7.18 7.74 9.39 5.98 12 5.98Z" fill="#EA4335"/>
        <text x="30" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="700" fill="currentColor">Google Ads</text>
      </svg>
    ),
  },
  {
    name: "Figma",
    category: "Design",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Figma 5-node mark — absolute paths, no negative y */}
        {/* Bottom-left: green circle (bottom node) */}
        <path d="M8 14h4v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4Z" fill="#0ACF83"/>
        {/* Left: purple (middle-left node) */}
        <path d="M4 6h8v8H8a4 4 0 0 1-4-4V6Z" fill="#A259FF"/>
        {/* Top-left: red (top-left node) */}
        <path d="M8 2h4v8H8a4 4 0 0 1-4-4 4 4 0 0 1 4-4Z" fill="#F24E1E"/>
        {/* Top-right: orange (top-right node) */}
        <path d="M12 2h4a4 4 0 0 1 4 4 4 4 0 0 1-4 4h-4V2Z" fill="#FF7262"/>
        {/* Right: blue circle (middle-right node) */}
        <circle cx="16" cy="14" r="4" fill="#1ABCFE"/>
        <text x="26" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="700" fill="currentColor">Figma</text>
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "Development",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 95 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Next.js — black circle, white N lettermark */}
        <circle cx="11" cy="12" r="10" fill="#000"/>
        {/* Left vertical stroke of N */}
        <rect x="7" y="7" width="1.8" height="10" fill="#fff"/>
        {/* Right vertical stroke of N */}
        <rect x="14.2" y="7" width="1.8" height="10" fill="#fff"/>
        {/* Diagonal of N */}
        <path d="M8.8 7 L15.5 17" stroke="#fff" strokeWidth="1.8" strokeLinecap="square"/>
        <text x="28" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="800" fill="currentColor">Next.js</text>
      </svg>
    ),
  },
  {
    name: "OpenAI",
    category: "AI Automation",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 95 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="/assets/logos/brands/openai.svg" width="24" height="24" x="0" y="0" />
        <text x="28" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="700" fill="currentColor">OpenAI</text>
      </svg>
    ),
  },
  {
    name: "Shopify",
    category: "Development",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 95 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="9.5" width="14" height="12" rx="1.5" fill="#96BF48"/>
        <path d="M6.5 9.5 C6.5 6 13.5 6 13.5 9.5" stroke="#5E8E3E" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M8.5 16.2c0-.7.6-1.1 1.5-1.1.6 0 1.1.1 1.6.4v-1.1c-.5-.2-1-.3-1.6-.3-1.5 0-2.5.8-2.5 2s.9 1.6 2.2 1.9c.8.2 1.1.5 1.1.9 0 .5-.5.8-1.3.8-.7 0-1.4-.2-2-.6v1.2c.6.3 1.3.4 2 .4 1.6 0 2.6-.8 2.6-2.1 0-1.1-.8-1.6-2.1-1.9-.8-.2-1.5-.5-1.5-.5Z" fill="white"/>
        <text x="22" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="700" fill="#96BF48">Shopify</text>
      </svg>
    ),
  },
  {
    name: "HubSpot",
    category: "Marketing",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 95 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.28 8.16V5.93a1.7 1.7 0 0 0 .98-1.53V4.3a1.7 1.7 0 0 0-1.7-1.7h-.1A1.7 1.7 0 0 0 12.76 4.3v.1c0 .69.41 1.28.98 1.53v2.23a4.85 4.85 0 0 0-2.31.99L5.46 4.8a1.9 1.9 0 0 0 .07-.5A1.93 1.93 0 1 0 3.6 6.23a1.9 1.9 0 0 0 1.04-.31l5.91 4.3a4.85 4.85 0 0 0-.64 2.42 4.85 4.85 0 0 0 .89 2.82l-1.8 1.8a1.55 1.55 0 0 0-.42-.06 1.58 1.58 0 1 0 1.58 1.58 1.55 1.55 0 0 0-.06-.42l1.78-1.78A4.85 4.85 0 0 0 14.5 17.7a4.85 4.85 0 0 0 4.85-4.85 4.85 4.85 0 0 0-4.07-4.69Zm0 7.26a2.47 2.47 0 1 1 0-4.94 2.47 2.47 0 0 1 0 4.94Z" fill="#FF7A59"/>
        <text x="26" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="700" fill="currentColor">HubSpot</text>
      </svg>
    ),
  },

  {
    name: "Stripe",
    category: "Development",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stripe — purple S mark + wordmark */}
        <rect x="1" y="1" width="18" height="22" rx="4" fill="#635BFF"/>
        <path d="M10.3 9.4c0-.7.6-1 1.5-1 .8 0 1.7.3 2.5.7V7c-.8-.3-1.6-.5-2.5-.5-2.1 0-3.5 1.1-3.5 2.9 0 2.8 3.9 2.4 3.9 3.6 0 .8-.7 1.1-1.7 1.1-.9 0-1.9-.4-2.7-.9v2.1c.9.4 1.8.6 2.7.6 2.2 0 3.7-1.1 3.7-2.9 0-3-3.9-2.5-3.9-3.6Z" fill="white"/>
        <text x="24" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="900" fontStyle="italic" fill="#635BFF">stripe</text>
      </svg>
    ),
  },
  {
    name: "Webflow",
    category: "Design",
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 105 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Webflow W mark — absolute coords, no negative x */}
        <path d="M18 3 L14.5 15 L12 4.5H8.5L6 15 L2.5 3H0l4.5 18h4L11 9.5l2.5 11.5h4L22 3H18Z" fill="#146EF5"/>
        <text x="28" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="800" fill="currentColor">Webflow</text>
      </svg>
    ),
  },
];

export function BrandBar() {
  return (
    <section className="vx-brand-bar" aria-label="Platforms and Technologies across Marketing, Engineering, Design and AI">
      <div className="vx-brand-bar-inner">
        <div className="vx-brand-bar-heading">
          <span className="vx-brand-bar-pill">SERVICE ECOSYSTEM &amp; PLATFORMS</span>
          <p>Certified expertise across Meta Ads, Google Marketing, Modern Web Engineering, Figma Design &amp; AI Systems</p>
        </div>

        <div className="vx-marquee-track-wrapper">
          <div className="vx-marquee-fade-left" aria-hidden="true" />
          <div className="vx-marquee-track">
            {/* Sequence 1 */}
            <div className="vx-marquee-content">
              {SERVICE_PLATFORMS.map((platform) => (
                <div key={`brand-1-${platform.name}`} className="vx-brand-item" title={platform.name}>
                  {platform.svg}
                </div>
              ))}
            </div>

            {/* Sequence 2 for seamless continuous marquee */}
            <div className="vx-marquee-content" aria-hidden="true">
              {SERVICE_PLATFORMS.map((platform) => (
                <div key={`brand-2-${platform.name}`} className="vx-brand-item" title={platform.name}>
                  {platform.svg}
                </div>
              ))}
            </div>
          </div>
          <div className="vx-marquee-fade-right" aria-hidden="true" />
        </div>

        {/* Agency Capability Proof Badges */}
        <div className="vx-brand-bar-badges">
          <div className="vx-trust-tag">
            <span className="vx-trust-dot" />
            <span>Meta &amp; Google Partner Certified</span>
          </div>
          <div className="vx-trust-tag">
            <span className="vx-trust-dot" />
            <span>Production Next.js &amp; Cloud Engineering</span>
          </div>
          <div className="vx-trust-tag">
            <span className="vx-trust-dot" />
            <span>Enterprise AI Orchestration &amp; RAG</span>
          </div>
          <div className="vx-trust-tag">
            <span className="vx-trust-dot" />
            <span>Conversion-Led Figma Systems</span>
          </div>
        </div>
      </div>
    </section>
  );
}
