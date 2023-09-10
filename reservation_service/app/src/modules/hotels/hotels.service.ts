import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ID } from "src/types/ID";
import { CreateHotelDto } from "./dto/hotel-create.dto";
import { IHotelsService } from "./interfaces/hotels-service.interface";
import { SearchHotelParams } from "./interfaces/search-hotel-params.interface";
import { Hotel, HotelDocument } from "./mongo.schemas/hotel.schema";

@Injectable()
export class HotelsService implements IHotelsService {
    constructor(
      @InjectModel(Hotel.name) private HotelModel: Model<HotelDocument>,
    ) {}

    public async create(data: Partial<CreateHotelDto>): Promise<HotelDocument> {
        const model = new this.HotelModel(data);
        try {
            await model.save();
            return model;
        } catch (e) {
            console.error(e);
            throw new Error("Ошибка при создании отеля: указаны неверные данные")
        }
    }

    async findById(id: ID): Promise<HotelDocument | undefined> {
        return await this.HotelModel.findById(id).select('-__v').exec();
    }

    async search(params: SearchHotelParams): Promise<HotelDocument[]> {
        return await this.HotelModel.find(params).select('-__v').exec();
    }

    async update(id: ID, data: UpdateHotelParams): Promise<Hotel | undefined> {
        this.HotelModel.updateOne({ id }, data);
        return this.findById(id);
    }
}
