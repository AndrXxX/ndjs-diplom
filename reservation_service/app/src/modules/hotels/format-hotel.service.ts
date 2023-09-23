import { Injectable } from "@nestjs/common";
import { Hotel } from "./mongo.schemas/hotel.schema";

@Injectable()
export class FormatHotelService {

    public async format(hotel: Hotel) {
        const { id, title, description } = hotel;
        return { id, title, description }
    }
}
