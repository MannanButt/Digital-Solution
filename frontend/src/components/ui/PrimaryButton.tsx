import { AnchorHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
  children: ReactNode;
};

export default function PrimaryButton({ href, children, ...rest }: PrimaryButtonProps) {
  return (
    <a
      href={href}
      className="ds-primary-button"
      {...rest}
    >
      {children}
    </a>
  );
}
