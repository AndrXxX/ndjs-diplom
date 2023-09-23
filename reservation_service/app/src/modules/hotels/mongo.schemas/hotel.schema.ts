import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { iHotel } from "src/interfaces/hotel.interface";

export type HotelDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel implements iHotel {
  id: string;

  @Prop( { required: [true, 'Не указано название'] })
  title: string;

  @Prop( { required: false })
  description: string;

  @Prop( { required: [true, 'Не указана дата добавления'] })
  createdAt: Date;

  @Prop( { required: [true, 'Не указана дата обновления'] })
  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
