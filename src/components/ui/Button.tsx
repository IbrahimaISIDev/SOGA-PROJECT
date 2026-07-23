"use client";

import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  as?: "button" | "a";
  href?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-8 py-4 text-[15px]",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-soga-black text-soga-gold-light border border-soga-gold font-medium tracking-wide " +
    "hover:bg-soga-graphite hover:text-soga-gold-light " +
    "active:scale-[0.98] " +
    "disabled:opacity-40 disabled:cursor-not-allowed",
  secondary:
    "bg-transparent text-soga-ink border border-soga-ink font-medium tracking-wide " +
    "hover:border-soga-gold hover:text-soga-gold-deep " +
    "active:scale-[0.98] " +
    "disabled:opacity-40 disabled:cursor-not-allowed",
  tertiary:
    "bg-transparent text-soga-ink underline underline-offset-4 decoration-soga-line font-medium " +
    "hover:decoration-soga-gold hover:text-soga-gold-deep " +
    "disabled:opacity-40 disabled:cursor-not-allowed",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
  },
  ref
) {
  const base =
    "inline-flex items-center justify-center gap-2 font-sans transition-all duration-200 " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 " +
    "min-h-[44px] cursor-pointer";

  return (
    <button
      ref={ref}
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
