type BadgeVariant = "niveau" | "duree" | "rentree" | "places" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  niveau:
    "bg-soga-petrol/10 text-soga-petrol border border-soga-petrol/20",
  duree:
    "bg-soga-sand border border-soga-line text-soga-muted",
  rentree:
    "bg-soga-gold/10 text-soga-gold-deep border border-soga-gold/30",
  places:
    "bg-red-50 text-red-700 border border-red-200",
  default:
    "bg-soga-sand border border-soga-line text-soga-ink",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={
        `inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-eyebrow text-[11px] ` +
        `${variantClasses[variant]} ${className}`
      }
    >
      {children}
    </span>
  );
}
