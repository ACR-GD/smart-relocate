export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-slate-400">
        <div className="space-y-1">
          <p className="font-semibold text-slate-100">SmartRelocate</p>
          <p>AI-native relocation copilot for Malaysia.</p>
          <p>68 Circular Road, Singapore 049422</p>
          <p className="text-slate-500">A brand by ACR Digital Ventures.</p>
        </div>
        <div className="space-y-1 md:text-right">
          <p>© 2026 SmartRelocate. All rights reserved.</p>
          <div className="flex md:justify-end gap-3">
            <a href="/privacy" className="hover:text-sky-400">Privacy</a>
            <span>•</span>
            <a href="/terms" className="hover:text-sky-400">Terms</a>
            <span>•</span>
            <a href="/disclaimer" className="hover:text-sky-400">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
