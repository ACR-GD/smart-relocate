export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950 text-slate-50">
      <section className="w-full max-w-3xl px-4 lg:px-0 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Privacy</h1>
        <p className="text-xs text-slate-500 mb-8">Last updated: February 7, 2026</p>

        <div className="space-y-4 text-sm text-slate-200">
          <p>
            SmartRelocate stores only the minimum information necessary to provide its services (such as your
            relocation profile, answers to eligibility questions and generated plans). We do not sell your personal
            data.
          </p>
          <p>
            We may use anonymised and aggregated data to improve our models and our understanding of immigration
            patterns (for example, typical profiles using certain visas). Any such analysis is done without identifying
            individual users.
          </p>
          <p>
            For full legal details, this page should be completed and reviewed with a qualified privacy professional in
            your jurisdiction.
          </p>
        </div>
      </section>
    </main>
  );
}
