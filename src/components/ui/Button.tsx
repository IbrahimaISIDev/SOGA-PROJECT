"use client";

import Link from "next/link";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    as?: "button";
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

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

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-sans transition-all duration-200 " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 " +
    "min-h-[44px] cursor-pointer";

  const classes = `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (props.as === "a") {
    const { as: _as, ...anchorProps } = props;
    return (
      <Link className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { as: _as, ...buttonProps } = props;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
