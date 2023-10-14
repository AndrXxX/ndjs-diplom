import { ObjectId } from "mongoose";

export interface iMessage {
  authorId: ObjectId;
  sentAt: Date;
  text: string;
  readAt: Date;
}
