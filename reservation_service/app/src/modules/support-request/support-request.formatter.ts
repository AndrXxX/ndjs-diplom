import { Injectable } from "@nestjs/common";
import { SupportRequest } from "./mongo.schemas/support-request.schema";

@Injectable()
export class SupportRequestFormatter {

    public formatForClient(item: SupportRequest, unreadCount: number) {
        const { id, createdAt, isActive } = item;
        return { id, createdAt, isActive, hasNewMessages: unreadCount > 0 };
    }
}
