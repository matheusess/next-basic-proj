import { Timestamp } from "firebase/firestore";

export interface Ticket {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    createdAt: Timestamp;
    latestVersion: number;
    isActive: boolean;
    firstFile?: {
        url: string;
        version: number;
        updatedAt: Timestamp;
        updatedBy: string;
    };
    comments: Array<{
        uploadedFile: boolean;
        version: number;
        fileUrl: string;
        comment: string;
        updatedBy: string;
        updatedAt: Timestamp;
    }>;
}