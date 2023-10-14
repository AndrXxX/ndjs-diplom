import { Injectable } from "@nestjs/common";
import { isUndefined } from "@nestjs/common/utils/shared.utils";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ID } from "src/types/ID";
import { GetChatListParams } from "./interfaces/get-chat-list-params.interface";
import { SendMessage } from "./interfaces/send-message.interface";
import { ISupportRequestService } from "./interfaces/support-request-service.interface";
import { Message } from "./mongo.schemas/message.schema";
import { SupportRequest, SupportRequestDocument } from "./mongo.schemas/support-request.schema";
import { SupportRequestMessageService } from "./support-request-message.service";

@Injectable()
export class SupportRequestService implements ISupportRequestService {

    // TODO: Оповещения должны быть реализованы через механизм EventEmitter.

    constructor(
      @InjectModel(SupportRequest.name) private SupportRequestModel: Model<SupportRequestDocument>,
      private messageService: SupportRequestMessageService,
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
        const message = await this.messageService.addMessage(data);
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
