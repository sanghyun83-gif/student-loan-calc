// ============================================
// STUDENT-LOAN-CALC SITE CONFIGURATION
// 2025-2026 Student Loan Calculator
// Blue/Education Theme
// ============================================

import { Calculator, GraduationCap, DollarSign, TrendingDown, Briefcase, Award, Clock } from 'lucide-react';

// ============================================
// SITE METADATA
// ============================================
export const SITE = {
    name: "Student Loan Calculator",
    tagline: "Free 2025 Student Loan Tools",
    description: "Calculate your student loan payments, refinancing savings, and repayment options. See PSLF eligibility, IDR plans, and loan forgiveness timelines.",
    year: 2025,
    baseUrl: "https://student-loan.mysmartcalculators.com",
};

// ============================================
// 2025-2026 FEDERAL STUDENT LOAN CONSTANTS
// Effective: July 1, 2025 - June 30, 2026
// ============================================
export const STUDENT_LOAN_CONSTANTS = {
    // 2025-26 Federal Direct Loan Interest Rates
    federalRates: {
        subsidized: 6.39,           // Undergrad Direct Subsidized
        unsubsidizedUndergrad: 6.39, // Undergrad Direct Unsubsidized
        unsubsidizedGrad: 7.94,      // Grad/Professional Direct Unsubsidized
        plus: 8.94,                  // Parent PLUS & Grad PLUS
        effectiveDate: "July 1, 2025 - June 30, 2026",
    },

    // Origination Fees (as of Oct 2020 - Oct 2026)
    originationFees: {
        subsidizedUnsubsidized: 1.057,  // 1.057% of loan amount
        plus: 4.228,                     // 4.228% of loan amount
    },

    // Loan Limits (2024-25 Academic Year)
    loanLimits: {
        dependentUndergrad: {
            freshman: 5500,
            sophomore: 6500,
            juniorSenior: 7500,
            totalAggregate: 31000,
        },
        independentUndergrad: {
            freshman: 9500,
            sophomore: 10500,
            juniorSenior: 12500,
            totalAggregate: 57500,
        },
        graduate: {
            annual: 20500,
            totalAggregate: 138500,  // Including undergrad
        },
    },

    // Standard Repayment
    standardRepayment: {
        termYears: 10,
        minPayment: 50,
    },

    // Income-Driven Repayment (IDR) Plans
    idrPlans: {
        save: {  // NEW SAVE Plan (Saving on a Valuable Education)
            name: "SAVE Plan",
            incomePercent: 10,           // 10% for grad, 5% for undergrad only
            undergradPercent: 5,
            povertyMultiplier: 225,      // 225% of poverty line protected
            forgivenessYears: {
                undergrad: 20,
                grad: 25,
                under12k: 10,            // 10 years if original balance <$12k
            },
        },
        paye: {  // Pay As You Earn
            name: "PAYE",
            incomePercent: 10,
            povertyMultiplier: 150,
            forgivenessYears: 20,
        },
        ibr: {   // Income-Based Repayment
            name: "IBR",
            incomePercent: 10,          // 10% for new borrowers after July 2014
            incomePercentOld: 15,       // 15% for borrowers before July 2014
            povertyMultiplier: 150,
            forgivenessYears: 20,
            forgivenessYearsOld: 25,
        },
        icr: {   // Income-Contingent Repayment
            name: "ICR",
            incomePercent: 20,
            forgivenessYears: 25,
        },
    },

    // PSLF (Public Service Loan Forgiveness)
    pslf: {
        requiredPayments: 120,           // 10 years of qualifying payments
        qualifyingEmployers: [
            "Government (federal, state, local, tribal)",
            "501(c)(3) nonprofit organizations",
            "AmeriCorps, Peace Corps",
            "Public education, public health",
        ],
    },

    // 2024 Poverty Guidelines (for IDR calculations)
    povertyGuidelines: {
        baseAmount: 15060,               // 1 person household (lower 48)
        perAdditionalPerson: 5380,
        alaskaMultiplier: 1.25,
        hawaiiMultiplier: 1.15,
    },

    // Private Refinance Rates (approximate market rates)
    privateRefinanceRates: {
        excellent: { min: 4.5, max: 6.5 },   // 750+ credit
        good: { min: 6.0, max: 8.0 },        // 700-749
        fair: { min: 8.0, max: 12.0 },       // 650-699
    },

    // Defaults
    defaults: {
        loanBalance: 35000,
        interestRate: 6.39,
        loanTerm: 10,
        annualIncome: 55000,
        familySize: 1,
    },
};

// ============================================
// CALCULATOR DEFINITIONS
// ============================================
export const CALCULATORS = [
    {
        id: "calculator",
        name: "Loan Calculator",
        shortName: "Calculator",
        description: "Calculate monthly payments",
        icon: Calculator,
        keywords: ["student loan calculator", "monthly payment", "loan payment calculator"],
        featured: true,
    },
    {
        id: "payoff",
        name: "Payoff Calculator",
        shortName: "Payoff",
        description: "Pay off loans faster",
        icon: TrendingDown,
        keywords: ["student loan payoff", "extra payments", "pay off early"],
        featured: true,
    },
    {
        id: "refinance",
        name: "Refinance Calculator",
        shortName: "Refinance",
        description: "Compare refinance savings",
        icon: DollarSign,
        keywords: ["student loan refinance", "refinancing", "lower rate"],
        featured: true,
    },
    {
        id: "idr",
        name: "IDR Calculator",
        shortName: "IDR",
        description: "Income-driven repayment",
        icon: Briefcase,
        keywords: ["income driven repayment", "SAVE plan", "IBR", "PAYE"],
        featured: true,
    },
    {
        id: "pslf",
        name: "PSLF Calculator",
        shortName: "PSLF",
        description: "Public service forgiveness",
        icon: Award,
        keywords: ["pslf calculator", "public service loan forgiveness", "10 year forgiveness"],
        featured: false,
    },
    {
        id: "forgiveness",
        name: "Forgiveness Timeline",
        shortName: "Forgiveness",
        description: "When will loans be forgiven?",
        icon: Clock,
        keywords: ["loan forgiveness", "forgiveness timeline", "20 year forgiveness"],
        featured: false,
    },
] as const;

// ============================================
// LOAN PAYMENT CALCULATION
// ============================================

export interface LoanPaymentResult {
    loanBalance: number;
    interestRate: number;
    loanTermMonths: number;
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
}

export function calculateLoanPayment(
    loanBalance: number,
    interestRate: number,
    loanTermYears: number
): LoanPaymentResult {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTermYears * 12;

    const monthlyPayment = loanBalance *
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanBalance;

    return {
        loanBalance,
        interestRate,
        loanTermMonths: numPayments,
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
    };
}

// ============================================
// PAYOFF CALCULATION (with extra payments)
// ============================================

export interface PayoffResult {
    originalMonths: number;
    newMonths: number;
    monthsSaved: number;
    interestSaved: number;
    originalTotalInterest: number;
    newTotalInterest: number;
    payoffDate: Date;
}

export function calculatePayoff(
    loanBalance: number,
    interestRate: number,
    monthlyPayment: number,
    extraPayment: number
): PayoffResult {
    const monthlyRate = interestRate / 100 / 12;

    // Original payoff without extra
    let balance = loanBalance;
    let originalMonths = 0;
    let originalInterest = 0;
    while (balance > 0 && originalMonths < 360) {
        const interest = balance * monthlyRate;
        originalInterest += interest;
        balance = balance + interest - monthlyPayment;
        originalMonths++;
    }

    // New payoff with extra
    balance = loanBalance;
    let newMonths = 0;
    let newInterest = 0;
    const totalPayment = monthlyPayment + extraPayment;
    while (balance > 0 && newMonths < 360) {
        const interest = balance * monthlyRate;
        newInterest += interest;
        balance = balance + interest - totalPayment;
        newMonths++;
    }

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + newMonths);

    return {
        originalMonths,
        newMonths,
        monthsSaved: originalMonths - newMonths,
        interestSaved: Math.round(originalInterest - newInterest),
        originalTotalInterest: Math.round(originalInterest),
        newTotalInterest: Math.round(newInterest),
        payoffDate,
    };
}

// ============================================
// REFINANCE COMPARISON
// ============================================

export interface RefinanceResult {
    currentMonthlyPayment: number;
    newMonthlyPayment: number;
    monthlySavings: number;
    currentTotalInterest: number;
    newTotalInterest: number;
    totalSavings: number;
    breakEvenMonths: number;
}

export function calculateRefinance(
    loanBalance: number,
    currentRate: number,
    newRate: number,
    newTermYears: number
): RefinanceResult {
    const current = calculateLoanPayment(loanBalance, currentRate, 10);
    const refinanced = calculateLoanPayment(loanBalance, newRate, newTermYears);

    const monthlySavings = current.monthlyPayment - refinanced.monthlyPayment;
    const totalSavings = current.totalInterest - refinanced.totalInterest;
    const breakEvenMonths = totalSavings > 0 ? 0 : Math.ceil(Math.abs(totalSavings) / Math.abs(monthlySavings));

    return {
        currentMonthlyPayment: current.monthlyPayment,
        newMonthlyPayment: refinanced.monthlyPayment,
        monthlySavings: Math.round(monthlySavings),
        currentTotalInterest: current.totalInterest,
        newTotalInterest: refinanced.totalInterest,
        totalSavings: Math.round(totalSavings),
        breakEvenMonths,
    };
}

// ============================================
// IDR CALCULATION (Income-Driven Repayment)
// ============================================

export interface IDRResult {
    planName: string;
    monthlyPayment: number;
    discretionaryIncome: number;
    povertyLine: number;
    forgivenessYears: number;
    totalPayments: number;
    estimatedForgiveness: number;
}

export function calculateIDR(
    loanBalance: number,
    annualIncome: number,
    familySize: number,
    plan: 'save' | 'paye' | 'ibr' | 'icr' = 'save',
    isUndergrad: boolean = true
): IDRResult {
    const { idrPlans, povertyGuidelines } = STUDENT_LOAN_CONSTANTS;
    const selectedPlan = idrPlans[plan];

    // Calculate poverty line for family size
    const povertyLine = povertyGuidelines.baseAmount +
        (familySize - 1) * povertyGuidelines.perAdditionalPerson;

    // Calculate protected income (varies by plan)
    const povertyMultiplier = plan === 'save' ? 225 : 150;
    const protectedIncome = povertyLine * (povertyMultiplier / 100);

    // Discretionary income
    const discretionaryIncome = Math.max(0, annualIncome - protectedIncome);

    // Income percentage (SAVE uses 5% for undergrad only)
    let incomePercent = selectedPlan.incomePercent;
    if (plan === 'save' && isUndergrad) {
        incomePercent = idrPlans.save.undergradPercent;
    }

    // Monthly payment
    const annualPayment = (discretionaryIncome * incomePercent) / 100;
    const monthlyPayment = Math.round(annualPayment / 12);

    // Forgiveness timeline
    let forgivenessYears = 20;
    if (plan === 'save') {
        forgivenessYears = isUndergrad ? 20 : 25;
        if (loanBalance < 12000) forgivenessYears = 10;
    } else if (plan === 'icr') {
        forgivenessYears = 25;
    }

    const totalPayments = monthlyPayment * forgivenessYears * 12;
    const estimatedForgiveness = Math.max(0, loanBalance - totalPayments + (loanBalance * 0.05 * forgivenessYears));

    return {
        planName: selectedPlan.name,
        monthlyPayment,
        discretionaryIncome,
        povertyLine,
        forgivenessYears,
        totalPayments,
        estimatedForgiveness: Math.round(estimatedForgiveness),
    };
}

// ============================================
// PSLF CALCULATION
// ============================================

export interface PSLFResult {
    qualifyingPaymentsMade: number;
    paymentsRemaining: number;
    monthsRemaining: number;
    forgivenessDate: Date;
    estimatedForgiveness: number;
    monthlyPayment: number;
}

export function calculatePSLF(
    loanBalance: number,
    annualIncome: number,
    familySize: number,
    paymentsMade: number
): PSLFResult {
    const { pslf } = STUDENT_LOAN_CONSTANTS;
    const idrResult = calculateIDR(loanBalance, annualIncome, familySize, 'save', true);

    const paymentsRemaining = Math.max(0, pslf.requiredPayments - paymentsMade);
    const monthsRemaining = paymentsRemaining;

    const forgivenessDate = new Date();
    forgivenessDate.setMonth(forgivenessDate.getMonth() + monthsRemaining);

    const totalPaymentsRemaining = idrResult.monthlyPayment * paymentsRemaining;
    const interestAccrued = loanBalance * 0.05 * (monthsRemaining / 12);
    const estimatedForgiveness = loanBalance + interestAccrued - totalPaymentsRemaining;

    return {
        qualifyingPaymentsMade: paymentsMade,
        paymentsRemaining,
        monthsRemaining,
        forgivenessDate,
        estimatedForgiveness: Math.round(Math.max(0, estimatedForgiveness)),
        monthlyPayment: idrResult.monthlyPayment,
    };
}

// ============================================
// FORGIVENESS TIMELINE
// ============================================

export interface ForgivenessResult {
    standardPayoffDate: Date;
    idrForgivenessDate: Date;
    pslfForgivenessDate: Date;
    standardTotalPaid: number;
    idrTotalPaid: number;
    pslfTotalPaid: number;
    recommendedPath: string;
}

export function calculateForgiveness(
    loanBalance: number,
    annualIncome: number,
    familySize: number,
    isPublicService: boolean
): ForgivenessResult {
    const standard = calculateLoanPayment(loanBalance, 6.39, 10);
    const idr = calculateIDR(loanBalance, annualIncome, familySize, 'save', true);

    const now = new Date();
    const standardPayoffDate = new Date(now);
    standardPayoffDate.setFullYear(standardPayoffDate.getFullYear() + 10);

    const idrForgivenessDate = new Date(now);
    idrForgivenessDate.setFullYear(idrForgivenessDate.getFullYear() + idr.forgivenessYears);

    const pslfForgivenessDate = new Date(now);
    pslfForgivenessDate.setFullYear(pslfForgivenessDate.getFullYear() + 10);

    const idrTotalPaid = idr.monthlyPayment * idr.forgivenessYears * 12;
    const pslfTotalPaid = idr.monthlyPayment * 120;

    let recommendedPath = "Standard 10-year repayment";
    if (isPublicService && idr.monthlyPayment < standard.monthlyPayment) {
        recommendedPath = "PSLF with SAVE Plan";
    } else if (idrTotalPaid < standard.totalPayment) {
        recommendedPath = "IDR with forgiveness";
    }

    return {
        standardPayoffDate,
        idrForgivenessDate,
        pslfForgivenessDate,
        standardTotalPaid: standard.totalPayment,
        idrTotalPaid,
        pslfTotalPaid,
        recommendedPath,
    };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatPercent(value: number): string {
    return `${value.toFixed(2)}%`;
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
