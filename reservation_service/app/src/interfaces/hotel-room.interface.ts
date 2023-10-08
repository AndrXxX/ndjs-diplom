import { ID } from "src/types/ID";

export interface iHotelRoom {
  hotel: ID;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  isEnabled: boolean;
}
