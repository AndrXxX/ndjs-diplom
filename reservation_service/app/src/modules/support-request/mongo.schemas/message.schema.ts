import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { iMessage } from "src/interfaces/message.interface";
import { User } from "src/modules/users/mongo.schemas/user.schema";

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message implements iMessage {
  @Prop( { required: [true, 'Не указан автор'], ref: User })
  author: ObjectId;

  @Prop( { required: [true, 'Не указана дата отправки'] })
  sentAt: Date;

  @Prop( { required: [true, 'Не указан текст сообщения'] })
  text: string;

  @Prop( { required: false })
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
