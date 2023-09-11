import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { iMessage } from "src/interfaces/message.interface";
import { iSupportRequest } from "src/interfaces/support-request.interface";
import { User } from "src/modules/users/mongo.schemas/user.schema";

export type SupportRequestDocument = HydratedDocument<SupportRequest>;

@Schema()
export class SupportRequest implements iSupportRequest {
  @Prop( { required: [true, 'Не указан пользователь'], ref: User })
  user: ObjectId;

  @Prop( { required: [true, 'Не указана дата создания'] })
  createdAt: Date;

  @Prop( { required: false, default: [] })
  messages: iMessage[];

  @Prop( { required: false })
  isActive: boolean;
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);
