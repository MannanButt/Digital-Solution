import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F9FF] text-[#050B14] flex flex-col justify-between">
      {/* Top Header */}
      <header className="px-6 sm:px-12 py-6 border-b border-sky-100 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight text-[#050B14]">
          Digital Solutions<span className="text-sky-500">.</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-900 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-bold uppercase tracking-wider mb-6">
            <Compass className="w-4 h-4 text-sky-600" />
            404 Error — Page Not Found
          </div>

          <h1 className="text-6xl sm:text-8xl font-black text-[#050B14] tracking-tight mb-4">
            4<span className="text-sky-500">0</span>4
          </h1>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#050B14] mb-4">
            This Service Page Does Not Exist Yet
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-10">
            The page or service you are looking for may have been moved, renamed, or is currently in development.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-linear-to-r from-sky-500 to-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all"
            >
              <Home className="w-4 h-4" /> Go to Homepage
            </Link>
            <Link
              href="/services/development"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-sky-200 text-sky-900 font-semibold text-sm hover:bg-sky-50 transition-all shadow-sm"
            >
              Development Services
            </Link>
            <Link
              href="/services/marketing-seo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-sky-200 text-sky-900 font-semibold text-sm hover:bg-sky-50 transition-all shadow-sm"
            >
              Marketing & SEO Services
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 sm:px-12 border-t border-sky-100 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Digital Solutions. Engineered for high performance & scale.
      </footer>
    </div>
  );
}
