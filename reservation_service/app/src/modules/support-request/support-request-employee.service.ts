import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserRoleEnum } from "src/enums/user-role.enum";
import { ID } from "src/types/ID";
import { MarkMessagesAsRead } from "./interfaces/mark-messages-as-read.interface";
import { ISupportRequestEmployeeService } from "./interfaces/support-request-employee-service.interface";
import { Message } from "./mongo.schemas/message.schema";
import { SupportRequest, SupportRequestDocument } from "./mongo.schemas/support-request.schema";

@Injectable()
export class SupportRequestEmployeeService implements ISupportRequestEmployeeService {

    // TODO: Оповещения должны быть реализованы через механизм EventEmitter.

    constructor(
      @InjectModel(SupportRequest.name) private SupportRequestModel: Model<SupportRequestDocument>,
    ) {}

    public async markMessagesAsRead(params: MarkMessagesAsRead) {
        (await this.findById(params.supportRequest))?.messages
          .filter(message => message.authorId == params.user)
          .filter(message => message.sentAt < params.createdBefore)
          .forEach(message => {
              message.readAt = new Date();
              message.save();
          })
    }

    public async getUnreadCount(supportRequest: ID): Promise<Message[]> {
        return (await this.findById(supportRequest))
          ?.messages
          .filter(message => message.author?.role == UserRoleEnum.client)
          .filter(message => !message.readAt) || [];
    }

    public async closeRequest(supportRequest: ID): Promise<void> {
        const request = await this.findById(supportRequest);
        if (request) {
            request.isActive = false;
            await request.save();
        }
    }

    private async findById(id: ID): Promise<SupportRequestDocument | undefined> {
        return await this.SupportRequestModel.findById(id).select('-__v').exec();
    }
}
