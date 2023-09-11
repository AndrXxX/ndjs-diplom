import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ID } from "src/types/ID";
import { CreateSupportRequestDto } from "./interfaces/create-support-request-dto.interface";
import { MarkMessagesAsReadDto } from "./interfaces/mark-messages-as-read-dto.interface";
import { ISupportRequestClientService } from "./interfaces/support-request-client-service.interface";
import { Message } from "./mongo.schemas/message.schema";
import { SupportRequest, SupportRequestDocument } from "./mongo.schemas/support-request.schema";

@Injectable()
export class SupportRequestClientService implements ISupportRequestClientService {

    constructor(
      @InjectModel(SupportRequest.name) private SupportRequestModel: Model<SupportRequestDocument>,
    ) {}

    public async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
        const model = new this.SupportRequestModel(data);
        model.createdAt = new Date();
        model.isActive = true;
        // model.messages.push() // TODO add message
        await model.save();
        return model;
    }

    public async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
        (await this.findById(params.supportRequest))?.messages
          .filter(message => message.author != params.user)
          .filter(message => message.sentAt < params.createdBefore)
          .forEach(message => {
              message.readAt = new Date();
              message.save();
          })
    }

    public async getUnreadCount(supportRequest: ID): Promise<Message[]> {
        // TODO: должен возвращать количество сообщений, которые были отправлены любым сотрудником поддержки и не отмечены прочитанным.
        // TODO: Возможно проверять роль
        return (await this.findById(supportRequest))
          ?.messages
          .filter(message => !message.readAt) || [];
    }

    private async findById(id: ID): Promise<SupportRequestDocument | undefined> {
        return await this.SupportRequestModel.findById(id).select('-__v').exec();
    }
}
