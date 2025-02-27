import "./globals.css";
import { figtree } from "@/app/utils/fonts";

export const metadata = {
  title: "@Matheus - Deer Designer Testing",
  description: "Test 2 - @Matheus Emmanuel",
  icons: {
    icon: "/logo_dd_green.svg",
    shortcut: "/logo_dd_green.svg",
    apple: "/logo_dd_green.svg",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
