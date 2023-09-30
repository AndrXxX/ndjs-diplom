import { Injectable } from "@nestjs/common";
import { HotelsFormatter } from "./hotels.formatter";
import { HotelRoom } from "./mongo.schemas/hotel-room.schema";

@Injectable()
export class HotelsRoomFormatter {

    constructor(
      private hotelsFormatter: HotelsFormatter,
    ) {}

    public format(room: HotelRoom) {
        const { id, description, images } = room;
        return { id, description, images, hotel: this.hotelsFormatter.format(room.hotel as any) } //TODO
    }

    public formatForClient(room: HotelRoom) {
        const { description, images } = room;
        return { description, images}
    }
}
