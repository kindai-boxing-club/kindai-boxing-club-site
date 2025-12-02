/**
 * データ変換用マッパー関数群
 */
/**
 * CSVの分類値を表示用に変換する
 * @param val CSVの分類値
 * @returns 表示用の分類名
 */
export function mapClassification(val: string): string {
  if (val === "0") return "マネージャー";
  if (["1", "2", "3", "4"].includes(val)) return `${val}年`;
  return val; // "コーチ", "監督" など
}
