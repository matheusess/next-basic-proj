"use client";
import React from "react";
import { Comment } from "@/app/interfaces/comment";
import { formatDate } from "@/app/utils/format_date";
import { useUser } from "@/app/hooks/useUser";

interface TicketCommentProps {
  comment: Comment;
}

export default function TicketComment({ comment }: TicketCommentProps) {
  const { user, loading } = useUser(String(comment.createdBy));

  return (
    <div className="mb-4 p-3 bg-white shadow rounded-xl">
      <p className="text-gray-700 font-medium text-lg">{comment.text}</p>

      <div className="my-2">
        <p className="text-xs font-semibold text-gray-600">
          {loading
            ? "Loading user..."
            : `${user ? user.name : comment.createdBy}`}
        </p>
        <p className="text-xs text-gray-600">
          Created at: <strong>{formatDate(comment.createdAt)}</strong>
          {comment.updatedAt && (
            <>
              {" "}
              | Updated at: <strong>{formatDate(comment.updatedAt)}</strong>
            </>
          )}
        </p>
      </div>

      {comment.uploadedFile && (
        <a
          href={comment.uploadedFile}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          View File
        </a>
      )}
    </div>
  );
}
