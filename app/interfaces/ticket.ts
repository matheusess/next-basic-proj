import { Timestamp } from "firebase/firestore";

export interface Ticket {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    createdAt: Timestamp;
    latestVersion: number;
    isActive: boolean;
    comments: Array<{
        version: number;
        fileUrl: string;
        comment: string;
        updatedBy: string;
        updatedAt: Timestamp;
    }>;
}