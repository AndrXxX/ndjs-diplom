import { IsArray, IsBoolean, IsDate, IsDefined, IsString } from "class-validator";

export class UpdateHotelRoomDto {
  @IsString()
  description: string;

  @IsArray()
  images: File[] | string[];

  @IsDefined() @IsDate()
  createdAt: Date;

  @IsDefined() @IsDate()
  updatedAt: Date;

  @IsDefined() @IsBoolean()
  isEnabled: boolean;
}
