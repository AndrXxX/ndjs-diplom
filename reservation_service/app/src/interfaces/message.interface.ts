import { ObjectId } from "mongoose";

export interface iMessage {
  authorId: ObjectId;
  requestId: ObjectId;
  sentAt: Date;
  text: string;
  readAt: Date;
}
