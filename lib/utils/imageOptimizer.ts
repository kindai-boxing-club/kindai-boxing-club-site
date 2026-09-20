/** クライアントサイド画像最適化（WebP化・リサイズ・回転補正） */

/**
 * 最適化された写真の情報
 */
export type OptimizedImageResult = {
  file: File; //最適化された写真
  originalUrl: string; // 元の写真のURL
  previewUrl: string; // 最適化された写真のURL
  originalSize: number; // 元の写真のサイズ
  optimizedSize: number; // 最適化された写真のサイズ
};

/**
 * 写真を最適化する
 * @param file 最適化対象の写真
 * @returns 最適化された写真の情報
 */
export async function optimizeImage(file: File): Promise<OptimizedImageResult> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    });
  } catch {
    const isHeic =
      /\.(heic|heif)$/i.test(file.name) ||
      file.type === "image/heic" ||
      file.type === "image/heif";
    if (isHeic) {
      throw new Error(
        "HEIC形式の写真はPCから読み込めません。JPG/PNG形式の写真を選んでください\nhttps://www.iloveimg.com/ja/convert-to-jpg/heic-to-jpg",
      );
    }
    throw new Error(
      "画像を読み込めませんでした。壊れているか非対応の形式です。",
    );
  }

  // 1. EXIF向き補正付きで画像を読み込み

  // 2. 600*800 (3:4) の Canvas を準備
  const canvas = document.createElement("canvas");
  const [w, h] = [600, 800]; // 最適化後の画像サイズ 600x800px
  canvas.width = w;
  canvas.height = h;

  // 3. 中央トリミング（3:4 に収まるように拡大率と位置を計算）
  const scale = Math.max(w / bitmap.width, h / bitmap.height);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (bitmap.width - sw) / 2;
  const sy = (bitmap.height - sh) / 2;

  try {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas の初期化に失敗しました");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, w, h);
  } finally {
    bitmap.close();
  }

  // 4. WebP 形式、品質0.9 で圧縮
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("WebP変換に失敗しました"))),
      "image/webp",
      0.9,
    ),
  );
  const optimizedFile = new File(
    [blob],
    `${file.name.replace(/\.[^.]+$/, "")}.webp`,
    { type: "image/webp" },
  );

  return {
    file: optimizedFile,
    originalUrl: URL.createObjectURL(file),
    previewUrl: URL.createObjectURL(optimizedFile),
    originalSize: file.size,
    optimizedSize: optimizedFile.size,
  };
}
