import { AnchorHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
  children: ReactNode;
};

export default function PrimaryButton({ href, children, ...rest }: PrimaryButtonProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-linear-to-r from-sky-500 to-sky-600 text-white font-bold text-sm shadow-lg hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all shrink-0"
      {...rest}
    >
      {children}
    </a>
  );
}
