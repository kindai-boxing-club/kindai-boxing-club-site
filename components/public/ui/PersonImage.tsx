/**
 * @file components/public/ui/PersonImage.tsx
 * @description 人物画像を表示するコンポーネント
 *
 * 機能:
 * - ID から画像パスを自動生成（R2 ストレージ）
 * - 画像読み込みエラー時にデフォルト画像を表示
 */
"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { Person } from "@/types";
import { getPersonImage } from "@/lib/utils/path";

type Props = Omit<ImageProps, "src" | "alt" | "onError"> & {
  person: Person;
  defaultImage?: string;
};

/**
 * 人物画像を表示するコンポーネント
 * - IDから画像パスを生成 ({id}.webp)
 * - 読み込みエラー時はデフォルト画像を表示
 */
export default function PersonImage({
  person,
  defaultImage = "/images/default.png",
  className,
  ...props
}: Props) {
  const [src, setSrc] = useState(getPersonImage(person.id));

  // personが変わったときにソースをリセット (モーダルなどで重要)
  useEffect(() => {
    setSrc(getPersonImage(person.id));
  }, [person.id]);

  return (
    <Image
      src={src}
      alt={person.name}
      className={className}
      onError={() => setSrc(defaultImage)}
      {...props}
    />
  );
}
