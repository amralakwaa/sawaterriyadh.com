export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "right";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-right"}`}>
      {eyebrow && (
        <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground text-balance leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
    </div>
  );
}
