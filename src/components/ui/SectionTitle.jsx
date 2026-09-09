export default function SectionTitle({
  title,
  description,
  eyebrow,
  align = "left",
}) {
  const alignment =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-lg leading-8 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}