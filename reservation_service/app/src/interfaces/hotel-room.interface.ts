import { ObjectId } from "mongoose";

export interface iHotelRoom {
  hotel: ObjectId;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  isEnabled: boolean;
}
