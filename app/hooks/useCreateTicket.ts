"use client";
import { useState } from "react";
import { storage, db, auth } from "@/app/lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export function useCreateTicket() {
    const [loading, setLoading] = useState(false);

    const createTicket = async (
        title: string,
        description: string,
        file?: File | null
    ) => {
        setLoading(true);
        try {
            let fileUrl = null;
            const version = 1;
            if (file) {
                const user = auth.currentUser;
                if (!user) throw new Error("User not logged in");
                const fileRef = ref(
                    storage,
                    `tickets/${user.uid}/${Date.now()}_${file.name}`
                );
                await uploadBytes(fileRef, file);
                fileUrl = await getDownloadURL(fileRef);
            }


            const ticketData = {
                title,
                description,
                createdBy: auth.currentUser?.uid || "unknown",
                createdAt: serverTimestamp(),
                isActive: true,
                firstFile: fileUrl
                    ? {
                        url: fileUrl,
                        version,
                        updatedAt: serverTimestamp(),
                        updatedBy: auth.currentUser?.uid || "unknown",
                    }
                    : null,
            };

            await addDoc(collection(db, "tickets"), ticketData);
            toast.success("Ticket created successfully!");
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Error creating ticket. Please try again.");
            setLoading(false);
            throw error;
        }
    };

    return { createTicket, loading };
}