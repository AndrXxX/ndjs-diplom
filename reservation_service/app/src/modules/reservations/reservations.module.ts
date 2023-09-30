import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { HotelsModule } from "src/modules/hotels/hotels.module";
import { ReservationsFormatter } from "src/modules/reservations/reservations.formatter";
import { Reservation, ReservationSchema } from "./mongo.schemas/reservation.schema";
import { ReservationsClientController } from "./reservations-client.controller";
import { ReservationsService } from "./reservations.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    HotelsModule,
  ],
  providers: [ReservationsService, ReservationsFormatter],
  exports: [ReservationsService, ReservationsFormatter],
  controllers: [ReservationsClientController],
})
export class ReservationsModule {}
