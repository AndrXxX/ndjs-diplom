import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "../users/users.module";
import { Message, MessageSchema } from "./mongo.schemas/message.schema";
import { SupportRequest, SupportRequestSchema } from "./mongo.schemas/support-request.schema";
import { SupportRequestMessageFormatter } from "./support-request-message.formatter";
import { SupportRequestFormatter } from "./support-request.formatter";
import { SupportRequestService } from "./support-request.service";
import { SupportRequestsClientController } from "./support-requests-client.controller";
import { SupportRequestsCommonController } from "./support-requests-common.controller";
import { SupportRequestsManagerController } from "./support-requests-manager.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
    UsersModule,
  ],
  providers: [SupportRequestService, SupportRequestFormatter, SupportRequestMessageFormatter],
  exports: [SupportRequestService, SupportRequestFormatter, SupportRequestMessageFormatter],
  controllers: [SupportRequestsClientController, SupportRequestsManagerController, SupportRequestsCommonController],
})
export class SupportRequestModule {}
