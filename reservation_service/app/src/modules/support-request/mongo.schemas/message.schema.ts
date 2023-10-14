import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { iMessage } from "src/interfaces/message.interface";
import { User } from "src/modules/users/mongo.schemas/user.schema";
import { ID } from "src/types/ID";
import { SupportRequest } from "./support-request.schema";

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message implements iMessage {
  id: ID;

  @Prop( { required: [true, 'Не указан автор'], type: mongoose.Types.ObjectId })
  authorId: ObjectId;

  author: User | null;

  @Prop( { required: [true, 'Не указан запрос'], type: mongoose.Types.ObjectId })
  requestId: ObjectId;

  request: SupportRequest | null;

  @Prop( { required: [true, 'Не указана дата отправки'] })
  sentAt: Date;

  @Prop( { required: [true, 'Не указан текст сообщения'] })
  text: string;

  @Prop( { required: false })
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.virtual("author", {
  ref: () => User,
  localField: "authorId",
  foreignField: "_id",
  justOne: true
});
MessageSchema.virtual("request", {
  ref: () => SupportRequest,
  localField: "requestId",
  foreignField: "_id",
  justOne: true
});
