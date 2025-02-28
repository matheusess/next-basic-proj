"use client";
import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

interface DragAndDropFieldProps {
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}

export default function DragAndDropField({
  onFileChange,
  disabled = false,
}: DragAndDropFieldProps) {
  const maxSize = 25 * 1024 * 1024; // 25MB
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/vnd.adobe.photoshop",
    "application/postscript",
  ];

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (disabled) return;
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.size > maxSize) {
          toast.error("File is too large. Max size is 25MB.");
          onFileChange(null);
          setPreviewUrl(null);
          return;
        }
        if (!allowedTypes.includes(file.type)) {
          toast.error(
            "Invalid file type. Only PDF, JPEG, PNG, SVG, PSD, AI and EPS files are allowed."
          );
          onFileChange(null);
          setPreviewUrl(null);
          return;
        }
        onFileChange(file);
        if (file.type.startsWith("image/")) {
          const preview = URL.createObjectURL(file);
          setPreviewUrl(preview);
        } else {
          setPreviewUrl(null);
        }
      }
    },
    [onFileChange, disabled]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize,
    disabled,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/svg+xml": [".svg"],
      "image/vnd.adobe.photoshop": [".psd"],
      "application/postscript": [".ai", ".eps"],
    },
  });

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">Attachment</label>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 cursor-pointer transition ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : isDragActive
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="File Preview"
            width={48}
            height={48}
            unoptimized
            className="mb-2 opacity-70"
          />
        ) : (
          <Image
            src="/file-upload.png"
            alt="Upload Icon"
            width={48}
            height={48}
            className="mb-2 opacity-70"
            priority
          />
        )}
        {isDragActive && !disabled ? (
          <p className="text-blue-600 font-medium">Drop the file here...</p>
        ) : (
          <>
            <p
              className={`text-gray-600 font-medium ${
                disabled ? "opacity-50" : ""
              }`}
            >
              Drag and Drop file here or{" "}
              <span
                className={`text-blue-600 underline ${
                  disabled ? "opacity-50" : ""
                }`}
              >
                Choose file
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supported formats: PDF, JPEG, PNG, SVG, PSD, AI, EPS &nbsp;|&nbsp;
              Max size: 25MB
            </p>
          </>
        )}
      </div>
    </div>
  );
}
