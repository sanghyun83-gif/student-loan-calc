import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "./site-config";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${SITE.year} ${SITE.name} | Free Loan Payment Calculator`,
  description: SITE.description,
  keywords: [
    "student loan calculator",
    "student loan payment",
    "student loan refinance",
    "PSLF calculator",
    "income driven repayment",
    "SAVE plan",
    "student loan forgiveness",
    "loan payoff calculator",
  ],
  openGraph: {
    title: `${SITE.year} Student Loan Calculator`,
    description: "Calculate student loan payments, refinancing, IDR plans, and PSLF eligibility.",
    type: "website",
  },
  verification: {
    google: "qlPMVO_Hb-be3_hFHNT9SBbsHO-b_wCOfWfLmTb4EQc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
