"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingDown } from "lucide-react";
import { SITE, calculateLoanPayment, calculatePayoff, formatCurrency, formatDate } from "../site-config";

export default function PayoffPage() {
    const [balance, setBalance] = useState("35000");
    const [rate, setRate] = useState("6.39");
    const [extra, setExtra] = useState("100");

    const loanResult = calculateLoanPayment(parseInt(balance.replace(/[^0-9]/g, '')) || 35000, parseFloat(rate) || 6.39, 10);
    const payoffResult = calculatePayoff(
        parseInt(balance.replace(/[^0-9]/g, '')) || 35000,
        parseFloat(rate) || 6.39,
        loanResult.monthlyPayment,
        parseInt(extra.replace(/[^0-9]/g, '')) || 0
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-blue-600"><ArrowLeft className="w-6 h-6" /></Link>
                    <TrendingDown className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-bold text-slate-800">Payoff Calculator</span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-6">Pay Off Your Loans Faster</h1>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Balance</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input type="text" value={parseInt(balance).toLocaleString() || ''}
                                    onChange={(e) => setBalance(e.target.value.replace(/[^0-9]/g, ''))}
                                    className="w-full pl-7 pr-3 py-3 border-2 border-slate-300 rounded-lg text-xl font-bold" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Interest Rate</label>
                                <div className="relative">
                                    <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Extra Monthly Payment</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input type="text" value={parseInt(extra).toLocaleString() || ''}
                                        onChange={(e) => setExtra(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="w-full pl-7 pr-3 py-3 border-2 border-slate-300 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 text-center mb-6">
                    <p className="text-sm mb-1">Interest Saved</p>
                    <p className="text-4xl font-bold text-yellow-400">{formatCurrency(payoffResult.interestSaved)}</p>
                    <p className="text-green-100 mt-2">{payoffResult.monthsSaved} months faster!</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 text-sm space-y-2">
                    <h3 className="font-bold text-slate-800 mb-3">Comparison</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg text-center">
                            <p className="text-xs text-slate-500 mb-1">Without Extra</p>
                            <p className="text-lg font-bold text-slate-700">{payoffResult.originalMonths} months</p>
                            <p className="text-xs text-red-600">{formatCurrency(payoffResult.originalTotalInterest)} interest</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg text-center border-2 border-green-500">
                            <p className="text-xs text-green-600 mb-1">With Extra</p>
                            <p className="text-lg font-bold text-green-700">{payoffResult.newMonths} months</p>
                            <p className="text-xs text-green-600">{formatCurrency(payoffResult.newTotalInterest)} interest</p>
                        </div>
                    </div>
                    <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-3 mt-4">
                        <span className="font-semibold">Payoff Date</span>
                        <span className="font-bold text-blue-600">{formatDate(payoffResult.payoffDate)}</span>
                    </div>
                </div>

                <div className="my-8 p-6 bg-white border rounded-xl text-center"><p className="text-sm text-slate-400">Advertisement</p></div>
                <Link href="/refinance" className="block bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center font-bold">Compare Refinancing →</Link>
            </main>
        </div>
    );
}
