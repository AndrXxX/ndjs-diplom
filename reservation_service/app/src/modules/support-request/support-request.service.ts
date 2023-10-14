import { Injectable } from "@nestjs/common";
import { isUndefined } from "@nestjs/common/utils/shared.utils";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ID } from "src/types/ID";
import { GetChatListParams } from "./interfaces/get-chat-list-params.interface";
import { SendMessage } from "./interfaces/send-message.interface";
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
        const queryParams: Partial<SupportRequest> = {};
        const { limit, offset } = params;
        params.userId && (queryParams.userId = params.userId);
        !isUndefined(params.isActive) && (queryParams.isActive = params.isActive);
        const query = this.SupportRequestModel.find(queryParams);
        limit && query.limit(limit);
        offset && query.skip(offset);
        return await query.populate(this.populateParams()).select('-__v').exec();
    }

    public async sendMessage(request: SupportRequest, data: SendMessage): Promise<Message> {
        const message = new this.MessageModel();
        message.sentAt = new Date();
        message.requestId = data.supportRequest;
        message.text = data.text;
        await message.save();
        request.messages.push(message);
        return message;
    }

    public async getMessages(supportRequest: ID): Promise<Message[]> {
        return (await this.findById(supportRequest)).messages || [];
    }

    public subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
        // TODO:
        return () => {};
    }

    public async findById(id: ID): Promise<SupportRequestDocument | undefined> {
        return await this.SupportRequestModel.findById(id).populate(this.populateParams()).select('-__v').exec();
    }

    private populateParams() {
        return [
            "user",
            "messages",
        ]
    }
}
