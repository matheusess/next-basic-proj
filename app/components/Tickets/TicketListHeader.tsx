"use client";
import React from "react";
import PrimaryButton from "@/app/components/Buttons/PrimaryButton";

interface TicketListHeaderProps {
  onCreate: () => void;
}

export default function TicketListHeader({ onCreate }: TicketListHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-bold text-gray-800">All ticket list</h1>
      <PrimaryButton text="Create new Ticket" onClick={onCreate} />
    </div>
  );
}
