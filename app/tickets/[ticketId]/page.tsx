"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";
import { Ticket } from "@/app/interfaces/ticket";
import TicketHistory from "@/app/components/TicketDetail/TicketHistory";
import TicketInfo from "@/app/components/TicketDetail/TicketInfo";

export default function TicketDetailPage() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticketId) return;

    const fetchTicket = async () => {
      setLoading(true);
      try {
        const ticketRef = doc(db, "tickets", ticketId as string);
        const ticketSnap = await getDoc(ticketRef);
        if (!ticketSnap.exists()) {
          console.error("Ticket not found");
          return;
        }

        const ticketData = ticketSnap.data() as Ticket;
        ticketData.comments = ticketData.comments || [];

        setTicket(ticketData);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (loading) {
    return (
      <p className="text-center text-gray-600">Loading ticket details...</p>
    );
  }

  if (!ticket) {
    return <p className="text-center text-red-500">Ticket not found</p>;
  }

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Coluna esquerda: Histórico */}
      <div className="md:col-span-1">
        <TicketHistory comments={ticket.comments} />
      </div>

      {/* Coluna direita: Informações do Ticket */}
      <div className="md:col-span-2">
        <TicketInfo ticket={ticket} />
      </div>
    </div>
  );
}
