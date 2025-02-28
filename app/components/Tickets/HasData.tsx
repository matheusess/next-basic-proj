"use client";
import React from "react";
import { Ticket } from "@/app/interfaces/ticket";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

interface HasDataProps {
  tickets: Ticket[];
}

export default function HasData({ tickets }: HasDataProps) {
  const { user } = useAuth();
  const userId = user?.uid;
  const router = useRouter();

  const myTickets = tickets.filter((ticket) => ticket.createdBy === userId);
  const otherTickets = tickets.filter((ticket) => ticket.createdBy !== userId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div>
        <h2 className="text-lg font-bold mb-4 text-gray-800">Other Tickets</h2>
        {otherTickets.length === 0 ? (
          <p className="text-gray-500">No tickets from other users.</p>
        ) : (
          otherTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 p-4 mb-4 rounded cursor-pointer hover:bg-gray-100 transition"
              onClick={() => router.push(`/tickets/${ticket.id}`)}
            >
              <h3 className="text-md font-semibold">{ticket.title}</h3>
              <p className="text-sm text-gray-600">{ticket.description}</p>
            </div>
          ))
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4 text-gray-800">My Tickets</h2>
        {myTickets.length === 0 ? (
          <p className="text-gray-500">You have no tickets.</p>
        ) : (
          myTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 p-4 mb-4 rounded bg-gray-50 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => router.push(`/tickets/${ticket.id}`)}
            >
              <h3 className="text-md font-semibold">{ticket.title}</h3>
              <p className="text-sm text-gray-600">{ticket.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
