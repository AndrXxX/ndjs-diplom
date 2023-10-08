import { Injectable } from "@nestjs/common";
import { isObject } from "@nestjs/common/utils/shared.utils";
import { HotelsRoomFormatter } from "src/modules/hotels/hotels-room.formatter";
import { HotelsFormatter } from "src/modules/hotels/hotels.formatter";
import { HotelRoom } from "src/modules/hotels/mongo.schemas/hotel-room.schema";
import { Hotel } from "src/modules/hotels/mongo.schemas/hotel.schema";
import { Reservation } from "src/modules/reservations/mongo.schemas/reservation.schema";

@Injectable()
export class ReservationsFormatter {

    constructor(
      private hotelsFormatter: HotelsFormatter,
      private hotelsRoomFormatter: HotelsRoomFormatter,
    ) {}

    public format(reservation: Reservation) {
        const { dateStart, dateEnd } = reservation;
        const room: any | HotelRoom = isObject(reservation.roomId) ? reservation.roomId : {};
        const hotel: any | Hotel = isObject(room?.hotel) ? room.hotel : {};
        return {
            startDate: dateStart,
            endDate: dateEnd,
            hotelRoom: this.hotelsRoomFormatter.formatForClient(room),
            hotel: this.hotelsFormatter.formatForClient(hotel),
        };
    }
}
