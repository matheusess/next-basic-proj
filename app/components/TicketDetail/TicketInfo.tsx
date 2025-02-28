"use client";
import React from "react";
import Image from "next/image";
import { formatDate } from "@/app/utils/format_date";
import { Ticket } from "@/app/interfaces/ticket";
import { useUser } from "@/app/hooks/useUser";
import ThirdyButton from "../Buttons/ThirdyButton";

interface TicketInfoProps {
  ticket: Ticket;
}

export default function TicketInfo({ ticket }: TicketInfoProps) {
  const { user: creator, loading: creatorLoading } = useUser(ticket.createdBy);

  // Função para verificar se a URL é de uma imagem (inclui svg)
  const isImageFile = (url: string): boolean => {
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
  };

  // Obter a URL do primeiro arquivo salvo
  const firstFileUrl = ticket.firstFile?.url;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl">
      <h1 className="text-xl font-bold">{ticket.title}</h1>
      <p className="text-gray-600 mb-4">{ticket.description}</p>

      {firstFileUrl && (
        <div className="mb-4 mt-8">
          <h2 className="text-sm font-bold">Original File</h2>
          {isImageFile(firstFileUrl) ? (
            <div className="flex flex-col items-start">
              <Image
                src={firstFileUrl}
                alt="Original uploaded file"
                width={400}
                height={250}
                className="mt-2 rounded"
              />
              <a
                href={firstFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
              >
                <ThirdyButton
                  text="Click to download Image"
                  onClick={() => {}}
                />
              </a>
            </div>
          ) : (
            <a
              href={firstFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block"
            >
              <ThirdyButton text="Download File" onClick={() => {}} />
            </a>
          )}
        </div>
      )}

      <div className="mt-8 text-sm text-gray-500">
        <p className="my-2">
          <strong>Created by:</strong>{" "}
          {creatorLoading
            ? "Loading..."
            : creator
            ? creator.name
            : ticket.createdBy}
        </p>
        <p className="my-2">
          <strong>Created at:</strong>{" "}
          <strong>{formatDate(ticket.createdAt)}</strong>
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

      {ticket.comments?.length &&
        ticket.comments[ticket.comments.length - 1]?.fileUrl && (
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
