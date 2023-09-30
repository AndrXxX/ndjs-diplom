import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ID } from "src/types/ID";
import { ReservationSearchOptions } from "./interfaces/reservation-search-options.interface";
import { IReservationService } from "./interfaces/reservation-service.interface";
import { ReservationDto } from "./interfaces/reservation-dto.interface";
import { Reservation, ReservationDocument } from "./mongo.schemas/reservation.schema";

@Injectable()
export class ReservationsService implements IReservationService {

    constructor(
      @InjectModel(Reservation.name) private ReservationModel: Model<ReservationDocument>,
    ) {}

    public async addReservation(data: ReservationDto): Promise<ReservationDocument> {
        // TODO: Метод IReservation.addReservation должен проверять, доступен ли номер на заданную дату.
        const model = new this.ReservationModel(data);
        await model.save();
        return model;
    }

    async removeReservation(id: ID): Promise<void> {
        await this.ReservationModel.findByIdAndDelete(id).exec();
    }

    async getReservations(filter: ReservationSearchOptions): Promise<ReservationDocument[]> {
        return await this.ReservationModel.find(filter).select('-__v').exec();
    }

    async findById(id: ID): Promise<ReservationDocument | undefined> {
        return await this.ReservationModel.findById(id).select('-__v').exec();
    }
}
