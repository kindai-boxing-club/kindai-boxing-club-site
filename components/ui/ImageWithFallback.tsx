"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
  sizes?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallback,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <>{fallback}</>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className ?? "object-cover"}
      sizes={sizes}
      onError={() => setFailed(true)}
      priority={false}
    />
  );
}
