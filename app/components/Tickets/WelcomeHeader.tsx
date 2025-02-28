"use client";
import React from "react";
import { WelcomeHeaderProps } from "@/app/interfaces/welcome_header_props";

export default function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  return (
    <div className="mt-2 mb-10">
      <h2 className="text-xl text-gray-700">
        <span className="font-light">Welcome, </span>
        <span className="font-bold">{userName}!</span>
        <span className="font-light"> 👋</span>
      </h2>
    </div>
  );
}
