import { useRef, useState } from "react";

import { useVerificationsQuery } from "@/hooks/mypage/useVerification";

import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_MB,
} from "@/constants/profile-uploader";

import { VerificationType } from "@/types/auth";

const MAX_FILES = 2;

export const useVerificationUpload = () => {
  const [verif, setVerif] = useState<VerificationType | "">("");
  const [uploadedMap, setUploadedMap] = useState<
    Partial<Record<VerificationType, File[]>>
  >({});
  const [previewMap, setPreviewMap] = useState<
    Partial<Record<VerificationType, string[]>>
  >({});
  const [isAgree, setIsAgree] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [modals, setModals] = useState({
    showAssignModal: false,
    showVerifKindModal: false,
    showNoVerificationAlert: false,
    showErrorModal: false,
    showMaxImageModal: false,
    showDuplicateModal: false,
  });

  const { data: existingVerifications } = useVerificationsQuery();

  const setModal = (name: keyof typeof modals, value: boolean) => {
    setModals(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    if (!verif) {
      setModal("showNoVerificationAlert", true);
      e.target.value = "";
      return;
    }

    const isDuplicate = existingVerifications?.some(v => v.type === verif);
    if (isDuplicate) {
      setModal("showDuplicateModal", true);
      e.target.value = "";
      return;
    }

    const otherType = (Object.keys(uploadedMap) as VerificationType[]).find(
      key => key !== verif && (uploadedMap[key]?.length ?? 0) > 0,
    );
    if (otherType) {
      setModal("showVerifKindModal", true);
      e.target.value = "";
      return;
    }

    const existing = uploadedMap[verif] ?? [];
    if (existing.length + files.length > MAX_FILES) {
      setModal("showMaxImageModal", true);
      e.target.value = "";
      return;
    }

    const validFiles = files.filter(
      file =>
        ALLOWED_IMAGE_TYPES.includes(file.type) &&
        file.size / 1024 / 1024 <= MAX_IMAGE_SIZE_MB,
    );
    if (validFiles.length < files.length) {
      setModal("showErrorModal", true);
    }

    const previews = validFiles.map(file => URL.createObjectURL(file));

    setUploadedMap(prev => ({
      ...prev,
      [verif]: [...existing, ...validFiles],
    }));

    setPreviewMap(prev => ({
      ...prev,
      [verif]: [...(prev[verif] ?? []), ...previews],
    }));

    e.target.value = "";
  };

  const handleDelete = (type: VerificationType, index: number) => {
    const newFiles = uploadedMap[type]?.filter((_, i) => i !== index) ?? [];
    const newPreviews = previewMap[type]?.filter((_, i) => i !== index) ?? [];

    setUploadedMap(prev => ({ ...prev, [type]: newFiles }));
    setPreviewMap(prev => ({ ...prev, [type]: newPreviews }));

    if (newFiles.length === 0) {
      setVerif("");
    }
  };

  const handleVerifChange = (val: VerificationType) => {
    const current = (
      Object.entries(uploadedMap) as [VerificationType, File[]][]
    ).find(([, files]) => files.length > 0)?.[0];

    if (current && current !== val) {
      setModal("showVerifKindModal", true);
      return;
    }

    setVerif(val);
  };

  return {
    verif,
    setVerif,
    uploadedMap,
    previewMap,
    isAgree,
    setIsAgree,
    fileInputRef,
    handleFileChange,
    handleDelete,
    handleVerifChange,
    modals,
    closeModal: (name: keyof typeof modals) => setModal(name, false),
    openModal: (name: keyof typeof modals) => setModal(name, true),
  };
};

export default useVerificationUpload;
