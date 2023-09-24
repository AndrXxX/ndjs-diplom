import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { iHotelRoom } from "src/interfaces/hotel-room.interface";
import { Hotel } from "./hotel.schema";

export type HotelRoomDocument = HydratedDocument<HotelRoom>;

@Schema()
export class HotelRoom implements iHotelRoom {
  id: string;

  @Prop( { required: [true, 'Не указан отель'], ref: () => Hotel, type: Hotel })
  hotel: ObjectId;

  @Prop( { required: false })
  description: string;

  @Prop( { required: false, default: [] })
  images: string[];

  @Prop( { required: [true, 'Не указана дата добавления'] })
  createdAt: Date;

  @Prop( { required: [true, 'Не указана дата обновления'] })
  updatedAt: Date;

  @Prop( { required: true, default: true })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
