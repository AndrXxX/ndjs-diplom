import { IsArray, IsDefined, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateHotelRoomDto {
  @IsDefined()
  hotelId: ObjectId;

  @IsString()
  description: string;

  @IsArray()
  images: File[];
}
