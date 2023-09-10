import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { iReservation } from "src/interfaces/reservation.interface";
import { HotelRoom } from "src/modules/hotels/mongo.schemas/hotel-room.schema";
import { Hotel } from "src/modules/hotels/mongo.schemas/hotel.schema";
import { User } from "src/modules/users/mongo.schemas/user.schema";

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation implements iReservation {
  @Prop( { required: [true, 'Не указан пользователь'], ref: User })
  userId: ObjectId;

  @Prop( { required: [true, 'Не указан отель'], ref: Hotel })
  hotelId: ObjectId;

  @Prop( { required: [true, 'Не указана комната'], ref: HotelRoom })
  roomId: ObjectId;

  @Prop( { required: [true, 'Не указана дата начала'] })
  dateStart: Date;

  @Prop( { required: [true, 'Не указана дата окончания'] })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
