type BrandProps = {
  compact?: boolean;
  light?: boolean;
};

export function Brand({ compact = false, light = false }: BrandProps) {
  const textColor = light ? "#050B14" : "#FFFFFF";
  return (
    <span className={`vx-brand${compact ? " vx-brand--compact" : ""}`}>
      <svg
        className="vx-brand-logo"
        viewBox="0 0 320 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Digital Solutions — Smart Solutions, Digital Growth"
        style={{ height: compact ? 36 : 46, width: "auto" }}
      >
        <defs>
          <linearGradient id="dsGrad" x1="10" y1="10" x2="80" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0062ff"/>
            <stop offset="60%" stopColor="#0080ff"/>
            <stop offset="100%" stopColor="#00c8ff"/>
          </linearGradient>
          <linearGradient id="dsLine" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1"/>
            <stop offset="50%" stopColor="#0077ff"/>
            <stop offset="100%" stopColor="#00d4ff"/>
          </linearGradient>
        </defs>

        {/* Stylized D Symbol with Pixel Breakaway */}
        <g transform="translate(4, 4)">
          <path d="M38 6 H58 C74 6 86 17 86 36 C86 55 74 66 58 66 H38 V54 H57 C67 54 73 45 73 36 C73 27 67 18 57 18 H38 Z" fill="url(#dsGrad)"/>
          <rect x="31" y="14" width="5.5" height="5.5" rx="1" fill="url(#dsGrad)"/>
          <rect x="40" y="18" width="7" height="7" rx="1.2" fill="url(#dsGrad)"/>
          <rect x="27" y="22" width="7" height="7" rx="1.2" fill="url(#dsGrad)"/>
          <rect x="44" y="25" width="8.5" height="8.5" rx="1.4" fill="url(#dsGrad)"/>
          <rect x="35" y="31" width="9" height="9" rx="1.4" fill="url(#dsGrad)"/>
          <rect x="21" y="33" width="7.5" height="7.5" rx="1.2" fill="url(#dsGrad)"/>
          <rect x="29" y="42" width="7.5" height="7.5" rx="1.2" fill="url(#dsGrad)"/>
          <rect x="39" y="45" width="7" height="7" rx="1.2" fill="url(#dsGrad)"/>
          <rect x="38" y="55" width="6" height="6" rx="1" fill="url(#dsGrad)"/>
          <rect x="29" y="54" width="5" height="5" rx="0.8" fill="url(#dsGrad)"/>
        </g>

        {/* DIGITAL */}
        <text x="106" y="32" fontFamily="'Nunito Sans', 'Inter', system-ui, -apple-system, sans-serif" fontSize="25" fontWeight="900" letterSpacing="4.5" fill={textColor}>DIGITAL</text>
        
        {/* SOLUTIONS */}
        <text x="106" y="53" fontFamily="'Nunito Sans', 'Inter', system-ui, -apple-system, sans-serif" fontSize="19" fontWeight="800" letterSpacing="4.2" fill="#0077ff">SOLUTIONS</text>
        
        {/* Tagline */}
        <text x="107" y="67" fontFamily="'Nunito Sans', 'Roboto', system-ui, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="0.8" fill="#94a3b8">Smart Solutions, Digital Growth</text>
        
        {/* Accent Line */}
        <rect x="107" y="73" width="38" height="2" rx="1" fill="url(#dsLine)"/>
      </svg>
    </span>
  );
}
