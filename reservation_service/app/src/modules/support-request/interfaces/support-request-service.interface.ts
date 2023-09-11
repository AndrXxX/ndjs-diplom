import { ID } from "src/types/ID";
import { Message } from "../mongo.schemas/message.schema";
import { SupportRequest } from "../mongo.schemas/support-request.schema";
import { GetChatListParams } from "./get-chat-list-params.interface";
import { SendMessageDto } from "./send-message-dto.interface";

export interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: ID): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void
  ): () => void;
}
