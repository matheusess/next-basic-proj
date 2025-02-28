// app/hooks/useAddComment.ts
"use client";
import { db, storage } from "@/app/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/app/hooks/useAuth";

export function useAddComment(ticketId: string) {
    const { user } = useAuth();

    const addComment = async (commentText: string, file: File | null) => {
        let fileUrl: string | null = null;

        if (file) {
            const storageRef = ref(storage, `tickets/${ticketId}/${file.name}`);
            await uploadBytes(storageRef, file);
            fileUrl = await getDownloadURL(storageRef);
        }

        const commentData = {
            text: commentText,
            createdAt: serverTimestamp(),
            uploadedFile: fileUrl,
            createdBy: user?.uid || "",
        };

        const commentsRef = collection(db, "tickets", ticketId, "comments");
        await addDoc(commentsRef, commentData);
    };

    return { addComment };
}