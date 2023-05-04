import "./globals.css";
import { Inter } from "next/font/google";
import cx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dracula">
      <body className={cx(inter.className, "bg-base-300")}>{children}</body>
    </html>
  );
}
