"use client";
import React from "react";
import { formatDate } from "@/app/utils/format_date";
import { Comment } from "@/app/interfaces/comment"; // Certifique-se do caminho correto

interface TicketHistoryProps {
  comments: Comment[];
}

export default function TicketHistory({ comments }: TicketHistoryProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">History</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="mb-4 p-3 bg-white shadow rounded">
            <p className="text-gray-700">
              <strong>Comment:</strong> {comment.text}
            </p>
            <p className="text-xs text-gray-500">
              Created at: {formatDate(comment.createdAt)}
              {comment.updatedAt && (
                <> | Updated at: {formatDate(comment.updatedAt)}</>
              )}
            </p>
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
        ))
      )}
    </div>
  );
}
