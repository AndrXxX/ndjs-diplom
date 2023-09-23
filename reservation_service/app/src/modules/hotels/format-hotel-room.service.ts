import { Injectable } from "@nestjs/common";
import { FormatHotelService } from "./format-hotel.service";
import { HotelRoom } from "./mongo.schemas/hotel-room.schema";

@Injectable()
export class FormatHotelRoomService {

    constructor(
      private formatHotelService: FormatHotelService,
    ) {}

    public async format(room: HotelRoom) {
        const { id, description, images } = room;
        return { id, description, images, hotel: this.formatHotelService.format(room.hotel as any) } //TODO
    }
}
