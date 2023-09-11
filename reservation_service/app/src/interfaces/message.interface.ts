import { ObjectId } from "mongoose";

export interface iMessage {
  author: ObjectId;
  sentAt: Date;
  text: string;
  readAt: Date;
}
