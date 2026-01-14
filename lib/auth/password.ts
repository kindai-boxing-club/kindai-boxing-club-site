export async function hashPassword(password: string): Promise<string> {
  // TODO 1: Salt を生成
  // ヒント: const salt = crypto.getRandomValues(new Uint8Array(16));
  // TODO 2: パスワードをバイト配列に変換
  // ヒント: const encoder = new TextEncoder();
  //         const passwordBytes = encoder.encode(password);
  // TODO 3: 鍵マテリアルを作成
  // ヒント: const keyMaterial = await crypto.subtle.importKey(
  //           "raw",
  //           passwordBytes,
  //           ALGORITHM,
  //           false,
  //           ["deriveBits"]
  //         );
  // TODO 4: ハッシュを生成
  // ヒント: const hash = await crypto.subtle.deriveBits(
  //           {
  //             name: ALGORITHM,
  //             salt: salt,
  //             iterations: ITERATIONS,
  //             hash: "SHA-256",
  //           },
  //           keyMaterial,
  //           KEY_LENGTH
  //         );
  // TODO 5: 結合して base64 で返す
  // ヒント: const combined = new Uint8Array(salt.length + hash.byteLength);
  //         combined.set(salt);
  //         combined.set(new Uint8Array(hash), salt.length);
  //         return btoa(String.fromCharCode(...combined));
}
