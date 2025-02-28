import { Timestamp } from "firebase/firestore";

export function formatDate(createdAt: string | Timestamp): string {
    if (!createdAt) return "N/A";

    if (createdAt instanceof Timestamp) {
        return createdAt.toDate().toLocaleString();
    }

    if (typeof createdAt === "string") {
        return new Date(createdAt).toLocaleString();
    }

    return "Invalid Date";
}