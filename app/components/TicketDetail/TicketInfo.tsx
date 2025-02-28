// app/components/TicketInfo.tsx
"use client";
import React from "react";
import Image from "next/image";
import { formatDate } from "@/app/utils/format_date";
import { Ticket } from "@/app/interfaces/ticket";

interface TicketInfoProps {
  ticket: Ticket;
}

export default function TicketInfo({ ticket }: TicketInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold">{ticket.title}</h1>
      <p className="text-gray-600 mb-4">{ticket.description}</p>

      <div className="mt-4 text-sm text-gray-500">
        <p className="my-2">
          <strong>Created by:</strong> {ticket.createdBy}
        </p>
        <p className="my-2">
          <strong>Created at:</strong> {formatDate(ticket.createdAt)}
        </p>
        <p className="my-2">
          <strong>Status:</strong>{" "}
          {ticket.isActive ? (
            <span className="text-green-600 font-bold">Active</span>
          ) : (
            <span className="text-red-600 font-bold">Inactive</span>
          )}
        </p>
      </div>

      {ticket.comments.length > 0 &&
        ticket.comments[ticket.comments.length - 1].fileUrl && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Latest Attachment</h2>
            <Image
              src={ticket.comments[ticket.comments.length - 1].fileUrl}
              alt="Last uploaded file"
              width={400}
              height={250}
              className="mt-2 rounded"
            />
          </div>
        )}
    </div>
  );
}
