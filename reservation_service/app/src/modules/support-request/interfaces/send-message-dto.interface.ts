import { ID } from "src/types/ID";

export interface SendMessageDto {
  author: ID;
  supportRequest: ID;
  text: string;
}
