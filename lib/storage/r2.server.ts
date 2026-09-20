/** R2オブジェクトストレージのサーバー専用操作 */
import { getRequestContext } from "@cloudflare/next-on-pages";

/**
 * Cloudflare Pages の Edge Context から R2 バケットを取得
 */
export function getStorage(): R2Bucket | null {
  try {
    const { env } = getRequestContext();
    return env.STORAGE ?? null;
  } catch (e) {
    console.warn("R2 Storage connection not available: ", e);
    return null;
  }
}

/**
 * 人物の写真を R2 に保存（同名ファイルは自動上書き）
 *
 * @param folder 保存先フォルダー ("members" | "staff")
 * @param id 対象のID
 * @param data 画像のバイナリデータ
 */
export async function putPersonPhoto(
  folder: "members" | "staff",
  id: number,
  data: ArrayBuffer,
): Promise<boolean> {
  const storage = getStorage();
  if (!storage) {
    console.error("R2 Storage not available");
    return false;
  }

  try {
    const key = `${folder}/${id}.webp`;
    await storage.put(key, data, {
      httpMetadata: {
        contentType: "image/webp",
        cacheControl: "public, max-age=60, s-maxage=300",
      },
    });
    return true;
  } catch (e) {
    console.error("Failed to put photo to R2: ", e);
    return false;
  }
}
