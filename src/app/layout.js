import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Unialiados",
  description: "Sitio web oficial de Unialiados",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}