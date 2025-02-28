"use client";
import React from "react";

interface SecondaryButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function SecondaryButton({
  text,
  onClick,
  disabled = false,
}: SecondaryButtonProps) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`text-black font-medium py-2 px-4 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {text}
    </button>
  );
}
