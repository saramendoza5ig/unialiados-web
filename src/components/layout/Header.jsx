"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  ["/", "Inicio"],
  ["/nosotros", "Nosotros"],
  ["/servicios", "Servicios"],
  ["/unisoft", "Unisoft"],
  ["/analisis-vulnerabilidades", "Análisis de Vulnerabilidades"],
  ["/contacto", "Contáctenos"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="topbar">
        <div className="container topbar-row">
          <span className="topitem"><span className="topicon">☎</span> Móvil: 300 447 0236</span>
          <span className="dot">•</span>
          <span className="topitem"><span className="topicon">☎</span> Móvil: 313 428 3965</span>
          <span className="dot">•</span>
          <span className="topitem"><span className="topicon">⌖</span> Bogotá D.C.</span>
          <span className="top-spacer" />
          <span className="topitem"><span className="topicon gold">◷</span> Lunes a viernes: 8:00 a.m. a 5:00 p.m.</span>
        </div>
      </div>
      <header className="header">
        <div className="container header-row">
          <Link className="brand" href="/" onClick={() => setOpen(false)}>
            <Image src="/images/logo-unialiados.png" alt="Unialiados" width={440} height={116} priority />
          </Link>
          <button className="menu-btn" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen((value) => !value)}>☰</button>
          <nav className={`nav${open ? " open" : ""}`}>
            {navItems.map(([href, label]) => (
              <Link key={href} className={pathname === href ? "active" : ""} href={href} onClick={() => setOpen(false)}>{label}</Link>
            ))}
            <Link className="nav-cta" href="/servicios#cotizador" onClick={() => setOpen(false)}>Cotizar en Línea</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
