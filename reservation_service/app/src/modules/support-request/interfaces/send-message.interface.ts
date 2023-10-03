import { ID } from "src/types/ID";

export interface SendMessage {
  author: ID;
  supportRequest: ID;
  text: string;
}
