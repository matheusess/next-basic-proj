"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "@/app/hooks/useAuth";
import { auth } from "@/app/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/tickets");
    }
  }, [user, loading, router]);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-lg">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo_dd_green.svg"
            alt="DeerDesigner"
            width={88}
            height={40}
            priority
          />
        </div>
        <h1 className="text-2xl text-gray-500 font-semibold">Welcome to</h1>
        <h2 className="text-3xl text-gray-900 font-semibold mb-5">
          Matheus&apos;s Test [2]
        </h2>
        <p className="text-gray-500 text-lg font-normal mb-4">
          To get started, please log in
        </p>
        <button
          onClick={handleGoogleLogin}
          className="inline-flex w-full items-center justify-center px-5 py-2 bg-white border border-black text-black font-medium rounded-lg transition hover:bg-black hover:text-white"
        >
          <Image
            src="/logo_google.svg"
            alt="Google Logo"
            width={20}
            height={20}
            className="mr-2"
          />
          Google
        </button>
      </div>
    </div>
  );
}
