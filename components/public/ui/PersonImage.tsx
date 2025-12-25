"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { Person } from "@/types";
import { getMemberImage } from "@/lib/utils/path";

type Props = Omit<ImageProps, "src" | "alt" | "onError"> & {
  person: Person;
  defaultImage?: string;
};

/**
 * 人物画像を表示するコンポーネント
 * - image_urlがあればそれを使用 (Staff/Coach用)
 * - なければIDから生成 (Member用)
 * - 読み込みエラー時はデフォルト画像を表示
 */
export default function PersonImage({
  person,
  defaultImage = "/images/default.png",
  className,
  ...props
}: Props) {
  const [src, setSrc] = useState(person.image_url || getMemberImage(person.id));

  // personが変わったときにソースをリセット (モーダルなどで重要)
  useEffect(() => {
    setSrc(person.image_url || getMemberImage(person.id));
  }, [person.id, person.image_url]);

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
