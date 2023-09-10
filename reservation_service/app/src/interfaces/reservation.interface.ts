import { ObjectId } from "mongoose";

export interface iReservation {
  userId: ObjectId;
  hotelId: ObjectId;
  roomId: ObjectId;
  dateStart: Date;
  dateEnd: Date;
}
