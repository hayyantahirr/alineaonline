import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Alinea Online | High-Stakes Exam Excellence",
  description:
    "We don't teach the syllabus. We teach the mark scheme. Premium online academy for IGCSE and A-Level preparations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-on-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

