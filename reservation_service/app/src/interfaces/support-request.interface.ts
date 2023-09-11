import { ObjectId } from "mongoose";
import { iMessage } from "./message.interface";

export interface iSupportRequest {
  user: ObjectId;
  createdAt: Date;
  messages: iMessage[];
  isActive: boolean;
}
