import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { HotelsRoomFormatter } from "./hotels-room.formatter";
import { HotelsRoomService } from "./hotels-room.service";
import { HotelsController } from "./hotels.controller";
import { HotelsFormatter } from "./hotels.formatter";
import { HotelsService } from "./hotels.service";
import { HotelRoom, HotelRoomSchema } from "./mongo.schemas/hotel-room.schema";
import { Hotel, HotelSchema } from "./mongo.schemas/hotel.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  providers: [HotelsService, HotelsRoomService, HotelsFormatter, HotelsRoomFormatter],
  exports: [HotelsService, HotelsRoomService, HotelsFormatter, HotelsRoomFormatter],
  controllers: [HotelsController],
})
export class HotelsModule {}
