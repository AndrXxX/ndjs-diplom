import { Injectable } from "@nestjs/common";
import { HotelsRoomFormatter } from "src/modules/hotels/hotels-room.formatter";
import { HotelsFormatter } from "src/modules/hotels/hotels.formatter";
import { Reservation } from "src/modules/reservations/mongo.schemas/reservation.schema";

@Injectable()
export class ReservationsFormatter {

    constructor(
      private hotelsFormatter: HotelsFormatter,
      private hotelsRoomFormatter: HotelsRoomFormatter,
    ) {}

    public format(reservation: Reservation) {
        const { dateStart, dateEnd } = reservation;
        return {
            startDate: dateStart,
            endDate: dateEnd,
            hotelRoom: this.hotelsRoomFormatter.formatForClient(reservation.roomId as any), // TODO
            hotel: this.hotelsFormatter.formatForClient(reservation.hotelId as any), // TODO
        };
    }
}
