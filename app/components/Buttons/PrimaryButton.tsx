"use client";
import React from "react";

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function PrimaryButton({
  text,
  onClick,
  type = "button",
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      type={type}
      disabled={disabled}
      className={`bg-black border text-white font-medium py-3 px-5 rounded-full transition ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-[var(--color-custom-green-400)] hover:text-white"
      }`}
    >
      {text}
    </button>
  );
}
