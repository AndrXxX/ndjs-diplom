import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./mongo.schemas/message.schema";
import { SupportRequest, SupportRequestSchema } from "./mongo.schemas/support-request.schema";
import { SupportRequestFormatter } from "./support-request.formatter";
import { SupportRequestService } from "./support-request.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
  ],
  providers: [SupportRequestService, SupportRequestFormatter],
  exports: [SupportRequestService, SupportRequestFormatter],
})
export class SupportRequestModule {}
