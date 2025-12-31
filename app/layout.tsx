import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "./site-config";

const GA_MEASUREMENT_ID = "G-CLQYC4HRE3";
const ADSENSE_ID = "ca-pub-6678501910155801";

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
