// app/components/ProtectedContainer.tsx
"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebaseConfig";

const Navbar = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/tickets">
            <span className="cursor-pointer hover:underline">Tickets</span>
          </Link>
          <Link href="/profile">
            <span className="cursor-pointer hover:underline">Perfil</span>
          </Link>
        </div>
        <button
          onClick={handleSignOut}
          className="cursor-pointer hover:underline"
        >
          Sair
        </button>
      </div>
    </nav>
  );
};

interface ProtectedContainerProps {
  children: React.ReactNode;
}

export default function ProtectedContainer({
  children,
}: ProtectedContainerProps) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">{children}</div>
    </div>
  );
}
