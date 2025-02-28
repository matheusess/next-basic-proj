"use client";
import React from "react";
import Image from "next/image";

export default function NoData() {
  return (
    <div className="mt-24 flex flex-col items-center justify-center text-gray-500">
      <Image
        src="/no-data.png"
        alt="No Data"
        width={192}
        height={192}
        className="w-48 h-auto mb-6"
      />
      <p className="font-semibold">No tickets found.</p>
    </div>
  );
}
