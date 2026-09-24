"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  ["/", "Inicio"],
  ["/nosotros", "Nosotros"],
  ["/servicios", "Servicios"],
  ["/cotizador", "Cotizador"],
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
          <span className="topitem"><span className="topicon">☎</span> PBX: +57 (601) 248 6717</span>
          <span className="dot">•</span>
          <span className="topitem"><span className="topicon">▤</span> WhatsApp: +57 300 445 5981</span>
          <span className="dot">•</span>
          <span className="topitem"><span className="topicon">⌖</span> Sede Principal: Bogotá D.C., Colombia</span>
          <span className="top-spacer" />
          <span className="topitem"><span className="topicon gold">◷</span> Lunes a Viernes: 8:00 a 17:00</span>
          <span className="dot">•</span>
          <span className="topitem"><span className="topicon">✹</span> NIT: 900.123.456-7</span>
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
            <Link className="nav-cta" href="/cotizador" onClick={() => setOpen(false)}>Cotizar en Línea</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
