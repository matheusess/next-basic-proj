"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import SecondaryButton from "@/app/components/Buttons/SecondaryButton";
import PrimaryButton from "@/app/components/Buttons/PrimaryButton";
import TitleField from "@/app/components/Forms/TitleField";
import DescriptionField from "@/app/components/Forms/DescriptionField";
import FileAttachmentField from "@/app/components/Forms/FieldAttachmentField";
import { useCreateTicket } from "@/app/hooks/useCreateTicket";

interface CreateTicketModalProps {
  onClose: () => void;
  onSuccess: () => void; // Nova função para atualizar os tickets
}

export default function CreateTicketModal({
  onClose,
  onSuccess,
}: CreateTicketModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const { createTicket, loading } = useCreateTicket();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTicket(title, description, attachment);

      toast.dismiss(); // Remove qualquer toast anterior
      toast.success("Ticket created successfully!");

      onClose(); // Fecha o modal primeiro
      onSuccess(); // Atualiza a lista de tickets
    } catch (error) {
      toast.dismiss();
      toast.error("Error creating ticket. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-4xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Ticket</h2>
        <form onSubmit={handleSubmit}>
          <TitleField value={title} onChange={setTitle} disabled={loading} />
          <DescriptionField
            value={description}
            onChange={setDescription}
            disabled={loading}
          />
          <FileAttachmentField
            onFileChange={setAttachment}
            disabled={loading}
          />
          <div className="flex justify-between space-x-2">
            <SecondaryButton
              text="Cancel"
              onClick={onClose}
              disabled={loading}
            />
            <PrimaryButton
              text={loading ? "Submitting..." : "Submit Ticket"}
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
