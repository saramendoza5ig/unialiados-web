import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiChevronRight, FiClock, FiMail, FiMapPin, FiSmartphone } from "react-icons/fi";
import styles from "./Footer.module.css";

const navigation = [
  ["/", "Inicio"],
  ["/nosotros", "Nosotros"],
  ["/servicios", "Servicios"],
  ["/unisoft", "Unisoft"],
  ["/contacto", "Contáctenos"],
];

const tools = [
  ["/servicios#cotizador", "Cotizador en línea"],
  ["/analisis-vulnerabilidades", "Análisis de Vulnerabilidades"],
  ["/servicios", "Portafolio empresarial"],
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.about}>
            <Link className={styles.brand} href="/" aria-label="Unialiados, ir al inicio">
              <Image src="/images/logo-unialiados.png" alt="Unialiados" width={410} height={108} />
            </Link>
            <p>Gestión laboral, seguridad social y acompañamiento empresarial para una operación más clara y confiable.</p>
          </div>

          <nav className={styles.column} aria-label="Navegación del pie de página">
            <h2>Navegación</h2>
            <ul className={styles.links}>
              {navigation.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}><FiChevronRight aria-hidden="true" />{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.column} aria-label="Herramientas del pie de página">
            <h2>Herramientas</h2>
            <ul className={styles.links}>
              {tools.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}><FiCheck aria-hidden="true" />{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <h2>Contacto</h2>
            <ul className={styles.contactList}>
              <li><FiSmartphone aria-hidden="true" /><a href="tel:+573004455981">Móvil: 300 445 5981</a></li>
              <li><FiSmartphone aria-hidden="true" /><a href="tel:+573214220446">Móvil: 321 422 0446</a></li>
              <li><FiMail aria-hidden="true" /><a href="mailto:comercial@unialiados.com">comercial@unialiados.com</a></li>
              <li><FiMail aria-hidden="true" /><a href="mailto:administracion@unialiados.com">administracion@unialiados.com</a></li>
              <li><FiMapPin aria-hidden="true" /><span>Calle 57 N.º 13-48, Oficina 401, Bogotá D.C.</span></li>
            </ul>
            <div className={styles.hours}><FiClock aria-hidden="true" /><span>Lunes a viernes: 8:00 a.m. a 5:00 p.m.</span></div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Unialiados. Todos los derechos reservados.</span>
          <span>Web desarrollada por <a href="https://5igsolutions.com" target="_blank" rel="noopener noreferrer">5igsolutions.com</a>.</span>
        </div>
      </div>
    </footer>
  );
}
