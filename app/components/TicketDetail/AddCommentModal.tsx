// app/components/Comments/AddCommentModal.tsx
"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import SecondaryButton from "@/app/components/Buttons/SecondaryButton";
import PrimaryButton from "@/app/components/Buttons/PrimaryButton";
import DescriptionField from "@/app/components/Forms/DescriptionField";
import FileAttachmentField from "@/app/components/Forms/FieldAttachmentField";
import { useAddComment } from "@/app/hooks/useAddComment";

interface AddCommentModalProps {
  ticketId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCommentModal({
  ticketId,
  onClose,
  onSuccess,
}: AddCommentModalProps) {
  const [comment, setComment] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { addComment } = useAddComment(ticketId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment && !attachment) return;
    setLoading(true);
    try {
      await addComment(comment, attachment);

      toast.dismiss();
      toast.success("Comment added successfully!");

      onClose();
      onSuccess(); // Ex: recarregar a lista de comentários
    } catch (error) {
      toast.dismiss();
      toast.error("Error adding comment. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-4xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Version</h2>
        <form onSubmit={handleSubmit}>
          <DescriptionField
            value={comment}
            onChange={setComment}
            disabled={loading}
          />

          <FileAttachmentField
            onFileChange={setAttachment}
            disabled={loading}
          />

          <div className="flex justify-between space-x-2 mt-4">
            <SecondaryButton
              text="Cancel"
              onClick={onClose}
              disabled={loading}
            />
            <PrimaryButton
              text={loading ? "Submitting..." : "Add Comment"}
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
