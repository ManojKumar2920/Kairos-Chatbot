import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kairos AI",
  description: "Kairos is the Generative AI build with Gemini Model",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NavBar />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
