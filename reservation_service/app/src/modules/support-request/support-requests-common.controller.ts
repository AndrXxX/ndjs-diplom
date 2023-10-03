import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserRoleEnum } from "src/enums/user-role.enum";
import { CreateSupportRequestDto } from "src/modules/support-request/dto/send-message.dto";
import { User } from "src/modules/users/mongo.schemas/user.schema";
import { ID } from "src/types/ID";
import { DtoValidationPipe } from "src/validators/dto.validation.pipe";
import { Roles } from "../auth/decorators/roles.decorator";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { SupportRequestMessageFormatter } from "./support-request-message.formatter";
import { SupportRequestService } from "./support-request.service";

@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('/api/common/support-requests')
export class SupportRequestsCommonController {
  constructor(
    private messageFormatter: SupportRequestMessageFormatter,
    private supportRequestService: SupportRequestService,
  ) {}

  @Roles(UserRoleEnum.manager, UserRoleEnum.client)
  @Get("/:id/messages")
  async messages(@Param('id') id: ID, @Request() req: any) {
    const supportRequest = await this.getSupportRequest(id, req.user);
    return supportRequest.messages.map(item => this.messageFormatter.format(item));
  }

  @Roles(UserRoleEnum.manager, UserRoleEnum.client)
  @Post("/:id/messages")
  async sendMessage(
    @Param('id') id: ID,
    @Request() req: any,
    @Body(DtoValidationPipe) dto: CreateSupportRequestDto
  ) {
    await this.getSupportRequest(id, req.user);
    dto.supportRequest = id;
    dto.author = req.user.id;
    const message = await this.supportRequestService.sendMessage(dto)
    return this.messageFormatter.format(message);
  }

  private async getSupportRequest(id: ID, user: User) {
    const supportRequest = await this.supportRequestService.findById(id);
    if (!supportRequest) {
      throw new NotFoundException(`SupportRequest #${id} not found`);
    }
    if ([UserRoleEnum.client as string].includes(user.role) && supportRequest.user !== user.id) {
      throw new ForbiddenException('You can not access to this support request');
    }
    return supportRequest;
  }
}
