"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase } from "lucide-react";
import { SITE, STUDENT_LOAN_CONSTANTS, calculateIDR, formatCurrency } from "../site-config";

export default function IDRPage() {
    const { defaults, idrPlans } = STUDENT_LOAN_CONSTANTS;

    const [balance, setBalance] = useState(defaults.loanBalance.toString());
    const [income, setIncome] = useState(defaults.annualIncome.toString());
    const [familySize, setFamilySize] = useState(defaults.familySize.toString());
    const [plan, setPlan] = useState<'save' | 'paye' | 'ibr' | 'icr'>('save');
    const [isUndergrad, setIsUndergrad] = useState(true);

    const result = calculateIDR(
        parseInt(balance.replace(/[^0-9]/g, '')) || 35000,
        parseInt(income.replace(/[^0-9]/g, '')) || 55000,
        parseInt(familySize) || 1,
        plan,
        isUndergrad
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-blue-600"><ArrowLeft className="w-6 h-6" /></Link>
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-bold text-slate-800">IDR Calculator</span>
                    <span className="ml-auto text-xs text-white bg-blue-600 px-2 py-1 rounded-full">{SITE.year}</span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">Income-Driven Repayment</h1>
                    <p className="text-sm text-slate-500 mb-6">Lower payments based on your income</p>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Balance</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input type="text" value={parseInt(balance).toLocaleString() || ''}
                                        onChange={(e) => setBalance(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="w-full pl-7 pr-3 py-3 border-2 border-slate-300 rounded-lg font-bold" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Annual Income</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input type="text" value={parseInt(income).toLocaleString() || ''}
                                        onChange={(e) => setIncome(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="w-full pl-7 pr-3 py-3 border-2 border-slate-300 rounded-lg font-bold" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Family Size</label>
                                <select value={familySize} onChange={(e) => setFamilySize(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg">
                                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Type</label>
                                <select value={isUndergrad ? 'undergrad' : 'grad'}
                                    onChange={(e) => setIsUndergrad(e.target.value === 'undergrad')}
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg">
                                    <option value="undergrad">Undergraduate</option>
                                    <option value="grad">Graduate</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">IDR Plan</label>
                            <div className="grid grid-cols-4 gap-2">
                                {(['save', 'paye', 'ibr', 'icr'] as const).map(p => (
                                    <button key={p} onClick={() => setPlan(p)}
                                        className={`py-2 px-3 rounded-lg text-sm font-medium ${plan === p ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                        {idrPlans[p].name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-6 text-center mb-6">
                    <p className="text-sm mb-1">{result.planName} Monthly Payment</p>
                    <p className="text-5xl font-bold text-yellow-400">{formatCurrency(result.monthlyPayment)}</p>
                    <p className="text-purple-100 mt-2">Forgiveness in {result.forgivenessYears} years</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 text-sm space-y-2">
                    <h3 className="font-bold text-slate-800 mb-3">Calculation Details</h3>
                    <div className="flex justify-between py-2 border-b"><span>Poverty Line (Family of {familySize})</span><span>{formatCurrency(result.povertyLine)}</span></div>
                    <div className="flex justify-between py-2 border-b"><span>Discretionary Income</span><span>{formatCurrency(result.discretionaryIncome)}</span></div>
                    <div className="flex justify-between py-2 border-b"><span>Total Payments ({result.forgivenessYears} yrs)</span><span>{formatCurrency(result.totalPayments)}</span></div>
                    <div className="flex justify-between py-3 bg-green-50 rounded-lg px-3">
                        <span className="font-semibold">Estimated Forgiveness</span>
                        <span className="font-bold text-green-600">{formatCurrency(result.estimatedForgiveness)}</span>
                    </div>
                </div>

                {plan === 'save' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-700">
                        <strong>💡 SAVE Plan ({SITE.year}):</strong> Only {isUndergrad ? '5%' : '10%'} of income above 225% of poverty line. Lowest payments available!
                    </div>
                )}

                <div className="my-8 p-6 bg-white border rounded-xl text-center"><p className="text-sm text-slate-400">Advertisement</p></div>
                <Link href="/pslf" className="block bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center font-bold">Check PSLF Eligibility →</Link>
            </main>
        </div>
    );
}
