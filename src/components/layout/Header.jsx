import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Unialiados
        </Link>

        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/analisis-vulnerabilidades">
            Análisis de Vulnerabilidades
          </Link>
          <Link href="/cotizador">Cotizador</Link>
          <Link href="/contacto">Contáctenos</Link>
          <Link href="/unisoft">Unisoft</Link>
        </nav>
      </div>
    </header>
  );
}