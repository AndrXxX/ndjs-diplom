import { ID } from "src/types/ID";

export interface iMessage {
  authorId: ID;
  requestId: ID;
  sentAt: Date;
  text: string;
  readAt: Date;
}
