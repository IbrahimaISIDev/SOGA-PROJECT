import Link from "next/link";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  variant?: "dark" | "sand";
}

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  variant = "dark",
}: PageHeaderProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`pt-24 pb-12 md:pt-32 md:pb-16 ${
        isDark ? "bg-soga-black" : "bg-soga-petrol"
      }`}
    >
      <div className="container-soga">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-eyebrow text-white/40">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-white/70 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className="text-eyebrow text-white/50 mb-4">{eyebrow}</p>
        )}
        <h1 className="text-h1 text-white">{title}</h1>
        {subtitle && (
          <p className="text-lead text-white/70 mt-4 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
