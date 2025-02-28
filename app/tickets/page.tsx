"use client";
import React, { useState } from "react";
import NoData from "@/app/components/Tickets/NoData";
import HasData from "@/app/components/Tickets/HasData";
import WelcomeHeader from "@/app/components/Tickets/WelcomeHeader";
import TicketListHeader from "@/app/components/Tickets/TicketListHeader";
import { useAuth } from "@/app/hooks/useAuth";
import CreateTicketModal from "@/app/components/Tickets/CreateTicketModal";
import { useTickets } from "@/app/hooks/useTickets";

export default function TicketsPage() {
  const { user } = useAuth();
  const { tickets, loading, error, fetchTickets } = useTickets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTicket = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      {user && (
        <WelcomeHeader userName={user.displayName || user.email || "User"} />
      )}
      <TicketListHeader onCreate={handleCreateTicket} />

      {loading && (
        <p className="text-center text-gray-600">Loading tickets...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {tickets.length === 0 && !loading ? (
        <NoData />
      ) : (
        <HasData tickets={tickets} />
      )}

      {isModalOpen && (
        <CreateTicketModal onClose={closeModal} onSuccess={fetchTickets} />
      )}
    </div>
  );
}
