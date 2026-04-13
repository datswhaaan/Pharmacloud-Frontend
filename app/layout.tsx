import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/Wrapper";

import { RouteProvider } from "@/providers/route-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { NotificationProvider } from "@/providers/notification-provider";
import NotificationContainer from "@/components/NotificationContainer";

const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={notoThai.className}
      >
        <AuthProvider>
          <RouteProvider>
            <NotificationProvider>
                <Wrapper>
                  {children}
                </Wrapper>
                <NotificationContainer />
            </NotificationProvider>
          </RouteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
