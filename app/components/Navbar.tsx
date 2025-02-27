"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebaseConfig";
import { toast } from "react-toastify";

export default function Navbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error signing out. Please try again.");
    }
  };

  return (
    <nav className="bg-white shadow py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <Image
            src="/logo_dd_green.svg"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-xl font-semibold text-gray-800">
            Ticketing System
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-[var(--color-custom-green-400)] text-white border border-customGreen-500 font-semibold py-3 px-8 rounded-full transition hover:bg-[var(--color-custom-green-500)]"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
