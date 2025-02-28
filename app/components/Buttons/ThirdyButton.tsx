"use client";
import React from "react";

interface ThirdyButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function ThirdyButton({
  text,
  onClick,
  type = "button",
  disabled = false,
}: ThirdyButtonProps) {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      type={type}
      disabled={disabled}
      className={`bg-[var(--color-custom-green-500)] text-white font-medium py-2 px-6 rounded-full transition ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-[var(--color-custom-green-400)]"
      }`}
    >
      {text}
    </button>
  );
}
