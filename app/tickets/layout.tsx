"use client";
import React from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Navbar from "@/app/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </div>
    </ProtectedRoute>
  );
}
