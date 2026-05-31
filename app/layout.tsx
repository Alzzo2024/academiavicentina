import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Academia Vicentina",
  description: "Usque ad finem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" data-scroll-behavior="smooth">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          precedence="default"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}