import { Controller, ForbiddenException, Get, Param, Request, UseGuards, } from '@nestjs/common';
import { UserRoleEnum } from "src/enums/user-role.enum";
import { ID } from "src/types/ID";
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
    if ([UserRoleEnum.client].includes(req.user.id)) {
      const supportRequest = await this.supportRequestService.findById(id);
      if (supportRequest.user !== req.user.id) {
        throw new ForbiddenException('You can not access to this support request');
      }
    }
    const items = await this.supportRequestService.getMessages(id);
    return items.map(item => this.messageFormatter.format(item));
  }
}
