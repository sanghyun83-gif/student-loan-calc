import Link from "next/link";
import { SITE, CALCULATORS, STUDENT_LOAN_CONSTANTS, formatCurrency, formatPercent } from "./site-config";
import { ArrowRight, GraduationCap, TrendingDown, Calculator } from "lucide-react";

export default function HomePage() {
  const featuredCalculators = CALCULATORS.filter(c => c.featured);
  const otherCalculators = CALCULATORS.filter(c => !c.featured);
  const { federalRates } = STUDENT_LOAN_CONSTANTS;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold text-slate-800">{SITE.name}</span>
          </div>
          <span className="text-sm text-white bg-blue-600 px-3 py-1.5 rounded-full font-bold">
            2025-26 Rates
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-700 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/50 rounded-full px-4 py-2 mb-6">
            <TrendingDown className="w-4 h-4 text-blue-300" />
            <span className="text-sm text-blue-200">Free Student Loan Tools</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            2025 Student Loan
            <span className="block text-yellow-400">Calculator</span>
          </h1>

          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Calculate payments, compare refinancing, and explore forgiveness options.
            SAVE Plan, PSLF, IDR - all in one place.
          </p>

          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            <Calculator className="w-5 h-5" />
            Calculate My Loans
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 2025-26 Rates */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">
            2025-26 Federal Student Loan Rates
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-slate-600 mb-1">Undergrad</p>
              <p className="text-2xl font-bold text-blue-700">{formatPercent(federalRates.subsidized)}</p>
              <p className="text-xs text-blue-600">Direct Subsidized</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-slate-600 mb-1">Undergrad</p>
              <p className="text-2xl font-bold text-blue-700">{formatPercent(federalRates.unsubsidizedUndergrad)}</p>
              <p className="text-xs text-blue-600">Direct Unsubsidized</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-sm text-slate-600 mb-1">Graduate</p>
              <p className="text-2xl font-bold text-purple-700">{formatPercent(federalRates.unsubsidizedGrad)}</p>
              <p className="text-xs text-purple-600">Direct Unsubsidized</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm text-slate-600 mb-1">Parent/Grad PLUS</p>
              <p className="text-2xl font-bold text-amber-700">{formatPercent(federalRates.plus)}</p>
              <p className="text-xs text-amber-600">PLUS Loans</p>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-3">
            Effective: {federalRates.effectiveDate}
          </p>
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Free Student Loan Tools
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {featuredCalculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <Link
                key={calc.id}
                href={`/${calc.id}`}
                className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col">
                  <div className="p-3 bg-blue-100 rounded-lg w-fit group-hover:bg-blue-600 transition-colors mb-3">
                    <IconComponent className="w-5 h-5 text-blue-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-600 mb-1">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">
                    {calc.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold mt-auto">
                    Open <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {otherCalculators.length > 0 && (
          <div className="grid md:grid-cols-2 gap-3">
            {otherCalculators.map((calc) => {
              const IconComponent = calc.icon;
              return (
                <Link
                  key={calc.id}
                  href={`/${calc.id}`}
                  className="group bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-500 transition-all flex items-center gap-3"
                >
                  <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                  <span className="text-sm text-slate-600 group-hover:text-blue-600 font-medium">
                    {calc.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick Example */}
      <section className="bg-slate-100 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Average Student Loan Example
          </h2>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              <div className="p-6 text-center">
                <p className="text-sm text-slate-500 mb-1">Average Debt</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(35000)}</p>
                <p className="text-xs text-slate-400">Class of 2024</p>
              </div>
              <div className="p-6 text-center">
                <p className="text-sm text-slate-500 mb-1">Standard Payment</p>
                <p className="text-3xl font-bold text-green-600">~$400/mo</p>
                <p className="text-xs text-slate-400">10-year plan</p>
              </div>
              <div className="p-6 text-center">
                <p className="text-sm text-slate-500 mb-1">SAVE Plan</p>
                <p className="text-3xl font-bold text-purple-600">~$150/mo</p>
                <p className="text-xs text-slate-400">Income-driven</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link href="/calculator" className="text-blue-600 font-semibold hover:underline">
              Calculate Your Payments →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Take Control of Your Student Loans
          </h2>
          <p className="text-blue-100 mb-6">
            Explore repayment options, refinancing, and loan forgiveness programs.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-4 rounded-xl font-bold transition-colors"
          >
            <GraduationCap className="w-5 h-5" />
            Start Calculating
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">{SITE.name}</span>
            </div>
            <p className="text-sm text-slate-400 text-center">
              For informational purposes only. Not financial advice.
            </p>
            <p className="text-sm text-slate-500">
              © {SITE.year} {SITE.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
