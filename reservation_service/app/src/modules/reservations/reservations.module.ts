import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { Reservation, ReservationSchema } from "./mongo.schemas/reservation.schema";
import { ReservationsService } from "./reservations.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}