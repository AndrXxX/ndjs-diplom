import { Body, Controller, Post, Request, UseGuards, } from '@nestjs/common';
import { UserRoleEnum } from "src/enums/user-role.enum";
import { DtoValidationPipe } from "src/validators/dto.validation.pipe";
import { Roles } from "../auth/decorators/roles.decorator";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CreateSupportRequestDto } from "./dto/create-support-request.dto";
import { SupportRequestClientService } from "./support-request-client.service";
import { SupportRequestFormatter } from "./support-request.formatter";

@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('/api/client/support-requests')
export class SupportRequestsClientController {
  constructor(
    private supportRequestClientService: SupportRequestClientService,
    private supportRequestFormatter: SupportRequestFormatter,
  ) {}

  @Roles(UserRoleEnum.client)
  @Post("/")
  async addSupportRequest(@Body(DtoValidationPipe) dto: CreateSupportRequestDto, @Request() req: any) {
    dto.user = req.user.id;
    const item = await this.supportRequestClientService.createSupportRequest(dto);
    return this.supportRequestFormatter.format(item, (await this.supportRequestClientService.getUnreadCount(item.id)).length);
  }
}
