import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import "../styles/bootstrap.min.css";
import "../styles/common.css";
import "../styles/main.css";
import "../styles/responsive.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Buddy Script",
  description: "Social Feed Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}