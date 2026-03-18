import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Boo's Garden",
  description: "Tend your daily garden, one day at a time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
