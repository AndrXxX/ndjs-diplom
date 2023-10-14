import { Controller, Get, Query, Request, UseGuards, } from '@nestjs/common';
import { UserRoleEnum } from "src/enums/user-role.enum";
import { Roles } from "../auth/decorators/roles.decorator";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { GetChatListParams } from "./interfaces/get-chat-list-params.interface";
import { SupportRequestEmployeeService } from "./support-request-employee.service";
import { SupportRequestFormatter } from "./support-request.formatter";
import { SupportRequestService } from "./support-request.service";

@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('/api/manager/support-requests')
export class SupportRequestsManagerController {
  constructor(
    private supportRequestEmployeeService: SupportRequestEmployeeService,
    private supportRequestFormatter: SupportRequestFormatter,
    private supportRequestService: SupportRequestService,
  ) {}

  @Roles(UserRoleEnum.manager)
  @Get("/")
  async supportRequestsList(@Request() req: any, @Query() query: GetChatListParams) {
    const items = await this.supportRequestService.findSupportRequests(query);
    return Promise.all(items.map(async item => {
      return this.supportRequestFormatter.formatForClient(item, (await this.supportRequestEmployeeService.getUnreadCount(item.id)).length);
    }));
  }
}
