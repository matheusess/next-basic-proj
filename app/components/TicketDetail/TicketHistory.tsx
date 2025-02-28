// app/components/TicketDetail/TicketHistory.tsx
"use client";
import React from "react";
import { Comment } from "@/app/interfaces/comment";
import TicketComment from "./TicketComment";

interface TicketHistoryProps {
  comments: Comment[];
  onAddComment?: (text: string, file: File | null) => Promise<void>;
}

export default function TicketHistory({
  comments,
  onAddComment,
}: TicketHistoryProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-2xl">
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <TicketComment key={comment.id} comment={comment} />
        ))
      )}

      {onAddComment && (
        <div className="mt-4 text-center text-sm text-gray-500">
          You can add a new comment.
        </div>
      )}
    </div>
  );
}
