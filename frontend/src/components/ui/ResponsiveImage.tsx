/* eslint-disable @next/next/no-img-element */

import type { ImgHTMLAttributes } from "react";

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes"> & {
  source: string;
  widths: readonly number[];
  sizes: string;
};

function withWidth(source: string, width: number, extension: "avif" | "webp") {
  return `${source.replace(/\.[^.]+$/, "")}-${width}.${extension}`;
}

function createSrcSet(source: string, widths: readonly number[], extension: "avif" | "webp") {
  return widths.map((width) => `${withWidth(source, width, extension)} ${width}w`).join(", ");
}

export function ResponsiveImage({ source, widths, sizes, alt, ...props }: ResponsiveImageProps) {
  if (/^https?:\/\//i.test(source)) {
    return <img {...props} src={source} alt={alt} />;
  }

  const fallback = withWidth(source, widths[0] ?? 480, "webp");

  return (
    <picture>
      <source type="image/avif" srcSet={createSrcSet(source, widths, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={createSrcSet(source, widths, "webp")} sizes={sizes} />
      <img {...props} src={fallback} alt={alt} sizes={sizes} />
    </picture>
  );
}
