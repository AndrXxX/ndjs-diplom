import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { iSupportRequest } from "src/interfaces/support-request.interface";
import { User } from "src/modules/users/mongo.schemas/user.schema";
import { ID } from "src/types/ID";
import { Message } from "./message.schema";

export type SupportRequestDocument = HydratedDocument<SupportRequest>;

@Schema()
export class SupportRequest implements iSupportRequest {
  id: ID;

  @Prop( { required: [true, 'Не указан пользователь'], type: mongoose.Types.ObjectId })
  userId: ObjectId;

  user: User | null;

  @Prop( { required: [true, 'Не указана дата создания'] })
  createdAt: Date;

  messages: Message[] = [];

  @Prop( { required: false })
  isActive: boolean;
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);
SupportRequestSchema.virtual("user", {
  ref: () => User,
  localField: "userId",
  foreignField: "_id",
  justOne: true
});
SupportRequestSchema.virtual("messages", {
  ref: () => Message,
  localField: "_id",
  foreignField: "requestId",
  justOne: false
});
