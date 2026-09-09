import Link from "next/link";

export default function Button({
  children,
  href,
  type = "button",
  className = "",
}) {
  const styles =
    "inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium transition hover:opacity-90";

  if (href) {
    return (
      <Link
        href={href}
        className={`${styles} bg-black text-white ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${styles} bg-black text-white ${className}`}
    >
      {children}
    </button>
  );
}