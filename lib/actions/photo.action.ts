/**写真アップロード用のサーバーアクション */

"use server";

import { putPersonPhoto } from "@/lib/storage/r2.server";
import { revalidatePath } from "next/cache";

export type UploadPhotoResult = {
  success: boolean;
  error?: string;
};

export async function uploadPhotoAction(
  formData: FormData,
): Promise<UploadPhotoResult> {
  try {
    const file = formData.get("file") as File | null;
    const entity = formData.get("entity") as string | null;
    const idStr = formData.get("id") as string | null;

    if (!file || !entity || !idStr) {
      return { success: false, error: "必要なデータが不足しています" };
    }

    if (entity !== "members" && entity !== "staff") {
      return { success: false, error: "不正なエンティティ種別です" };
    }

    const id = Number(idStr);
    if (isNaN(id) || id <= 0) {
      return { success: false, error: "不正なIDです" };
    }

    const buffer = await file.arrayBuffer();

    const ok = await putPersonPhoto(entity, id, buffer);
    if (!ok) {
      return { success: false, error: "ストレージへの保存に失敗しました" };
    }

    // キャッシュの更新
    revalidatePath(`/admin/${entity}/photo`);
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true };
  } catch (e) {
    console.error("uploadPhotoAction error: ", e);
    return { success: false, error: "処理中にエラーが発生しました" };
  }
}
