import { IsDate, IsDefined, IsString } from "class-validator";
import { Hotel } from "src/modules/hotels/mongo.schemas/hotel.schema";

export class CreateHotelDto extends Hotel {
  @IsDefined() @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
