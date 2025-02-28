"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";
import { Ticket } from "@/app/interfaces/ticket";
import TicketHistory from "@/app/components/TicketDetail/TicketHistory";
import TicketInfo from "@/app/components/TicketDetail/TicketInfo";
import AddCommentModal from "@/app/components/TicketDetail/AddCommentModal";
import { Comment } from "@/app/interfaces/comment";
import PrimaryButton from "@/app/components/Buttons/PrimaryButton";

export default function TicketDetailPage() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  useEffect(() => {
    if (!ticketId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const ticketRef = doc(db, "tickets", ticketId as string);
        const ticketSnap = await getDoc(ticketRef);
        if (!ticketSnap.exists()) {
          console.error("Ticket not found");
          return;
        }
        const ticketData = ticketSnap.data() as Ticket;

        const commentsRef = collection(
          db,
          "tickets",
          ticketId as string,
          "comments"
        );
        const q = query(commentsRef, orderBy("createdAt", "desc"));
        const commentsSnap = await getDocs(q);
        const commentsData = commentsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];

        setTicket(ticketData);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticketId]);

  const reloadComments = async () => {
    if (!ticketId) return;
    const commentsRef = collection(
      db,
      "tickets",
      ticketId as string,
      "comments"
    );
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    const commentsSnap = await getDocs(q);
    const commentsData = commentsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Comment[];
    setComments(commentsData);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-600 mt-16">
        Loading ticket details...
      </p>
    );
  }

  if (!ticket) {
    return <p className="text-center text-red-500">Ticket not found</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <Link
          href="/"
          className="flex items-center text-black hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="ml-2 font-semibold">Home</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <PrimaryButton
              text="+ Add new comment"
              onClick={() => setIsCommentModalOpen(true)}
            />
          </div>

          <TicketHistory comments={comments} />

          {isCommentModalOpen && (
            <AddCommentModal
              ticketId={ticketId as string}
              onClose={() => setIsCommentModalOpen(false)}
              onSuccess={() => {
                setIsCommentModalOpen(false);
                reloadComments();
              }}
            />
          )}
        </div>

        <div className="md:col-span-2">
          <TicketInfo ticket={ticket} />
        </div>
      </div>
    </div>
  );
}
