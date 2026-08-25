import { Archivo_Black, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo-black",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Alinea Online | High-Stakes Exam Excellence",
  description:
    "We don't teach the syllabus. We teach the mark scheme. Premium online academy for IGCSE and A-Level preparations.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${workSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}