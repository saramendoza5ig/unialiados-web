import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteEnhancements from "@/components/layout/SiteEnhancements";
import { Montserrat } from "next/font/google";
import { FaWhatsapp } from "react-icons/fa6";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const whatsappUrl = `https://wa.me/573214220446?text=${encodeURIComponent("Hola, quiero recibir información sobre los servicios de Unialiados.")}`;

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
        <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Escribir a Unialiados por WhatsApp" title="Escríbenos por WhatsApp">
          <span aria-hidden="true"><FaWhatsapp /></span>
        </a>
      </body>
    </html>
  );
}
