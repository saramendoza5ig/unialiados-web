"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-unialiados-gray">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo-unialiados.png"
            alt="Unialiados"
            width={160}
            height={60}
            className="w-32 sm:w-36 md:w-40 h-auto"
            priority
          />
        </Link>

        <button
          className="md:hidden text-unialiados-navy text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <nav className="hidden md:flex gap-6 text-unialiados-navy font-medium">
          <Link href="/">Home</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/cotizador">Cotizador</Link>
          <Link href="/analisis-vulnerabilidades">
            Análisis de Vulnerabilidades
          </Link>
          <Link href="/contacto">Contáctenos</Link>
        </nav>
      </div>

      {open && (
        <nav className="md:hidden px-6 pb-4 flex flex-col gap-4 text-unialiados-navy font-medium">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/nosotros" onClick={() => setOpen(false)}>
            Nosotros
          </Link>
          <Link href="/servicios" onClick={() => setOpen(false)}>
            Servicios
          </Link>
          <Link href="/cotizador" onClick={() => setOpen(false)}>
            Cotizador
          </Link>
          <Link
            href="/analisis-vulnerabilidades"
            onClick={() => setOpen(false)}
          >
            Análisis de Vulnerabilidades
          </Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>
            Contáctenos
          </Link>
        </nav>
      )}
    </header>
  );
}