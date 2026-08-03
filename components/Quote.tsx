import React from "react";

type Variant = "accent" | "banner" | "plain";

const VARIANTS: Record<Variant, string> = {
  // Left accent bar, transparent background
  accent:
    "border-l-4 border-solid border-y-0 border-r-0 pl-5",
  // Soft tinted panel
  banner:
    "border-0 rounded-lg px-6 py-4 bg-[hsl(var(--ifm-color-primary-hue)_68%_55%_/_0.1)] text-[var(--ifm-color-primary-lightest)]",
  // No decoration, just big and centered
  plain: "border-0 px-0 text-center text-[#e8e8e8]",
};

export function Quote({
  children,
  variant = "accent",
  className = "",
  ...props
}: {
  variant?: Variant;
} & React.DetailedHTMLProps<
  React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
  HTMLQuoteElement
>) {
  return (
    <blockquote
      className={`text-[1.4rem] leading-snug italic font-normal my-8 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </blockquote>
  );
}
