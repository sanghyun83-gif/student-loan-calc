"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, DollarSign } from "lucide-react";
import { calculateRefinance, formatCurrency, formatPercent } from "../site-config";

export default function RefinancePage() {
    const [balance, setBalance] = useState("35000");
    const [currentRate, setCurrentRate] = useState("6.39");
    const [newRate, setNewRate] = useState("5.0");
    const [newTerm, setNewTerm] = useState("10");

    const result = calculateRefinance(
        parseInt(balance.replace(/[^0-9]/g, '')) || 35000,
        parseFloat(currentRate) || 6.39,
        parseFloat(newRate) || 5.0,
        parseInt(newTerm) || 10
    );

    const isSavings = result.totalSavings > 0;

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-blue-600"><ArrowLeft className="w-6 h-6" /></Link>
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-bold text-slate-800">Refinance Calculator</span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-6">Should You Refinance?</h1>
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
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Current Rate</label>
                                <div className="relative">
                                    <input type="number" step="0.01" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">New Rate</label>
                                <div className="relative">
                                    <input type="number" step="0.01" value={newRate} onChange={(e) => setNewRate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-green-500 rounded-lg bg-green-50" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">New Loan Term</label>
                            <select value={newTerm} onChange={(e) => setNewTerm(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg">
                                <option value="5">5 years</option>
                                <option value="7">7 years</option>
                                <option value="10">10 years</option>
                                <option value="15">15 years</option>
                                <option value="20">20 years</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className={`${isSavings ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-amber-600 to-amber-700'} text-white rounded-xl p-6 text-center mb-6`}>
                    <p className="text-sm mb-1">{isSavings ? 'Total Savings' : 'Additional Cost'}</p>
                    <p className="text-4xl font-bold text-yellow-400">{formatCurrency(Math.abs(result.totalSavings))}</p>
                    <p className="mt-2">{isSavings ? '✅ Refinancing makes sense!' : '⚠️ May not be worth it'}</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 text-sm">
                    <h3 className="font-bold text-slate-800 mb-3">Monthly Payment Comparison</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-lg text-center">
                            <p className="text-xs text-slate-500 mb-1">Current</p>
                            <p className="text-xl font-bold text-slate-700">{formatCurrency(result.currentMonthlyPayment)}/mo</p>
                            <p className="text-xs text-slate-500">{formatPercent(parseFloat(currentRate))}</p>
                        </div>
                        <div className={`p-4 rounded-lg text-center ${isSavings ? 'bg-green-50 border-2 border-green-500' : 'bg-amber-50'}`}>
                            <p className="text-xs text-slate-500 mb-1">Refinanced</p>
                            <p className={`text-xl font-bold ${isSavings ? 'text-green-700' : 'text-amber-700'}`}>{formatCurrency(result.newMonthlyPayment)}/mo</p>
                            <p className="text-xs text-slate-500">{formatPercent(parseFloat(newRate))}</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between py-2 border-b"><span>Monthly Savings</span>
                            <span className={result.monthlySavings > 0 ? 'text-green-600 font-bold' : 'text-red-600'}>{formatCurrency(result.monthlySavings)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b"><span>Current Total Interest</span><span>{formatCurrency(result.currentTotalInterest)}</span></div>
                        <div className="flex justify-between py-2"><span>New Total Interest</span><span>{formatCurrency(result.newTotalInterest)}</span></div>
                    </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-700">
                    <strong>⚠️ Warning:</strong> Refinancing federal loans to private loans means losing access to IDR plans, PSLF, and other federal protections.
                </div>

                <div className="my-8 p-6 bg-white border rounded-xl text-center"><p className="text-sm text-slate-400">Advertisement</p></div>
                <Link href="/idr" className="block bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center font-bold">Check IDR Options →</Link>
            </main>
        </div>
    );
}
