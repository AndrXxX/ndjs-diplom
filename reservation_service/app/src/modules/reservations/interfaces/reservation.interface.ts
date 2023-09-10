import { ID } from "src/types/ID";
import { Reservation } from "../mongo.schemas/reservation.schema";
import { ReservationSearchOptions } from "./reservation-search-options.interface";
import { ReservationDto } from "./reservation.dto.interface";

export interface IReservation {
  addReservation(data: ReservationDto): Promise<Reservation>;
  removeReservation(id: ID): Promise<void>;
  getReservations(
    filter: ReservationSearchOptions
  ): Promise<Array<Reservation>>;
}
