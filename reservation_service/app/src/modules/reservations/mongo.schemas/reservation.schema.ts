import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { iReservation } from "src/interfaces/reservation.interface";
import { HotelRoom } from "src/modules/hotels/mongo.schemas/hotel-room.schema";
import { User } from "src/modules/users/mongo.schemas/user.schema";
import { ID } from "src/types/ID";

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation implements iReservation {
  id: ID;

  @Prop( { required: [true, 'Не указан пользователь'], ref: () => User, type: mongoose.Types.ObjectId })
  userId: ObjectId;

  @Prop( { required: [true, 'Не указана комната'], ref: () => HotelRoom, type: mongoose.Types.ObjectId })
  roomId: ObjectId;

  @Prop( { required: [true, 'Не указана дата начала'] })
  dateStart: Date;

  @Prop( { required: [true, 'Не указана дата окончания'] })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
