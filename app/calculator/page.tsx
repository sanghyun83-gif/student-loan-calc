"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";
import { SITE, STUDENT_LOAN_CONSTANTS, calculateLoanPayment, formatCurrency, formatPercent } from "../site-config";

export default function CalculatorPage() {
    const { defaults, federalRates } = STUDENT_LOAN_CONSTANTS;

    const [balance, setBalance] = useState(defaults.loanBalance.toString());
    const [rate, setRate] = useState(defaults.interestRate.toString());
    const [term, setTerm] = useState(defaults.loanTerm.toString());

    const result = calculateLoanPayment(
        parseInt(balance.replace(/[^0-9]/g, '')) || 0,
        parseFloat(rate) || 6.39,
        parseInt(term) || 10
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-blue-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <Calculator className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-bold text-slate-800">Loan Calculator</span>
                    <span className="ml-auto text-xs text-white bg-blue-600 px-2 py-1 rounded-full">{SITE.year}</span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-6">Student Loan Payment Calculator</h1>
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
                                    <input type="number" step="0.01" value={rate}
                                        onChange={(e) => setRate(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg" />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Term</label>
                                <select value={term} onChange={(e) => setTerm(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg">
                                    <option value="10">10 years (Standard)</option>
                                    <option value="15">15 years</option>
                                    <option value="20">20 years</option>
                                    <option value="25">25 years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Rate Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <button onClick={() => setRate(federalRates.subsidized.toString())}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200">
                        Undergrad {formatPercent(federalRates.subsidized)}
                    </button>
                    <button onClick={() => setRate(federalRates.unsubsidizedGrad.toString())}
                        className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200">
                        Grad {formatPercent(federalRates.unsubsidizedGrad)}
                    </button>
                    <button onClick={() => setRate(federalRates.plus.toString())}
                        className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-200">
                        PLUS {formatPercent(federalRates.plus)}
                    </button>
                </div>

                {/* Results */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 text-center">
                        <p className="text-sm text-blue-100 mb-1">Monthly Payment</p>
                        <p className="text-5xl font-bold text-yellow-400">{formatCurrency(result.monthlyPayment)}</p>
                        <p className="text-blue-100 mt-2">for {term} years</p>
                    </div>
                    <div className="p-6 space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span>Loan Amount</span><span className="font-medium">{formatCurrency(result.loanBalance)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span>Interest Rate</span><span className="font-medium">{formatPercent(result.interestRate)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                            <span>Total Interest</span><span className="font-medium text-red-600">{formatCurrency(result.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-3">
                            <span className="font-semibold">Total Repayment</span>
                            <span className="font-bold text-blue-600">{formatCurrency(result.totalPayment)}</span>
                        </div>
                    </div>
                </div>

                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center">
                    <p className="text-sm text-slate-400">Advertisement</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Link href="/payoff" className="bg-white border border-slate-200 rounded-lg p-4 text-center hover:border-blue-500">
                        <p className="text-sm font-medium text-slate-600">Payoff Calculator →</p>
                    </Link>
                    <Link href="/idr" className="bg-white border border-slate-200 rounded-lg p-4 text-center hover:border-blue-500">
                        <p className="text-sm font-medium text-slate-600">IDR Calculator →</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
