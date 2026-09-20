/**写真アップロード画面の状態管理・アップロードカスタムフック */

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Member, Staff } from "@/types";
import { getImageUrl } from "@/lib/service/image.service";
import {
  OptimizedImageResult,
  optimizeImage,
} from "@/lib/utils/imageOptimizer";
import { uploadPhotoAction } from "@/lib/actions/photo.action";

export function usePhotoManager(
  entity: "members" | "staff",
  data: (Member | Staff)[],
) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [cacheBuster, setCacheBuster] = useState<number>(() => Date.now());
  const [imageError, setImageError] = useState(false);

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [optimizedResult, setOptimizedResult] =
    useState<OptimizedImageResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedPerson = data.find((p) => p.id === selectedId);

  useEffect(() => {
    setImageError(false);
  }, [selectedId, cacheBuster]);

  useEffect(() => {
    return () => {
      if (optimizedResult) {
        URL.revokeObjectURL(optimizedResult.previewUrl);
        URL.revokeObjectURL(optimizedResult.originalUrl);
      }
    };
  }, [optimizedResult]);

  const handleResetPhoto = () => {
    setOptimizedResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePersonChange = (id: number | null) => {
    handleResetPhoto();
    setSelectedId(id);
    setMessage(null);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  /**
   * 画像最適化処理
   * @param e  
   * @returns
   */
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMessage(null);
    handleResetPhoto();

    setIsOptimizing(true);

    try {
      const result = await optimizeImage(file);
      setOptimizedResult(result);
    } catch (e) {
      console.error("画像最適化エラー", e);
      setMessage(
        `❌️ ${e instanceof Error ? e.message : "画像の最適化中にエラーが発生しました"}`,
      );
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedPerson || !optimizedResult || isUploading) return;

    setIsUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", optimizedResult.file);
      formData.append("entity", entity);
      formData.append("id", String(selectedPerson.id));

      const res = await uploadPhotoAction(formData);
      if (res.success) {
        setMessage("✅ 画像をアップロードしました");
        setCacheBuster(Date.now());
        handleResetPhoto();
      } else {
        setMessage(
          `❌️ ${res.error ?? "画像のアップロード中にエラーが発生しました。"} `,
        );
      }
    } catch (e) {
      console.error("画像アップロードエラー", e);
      setMessage("❌️ 画像のアップロード中にエラーが発生しました。");
    } finally {
      setIsUploading(false);
    }
  };

  const currentPhotoUrl = selectedPerson
    ? imageError
      ? "/images/default.webp"
      : `${getImageUrl(selectedPerson)}?t=${cacheBuster}`
    : "/images/default.webp";

  return {
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
    handleResetPhoto,
    handleSubmit,
    triggerFileSelect,
  };
}
