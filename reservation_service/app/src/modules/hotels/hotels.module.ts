import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { FormatHotelRoomService } from "./format-hotel-room.service";
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
  providers: [HotelsService, HotelsRoomService, HotelsFormatter, FormatHotelRoomService],
  exports: [HotelsService, HotelsRoomService, HotelsFormatter, FormatHotelRoomService],
  controllers: [HotelsController],
})
export class HotelsModule {}
