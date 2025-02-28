"use client";
import React from "react";

interface TitleFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function TitleField({
  value,
  onChange,
  disabled = false,
}: TitleFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">Title</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter ticket title"
        disabled={disabled}
        className={`w-full border border-gray-100 bg-gray-100 p-4 rounded-xl ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
