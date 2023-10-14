import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { iSupportRequest } from "src/interfaces/support-request.interface";
import { User } from "src/modules/users/mongo.schemas/user.schema";
import { ID } from "src/types/ID";
import { MessageDocument } from "./message.schema";

export type SupportRequestDocument = HydratedDocument<SupportRequest>;

@Schema()
export class SupportRequest implements iSupportRequest {
  id: ID;

  @Prop( { required: [true, 'Не указан пользователь'], ref: () => User, type: mongoose.Types.ObjectId })
  userId: ObjectId;

  @Prop( { required: [true, 'Не указана дата создания'] })
  createdAt: Date;

  @Prop( { required: false, default: [] })
  messages: MessageDocument[];

  @Prop( { required: false })
  isActive: boolean;
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);
