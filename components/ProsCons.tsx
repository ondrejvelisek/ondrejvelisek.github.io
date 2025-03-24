import React from "react";

export function Pro({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>) {
  return (
    <li {...props}>
      <span className="bg-[rgba(0,255,0,0.15)] rounded-full font-bold text-[rgba(200,255,150,0.65)] text-center inline-block leading-4 pb-1 w-5 align-text-top">
        +
      </span>{" "}
      {children}
    </li>
  );
}

export function Con({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>) {
  return (
    <li {...props}>
      <span className="bg-[rgba(255,50,0,0.2)] rounded-full font-black text-[rgba(255,170,150.8)] text-center inline-block leading-4 pb-1 w-5 align-text-top">
        -
      </span>{" "}
      {children}
    </li>
  );
}
