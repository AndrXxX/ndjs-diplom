import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ID } from "src/types/ID";
import { GetChatListParams } from "./interfaces/get-chat-list-params.interface";
import { SendMessageDto } from "./interfaces/send-message-dto.interface";
import { ISupportRequestService } from "./interfaces/support-request-service.interface";
import { Message, MessageDocument } from "./mongo.schemas/message.schema";
import { SupportRequest, SupportRequestDocument } from "./mongo.schemas/support-request.schema";

@Injectable()
export class SupportRequestService implements ISupportRequestService {

    // TODO: Оповещения должны быть реализованы через механизм EventEmitter.

    constructor(
      @InjectModel(SupportRequest.name) private SupportRequestModel: Model<SupportRequestDocument>,
      @InjectModel(Message.name) private MessageModel: Model<MessageDocument>,
    ) {}

    public async findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
        return await this.SupportRequestModel.find(params).select('-__v').exec();
    }

    public async sendMessage(data: SendMessageDto): Promise<Message> {
        const request = await this.findById(data.supportRequest);
        if (!request) {
            throw new Error(`Unable to find supportRequest with id ${data.supportRequest}`)
        }
        const message = new this.MessageModel(data);
        message.sentAt = new Date();
        await message.save();
        request.messages.push(message);
        await request.save();
        return message;
    }

    public async getMessages(supportRequest: ID): Promise<Message[]> {
        return (await this.findById(supportRequest)).messages || [];
    }

    public subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
        // TODO:
        return () => {};
    }

    private async findById(id: ID): Promise<SupportRequestDocument | undefined> {
        return await this.SupportRequestModel.findById(id).select('-__v').exec();
    }
}