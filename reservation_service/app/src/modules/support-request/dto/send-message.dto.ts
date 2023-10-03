import { IsDefined, IsString } from "class-validator";
import { ID } from "src/types/ID";
import { SendMessage } from "../interfaces/send-message.interface";

export class CreateSupportRequestDto implements SendMessage {
  @IsDefined() @IsString()
  text: string;

  author: ID;
  supportRequest: ID;
}
