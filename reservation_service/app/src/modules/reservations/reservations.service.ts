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
        return await this.findById(model.id);
    }

    public async removeReservation(id: ID): Promise<void> {
        await this.ReservationModel.findByIdAndDelete(id).exec();
    }

    public async getReservations(filter: ReservationSearchOptions): Promise<ReservationDocument[]> {
        const { userId, roomId } = filter;
        const query = this.ReservationModel.find({ userId, roomId });
        filter.dateStart && query.find({ dateStart: { $gte: filter.dateStart } });
        filter.dateEnd && query.find({ dateEnd: { $lte: filter.dateStart } });
        return await query.select('-__v').exec();
    }

    public async findById(id: ID): Promise<ReservationDocument | undefined> {
        return await this.ReservationModel.findById(id).populate(['userId', {
            path: 'roomId',
            populate: { path: 'hotel' }
        }]).select('-__v').exec();
    }
}
