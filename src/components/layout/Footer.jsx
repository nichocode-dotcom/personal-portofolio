const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-dark-surface/50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding */}
          <div className="text-center md:text-left">
            <h3 className="font-heading font-bold text-lg text-white mb-1">
              <span className="gradient-text">N</span>icho Arie Setiawan
            </h3>
            <p className="text-slate-500 text-sm">Frontend Developer</p>
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right">
            <p className="text-slate-500 text-xs sm:text-sm font-mono">
              © {currentYear} Nicho Arie Setiawan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
