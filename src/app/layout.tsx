import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TrackPropsAcrossRoutesProvider } from "../extends/next/TrackPropsAcrossRoutes";
import StyledComponentsRegistry from "../extends/styled-components/StyledComponentsRegistry";
import TwoColRouter from "./TwoColRouter";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
};

const layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <StyledComponentsRegistry>
      <TrackPropsAcrossRoutesProvider>
        <html lang="en">
          <body className={inter.className}>
            <TwoColRouter>{props.children}</TwoColRouter>
          </body>
        </html>
      </TrackPropsAcrossRoutesProvider>
    </StyledComponentsRegistry>
  );
};

export default layout;
