import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { FormatHotelService } from "./format-hotel.service";
import { HotelsRoomService } from "./hotels-room.service";
import { HotelsController } from "./hotels.controller";
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
  providers: [HotelsService, HotelsRoomService],
  exports: [HotelsService, HotelsRoomService, FormatHotelService],
  controllers: [HotelsController],
})
export class HotelsModule {}
