import { Timestamp } from "firebase/firestore";

export interface Comment {
    id: string;
    text: string;
    createdAt: Timestamp;
    updatedAt: string | Timestamp;
    uploadedFile?: string;
}