"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Award } from "lucide-react";
import { SITE, STUDENT_LOAN_CONSTANTS, calculatePSLF, formatCurrency, formatDate } from "../site-config";

export default function PSLFPage() {
    const { pslf } = STUDENT_LOAN_CONSTANTS;

    const [balance, setBalance] = useState("35000");
    const [income, setIncome] = useState("55000");
    const [familySize, setFamilySize] = useState("1");
    const [paymentsMade, setPaymentsMade] = useState("24");

    const result = calculatePSLF(
        parseInt(balance.replace(/[^0-9]/g, '')) || 35000,
        parseInt(income.replace(/[^0-9]/g, '')) || 55000,
        parseInt(familySize) || 1,
        parseInt(paymentsMade) || 0
    );

    const progressPercent = (parseInt(paymentsMade) / 120) * 100;

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-blue-600"><ArrowLeft className="w-6 h-6" /></Link>
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-bold text-slate-800">PSLF Calculator</span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">Public Service Loan Forgiveness</h1>
                    <p className="text-sm text-slate-500 mb-6">Forgiveness after 120 qualifying payments</p>
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
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Payments Made</label>
                                <input type="number" min="0" max="120" value={paymentsMade}
                                    onChange={(e) => setPaymentsMade(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg bg-blue-50" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                    <h3 className="font-bold text-slate-800 mb-3">PSLF Progress</h3>
                    <div className="h-6 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
                            style={{ width: `${Math.min(progressPercent, 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-blue-600 font-bold">{paymentsMade} payments</span>
                        <span className="text-slate-500">{result.paymentsRemaining} remaining</span>
                        <span className="text-green-600 font-bold">120 total</span>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 text-center mb-6">
                    <p className="text-sm mb-1">Estimated Forgiveness</p>
                    <p className="text-4xl font-bold text-yellow-400">{formatCurrency(result.estimatedForgiveness)}</p>
                    <p className="text-green-100 mt-2">on {formatDate(result.forgivenessDate)}</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 text-sm space-y-2">
                    <div className="flex justify-between py-2 border-b"><span>Monthly IDR Payment</span><span className="font-bold">{formatCurrency(result.monthlyPayment)}</span></div>
                    <div className="flex justify-between py-2 border-b"><span>Payments Remaining</span><span>{result.paymentsRemaining} months</span></div>
                    <div className="flex justify-between py-2"><span>Years Until Forgiveness</span><span className="font-bold text-green-600">{(result.monthsRemaining / 12).toFixed(1)} years</span></div>
                </div>

                {/* Qualifying Employers */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <h4 className="font-bold text-blue-800 mb-2">Qualifying Employers</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                        {pslf.qualifyingEmployers.map((emp, i) => (
                            <li key={i}>✓ {emp}</li>
                        ))}
                    </ul>
                </div>

                <div className="my-8 p-6 bg-white border rounded-xl text-center"><p className="text-sm text-slate-400">Advertisement</p></div>
                <Link href="/forgiveness" className="block bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center font-bold">View All Forgiveness Options →</Link>
            </main>
        </div>
    );
}
