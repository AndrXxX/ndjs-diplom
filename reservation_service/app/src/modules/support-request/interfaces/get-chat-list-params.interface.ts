import { ID } from "src/types/ID";

export interface GetChatListParams {
  user: ID | null;
  isActive: boolean;
}
