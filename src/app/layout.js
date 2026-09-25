import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteEnhancements from "@/components/layout/SiteEnhancements";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: {
    default: "Unialiados",
    template: "%s · Unialiados",
  },
  description: "Gestión laboral, seguridad social y acompañamiento empresarial para empresas en Colombia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={montserrat.variable}>
        <Header />
        {children}
        <Footer />
        <SiteEnhancements />
      </body>
    </html>
  );
}
