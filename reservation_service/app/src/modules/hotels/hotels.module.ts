import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
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
  providers: [HotelsService],
  exports: [HotelsService],
})
export class UsersModule {}
