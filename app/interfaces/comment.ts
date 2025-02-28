import { Timestamp } from "firebase/firestore";

export interface Comment {
    id: string;
    text: string;
    createdAt: Timestamp;
    createdBy: string;
    updatedAt: string | Timestamp;
    uploadedFile?: string;
}