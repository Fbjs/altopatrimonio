
import React, { type SVGProps } from "react";
import { cn } from "@/lib/utils";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 162 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M54 0L108 27V54L54 27V0Z" className="fill-primary" />
      <path d="M0 27L54 54V81L0 54V27Z" className="fill-primary" />
      <path d="M54 54L108 81V108L54 81V54Z" className="fill-primary" />
      <path d="M108 27L54 0V27L108 54V27Z" className="fill-current" />
      <path d="M54 54L0 27V54L54 81V54Z" className="fill-current" />
      <path d="M108 81L54 54V81L108 108V81Z" className="fill-current" />
    </svg>
  );
}
