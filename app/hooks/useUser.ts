// app/hooks/useUser.ts
"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";

export interface UserProfile {
    name: string;
    email?: string;
}

export function useUser(userId: string) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setUser(null);
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            setLoading(true);
            try {
                const userRef = doc(db, "users", userId);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setUser(userSnap.data() as UserProfile);
                } else {
                    setError("User not found");
                }
            } catch (_err) { // eslint-disable-line @typescript-eslint/no-unused-vars
                setError("Error fetching user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    return { user, loading, error };
}