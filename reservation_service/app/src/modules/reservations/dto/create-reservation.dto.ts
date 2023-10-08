import { IsDateString, IsDefined, IsString } from "class-validator";
import { ID } from "src/types/ID";

export class CreateReservationDto {
  @IsDefined() @IsString()
  hotelRoom: ID;

  @IsDefined() @IsDateString()
  startDate: Date;

  @IsDefined() @IsDateString()
  endDate: Date;
}
