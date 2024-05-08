import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TrackPropsAcrossRoutesProvider } from "../extends/next/TrackPropsAcrossRoutes";
import StyledComponentsRegistry from "../extends/styled-components/StyledComponentsRegistry";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledComponentsRegistry>
      <TrackPropsAcrossRoutesProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </TrackPropsAcrossRoutesProvider>
    </StyledComponentsRegistry>
  );
}
