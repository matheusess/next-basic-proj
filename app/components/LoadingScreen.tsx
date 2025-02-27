"use client";
import React from "react";
import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Image
        src="/logo_dd_green.svg"
        alt="DeerDesigner Logo"
        width={120}
        height={40}
        priority
      />
      <div className="flex mt-12">
        <span
          style={{ animationDelay: "0s" }}
          className="bg-gray-800 w-2 h-2 rounded-full mx-1 animate-bounce"
        />
        <span
          style={{ animationDelay: "0.2s" }}
          className="bg-gray-800 w-3 h-3 rounded-full mx-1 animate-bounce"
        />
        <span
          style={{ animationDelay: "0.4s" }}
          className="bg-gray-800 w-4 h-4 rounded-full mx-1 animate-bounce"
        />
      </div>
    </div>
  );
}
