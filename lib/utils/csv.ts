/**
 * CSV解析ユーティリティ
 */

/**
 * 簡易CSVパーサー
 * 引用符で囲まれたフィールドや、引用符内の改行を処理します。
 */
export function parseCSV(content: string): Record<string, string>[] {
  const lines: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // Skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        currentRow.push(currentField);
        currentField = "";
      } else if (char === "\n" || (char === "\r" && nextChar === "\n")) {
        currentRow.push(currentField);
        lines.push(currentRow);
        currentRow = [];
        currentField = "";
        if (char === "\r") i++; // Skip \n
      } else if (char === "\r") {
        // Handle CR only line endings if necessary, though rare now
        currentRow.push(currentField);
        lines.push(currentRow);
        currentRow = [];
        currentField = "";
      } else {
        currentField += char;
      }
    }
  }

  // Push last field/row if exists
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    lines.push(currentRow);
  }

  if (lines.length === 0) return [];

  const headers = lines[0].map((h) => h.trim());
  const rows = lines.slice(1);

  return rows.map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || "";
    });
    return obj;
  });
}
