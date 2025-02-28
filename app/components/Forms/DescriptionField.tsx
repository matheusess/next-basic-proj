"use client";
import React from "react";

interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function DescriptionField({
  value,
  onChange,
  disabled = false,
}: DescriptionFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">
        Description
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter ticket description"
        rows={4}
        disabled={disabled}
        className={`w-full border border-gray-100 bg-gray-100 p-4 rounded-xl ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      ></textarea>
    </div>
  );
}
