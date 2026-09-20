/**部員・スタッフの写真アップロード画面 */
"use client";
import { Member, Staff } from "@/types";
import { usePhotoManager } from "./usePhotoManager";
import Image from "next/image";

const STYLES = {
  container: "space-y-6 max-w-3xl",
  card: "bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4",
  message:
    "p-4 m-4 bg-slate-50 border border-slate-200 rounded-xl  space-y-1 font-bold",
  select:
    "block w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-base font-medium text-slate-900 focus:border-blue-500 focus:outline-none",
  photoBox:
    "w-44 aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative",
  btnPrimary:
    "px-6 py-2.5 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-900 hover:shadow-md disabled:opacity-50 flex items-center gap-2 cursor-pointer",
  btnSecondary:
    "px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-50 disabled:opacity-50 cursor-pointer",
} as const;

type Props = {
  entity: "members" | "staff";
  data: (Member | Staff)[];
};
export default function PhotoManager({ entity, data }: Props) {
  const {
    selectedId,
    selectedPerson,
    currentPhotoUrl,
    setImageError,
    isOptimizing,
    isUploading,
    optimizedResult,
    message,
    fileInputRef,
    handlePersonChange,
    handleFileChange,
    handleSubmit,
    triggerFileSelect,
  } = usePhotoManager(entity, data);

  const reductionPercent =
    optimizedResult && optimizedResult?.originalSize > 0
      ? Math.max(
          0,
          Math.round(
            (1 -
              optimizedResult?.optimizedSize / optimizedResult?.originalSize) *
              100,
          ),
        )
      : 0;

  return (
    <div className={STYLES.container}>
      {/* 対象者選択 */}
      <div className={STYLES.card}>
        <label
          htmlFor="person-select"
          className="block text-sm font-bold text-slate-700"
        >
          写真をアップロードする対象者を選択
        </label>
        <select
          className={STYLES.select}
          id="person-select"
          value={selectedId ?? ""}
          onChange={(e) =>
            handlePersonChange(e.target.value ? Number(e.target.value) : null)
          }
          disabled={isUploading || isOptimizing}
        >
          <option value="">対象者を選択してください</option>
          {data.map((p) => (
            <option key={p.id} value={p.id}>
              {`${p.name} (${p.grade})`}
            </option>
          ))}
        </select>
      </div>

      {/* メッセージ */}
      {message && <div className={STYLES.message}>{message}</div>}

      {/* 写真アップロード操作エリア */}
      {selectedPerson ? (
        <div className={STYLES.card}>
          <input
            ref={fileInputRef}
            type="file"
            id="photo-upload-input"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            onClick={(e) => {
              (e.target as HTMLInputElement).value = "";
            }}
            disabled={isOptimizing || isUploading}
            className="sr-only"
          />

          {/*写真表示エリア */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/*1. 現在の登録写真 */}
            <div className="flex flex-col items-center">
              <p className="font-bold">現在の登録写真 →</p>
              <div className={STYLES.photoBox}>
                <Image
                  src={currentPhotoUrl}
                  alt={selectedPerson.name}
                  fill
                  unoptimized
                  onError={() => setImageError(true)}
                  className="object-cover"
                />
              </div>
            </div>

            {/*2. 選択した写真 */}
            {optimizedResult && (
              <div className="flex flex-col items-center">
                <span className="font-bold">選択した写真 →</span>
                <div className={STYLES.photoBox}>
                  <Image
                    src={optimizedResult.originalUrl}
                    alt={selectedPerson.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/*3. 最適化された写真 */}
            {optimizedResult && (
              <div className="flex flex-col items-center">
                <span className="font-bold">最適化された写真</span>
                <div className={STYLES.photoBox}>
                  <Image
                    src={optimizedResult.previewUrl}
                    alt={selectedPerson.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ボタン */}
          <div>
            <div className="flex-1 w-full flex flex-col items-center gap-4">
              {!optimizedResult ? (
                <div>
                  <label
                    htmlFor="photo-upload-input"
                    className={STYLES.btnPrimary}
                  >
                    <div>写真を選択（JPG, PNG, WEBP に対応）</div>
                  </label>
                  {isOptimizing && <p>画像を最適化中 ...</p>}
                </div>
              ) : (
                <div>
                  <div className="text-center">
                    <p className="font-bold text-amber-500">
                      {reductionPercent}% サイズダウン
                    </p>
                    <p>画像を最適化しました（リサイズ・WebP変換）</p>
                  </div>
                  <div className="flex justify-center gap-4 mt-3">
                    <button
                      type="button"
                      onClick={triggerFileSelect}
                      disabled={isUploading}
                      className={STYLES.btnSecondary}
                    >
                      選び直す
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isUploading}
                      className={STYLES.btnPrimary}
                    >
                      {isUploading
                        ? "アップロード中..."
                        : "最適化された写真を保存する"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>写真をアップロードしたい対象者を上から選択してください</div>
      )}
    </div>
  );
}
