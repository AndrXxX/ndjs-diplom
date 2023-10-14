import { ObjectId } from "mongoose";
import { iMessage } from "./message.interface";

export interface iSupportRequest {
  userId: ObjectId;
  createdAt: Date;
  messages: iMessage[];
  isActive: boolean;
}
