import { IsDate, IsDefined, IsString } from "class-validator";
import { ID } from "src/types/ID";

export class CreateReservationDto {
  @IsDefined() @IsString()
  hotelRoom: ID;

  @IsDefined() @IsDate()
  startDate: Date;

  @IsDefined() @IsDate()
  endDate: Date;
}
