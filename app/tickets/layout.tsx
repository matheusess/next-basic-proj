// app/tickets/layout.tsx
"use client";
import React from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Navbar from "@/app/components/Navbar";

export default function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        {children}
      </div>
    </ProtectedRoute>
  );
}
