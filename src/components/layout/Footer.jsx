import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="brand footer-brand" href="/">
              <Image src="/images/logo-unialiados.png" alt="Unialiados" width={410} height={108} />
            </Link>
            <p>Gestión laboral, seguridad social y acompañamiento empresarial para una operación más clara y confiable.</p>
          </div>
          <div>
            <h4>Navegación</h4>
            <Link href="/">Inicio</Link><Link href="/nosotros">Nosotros</Link><Link href="/servicios">Servicios</Link><Link href="/contacto">Contáctenos</Link>
          </div>
          <div>
            <h4>Herramientas</h4>
            <Link href="/cotizador">Cotizador en línea</Link><Link href="/analisis-vulnerabilidades">Análisis de Vulnerabilidades</Link><Link href="/servicios">Portafolio empresarial</Link>
          </div>
          <div>
            <h4>Contacto</h4>
            <a href="tel:+576012486717">PBX: +57 (601) 248 6717</a>
            <a href="https://wa.me/573004455981" target="_blank" rel="noopener noreferrer">WhatsApp: +57 300 445 5981</a>
            <a href="mailto:hola@unialiados.com">hola@unialiados.com</a>
            <span className="footer-address">Bogotá D.C., Colombia</span>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Unialiados. Todos los derechos reservados.</span><span>Mockup visual · información demostrativa sujeta a validación.</span></div>
      </div>
    </footer>
  );
}
