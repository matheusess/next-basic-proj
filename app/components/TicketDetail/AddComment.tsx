"use client";
import React, { useState } from "react";

interface AddCommentFormProps {
  onAddComment: (text: string, file: File | null) => Promise<void>;
}

export default function AddCommentForm({ onAddComment }: AddCommentFormProps) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text && !file) return;

    setLoading(true);
    try {
      await onAddComment(text, file);
      // Limpa os campos após adicionar
      setText("");
      setFile(null);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Enter your comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Comment"}
      </button>
    </form>
  );
}
