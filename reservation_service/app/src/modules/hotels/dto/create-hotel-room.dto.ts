import { IsArray, IsBoolean, IsDate, IsDefined, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { HotelRoom } from "src/modules/hotels/mongo.schemas/hotel-room.schema";

export class CreateHotelRoomDto extends HotelRoom {
  @IsDefined()
  hotel: ObjectId;

  @IsString()
  description: string;

  @IsArray()
  images: string[];

  @IsDefined() @IsDate()
  createdAt: Date;

  @IsDefined() @IsDate()
  updatedAt: Date;

  @IsDefined() @IsBoolean()
  isEnabled: boolean;
}
