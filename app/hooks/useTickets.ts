"use client";
import { useEffect, useState, useCallback } from "react";
import { Ticket } from "@/app/interfaces/ticket";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";

export function useTickets() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar tickets no Firestore
    const fetchTickets = useCallback(async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "tickets"));
            const ticketsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Ticket[];
            setTickets(ticketsData);
        } catch (err) {
            setError("Error fetching tickets");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    return { tickets, loading, error, fetchTickets };
}