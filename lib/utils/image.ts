import fs from "fs";
import path from "path";
import { getPath } from "@/lib/utils/path";

/**
 * 指定されたディレクトリから、名前に一致する画像ファイルを検索する
 * 
 * @param directory 検索対象のディレクトリ（public以下の相対パス）
 * @param name 検索する名前（空白は除去して比較される）
 * @param defaultImage 画像が見つからなかった場合のデフォルト画像パス
 * @returns 見つかった画像のパス（getPathで処理済み）、またはデフォルト画像パス
 */
export function findImage(directory: string, name: string, defaultImage: string = "/images/default-member.png"): string {
  const publicDir = path.join(process.cwd(), "public");
  const targetDir = path.join(publicDir, directory);
  
  // 名前から空白を除去
  const sanitizedName = name.replace(/\s+/g, "");

  try {
    if (!fs.existsSync(targetDir)) {
      console.warn(`Directory not found: ${targetDir}`);
      return getPath(defaultImage);
    }

    const files = fs.readdirSync(targetDir);
    
    // 拡張子を除いたファイル名が一致するものを探す
    const foundFile = files.find(file => {
      const fileNameWithoutExt = path.parse(file).name;
      return fileNameWithoutExt === sanitizedName;
    });

    if (foundFile) {
      // パスの結合時に余分なスラッシュが入らないように調整
      const cleanDirectory = directory.startsWith("/") ? directory : `/${directory}`;
      return getPath(`${cleanDirectory}/${foundFile}`);
    }

  } catch (error) {
    console.error(`Error finding image for ${name}:`, error);
  }

  return getPath(defaultImage);
}
