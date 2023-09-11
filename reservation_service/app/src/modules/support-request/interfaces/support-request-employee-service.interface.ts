import { ID } from "src/types/ID";
import { Message } from "../mongo.schemas/message.schema";
import { MarkMessagesAsReadDto } from "./mark-messages-as-read-dto.interface";

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void>;
  getUnreadCount(supportRequest: ID): Promise<Message[]>;
  closeRequest(supportRequest: ID): Promise<void>;
}
