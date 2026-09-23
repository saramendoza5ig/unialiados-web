export default function Footer() {
  return (
    <footer className="bg-unialiados-navy text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm">
        © {new Date().getFullYear()} Unialiados. Todos los derechos reservados.
      </div>
    </footer>
  );
}