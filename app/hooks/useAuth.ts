"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/app/lib/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                const userDocRef = doc(db, "users", firebaseUser.uid);
                const docSnap = await getDoc(userDocRef);

                if (!docSnap.exists()) {
                    await setDoc(userDocRef, {
                        createdAt: new Date().toISOString(),
                        lastLogin: new Date().toISOString(),
                        email: firebaseUser.email,
                        name: firebaseUser.displayName,
                    });
                } else {
                    await setDoc(
                        userDocRef,
                        {
                            lastLogin: new Date().toISOString(),
                            email: firebaseUser.email,
                            name: firebaseUser.displayName,
                        },
                        { merge: true }
                    );
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
}