import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GenerateHashService } from "src/modules/auth/generate-hash.service";
import { ID } from "src/types/ID";
import { SearchUserParams } from "./interfaces/search-user-params.interface";
import { CreateUserDto } from "./interfaces/user-create.interface";
import { IUserService } from "./interfaces/user-service.interface";
import { User, UserDocument } from "./mongo.schemas/user.schema";

@Injectable()
export class UsersService implements IUserService {
    constructor(
      @InjectModel(User.name) private UserModel: Model<UserDocument>,
      private hashService: GenerateHashService,
    ) {}

    public async create(data: Partial<CreateUserDto>): Promise<UserDocument> {
        data.passwordHash = this.hashService.generate(data.passwordHash);
        const user = new this.UserModel(data);
        try {
            await user.save();
            return user;
        } catch (e) {
            console.error(e);
            throw new Error("Ошибка при создании пользователя: указаны неверные данные или такой пользователь уже есть")
        }
    }

    async findById(id: ID): Promise<UserDocument | undefined> {
        return await this.UserModel.findById(id).select('-__v').exec();
    }

    async findByEmail(email: string): Promise<UserDocument | undefined> {
        return await this.UserModel.findOne({ email }).select('-__v').exec();
    }

    async findAll(params: SearchUserParams): Promise<User[]> {
        return await this.UserModel.find(params).select('-__v').exec();
        // TODO: При поиске IUserService.findAll() поля email, name и contactPhone должны проверяться на частичное совпадение.
    }
}
