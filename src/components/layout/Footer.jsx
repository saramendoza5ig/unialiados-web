export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Unialiados. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}