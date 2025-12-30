"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { SITE, calculateForgiveness, formatCurrency, formatDate } from "../site-config";

export default function ForgivenessPage() {
    const [balance, setBalance] = useState("35000");
    const [income, setIncome] = useState("55000");
    const [familySize, setFamilySize] = useState("1");
    const [isPublicService, setIsPublicService] = useState(false);

    const result = calculateForgiveness(
        parseInt(balance.replace(/[^0-9]/g, '')) || 35000,
        parseInt(income.replace(/[^0-9]/g, '')) || 55000,
        parseInt(familySize) || 1,
        isPublicService
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-blue-600"><ArrowLeft className="w-6 h-6" /></Link>
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-lg font-bold text-slate-800">Forgiveness Timeline</span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-6">When Will Your Loans Be Forgiven?</h1>
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
                            <div className="flex items-end">
                                <label className="flex items-center gap-2 px-4 py-3 bg-slate-100 rounded-lg cursor-pointer w-full">
                                    <input type="checkbox" checked={isPublicService}
                                        onChange={(e) => setIsPublicService(e.target.checked)}
                                        className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium text-slate-700">Public Service Job</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 text-center mb-6">
                    <p className="text-sm mb-1">Recommended Path</p>
                    <p className="text-2xl font-bold text-yellow-400">{result.recommendedPath}</p>
                </div>

                {/* Timeline Comparison */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                    <h3 className="font-bold text-slate-800 mb-4">Repayment Options Compared</h3>
                    <div className="space-y-4">
                        {/* Standard */}
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Standard 10-Year</span>
                                <span className="text-sm text-slate-500">{formatDate(result.standardPayoffDate)}</span>
                            </div>
                            <p className="text-sm text-slate-600">Total Paid: <span className="font-bold">{formatCurrency(result.standardTotalPaid)}</span></p>
                            <p className="text-xs text-slate-400">No forgiveness - pay in full</p>
                        </div>

                        {/* IDR */}
                        <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-purple-800">IDR (SAVE Plan)</span>
                                <span className="text-sm text-purple-600">{formatDate(result.idrForgivenessDate)}</span>
                            </div>
                            <p className="text-sm text-purple-700">Total Paid: <span className="font-bold">{formatCurrency(result.idrTotalPaid)}</span></p>
                            <p className="text-xs text-purple-500">Forgiveness after 20-25 years</p>
                        </div>

                        {/* PSLF */}
                        {isPublicService && (
                            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-500">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-green-800">PSLF</span>
                                    <span className="text-sm text-green-600">{formatDate(result.pslfForgivenessDate)}</span>
                                </div>
                                <p className="text-sm text-green-700">Total Paid: <span className="font-bold">{formatCurrency(result.pslfTotalPaid)}</span></p>
                                <p className="text-xs text-green-500">Forgiveness after 10 years (120 payments)</p>
                                <span className="inline-block mt-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">Best Option ✓</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Forgiveness Programs */}
                <div className="bg-slate-100 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-slate-800 mb-3">{SITE.year} Forgiveness Programs</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-slate-200">
                            <span>PSLF (Public Service)</span><span className="font-bold text-green-600">10 years</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-200">
                            <span>SAVE Plan (Undergrad only, &lt;$12k)</span><span className="font-bold">10 years</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-200">
                            <span>SAVE/PAYE/IBR (Undergrad)</span><span className="font-bold">20 years</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>SAVE/IBR (Graduate)</span><span className="font-bold">25 years</span>
                        </div>
                    </div>
                </div>

                <div className="my-8 p-6 bg-white border rounded-xl text-center"><p className="text-sm text-slate-400">Advertisement</p></div>
                <Link href="/calculator" className="block bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 text-center font-bold">Calculate Your Payments →</Link>
            </main>
        </div>
    );
}
