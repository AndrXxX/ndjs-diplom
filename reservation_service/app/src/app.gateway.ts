import { BadRequestException, UseFilters, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserRoleEnum } from "./enums/user-role.enum";
import { WsExceptionFilter } from "./filters/ws.exception.filter";
import { Roles } from "./modules/auth/decorators/roles.decorator";
import { AuthenticatedGuard } from "./modules/auth/guards/authenticated.guard";
import { RolesGuard } from "./modules/auth/guards/roles.guard";
import { SupportRequestMessageFormatter } from "./modules/support-request/support-request-message.formatter";
import { SupportRequestService } from "./modules/support-request/support-request.service";
import { ID } from "./types/ID";

@UseFilters(new WsExceptionFilter)
@UseGuards(AuthenticatedGuard, RolesGuard)
@WebSocketGateway({ cors: true })
export class AppGateway {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly supportMessageFormatter: SupportRequestMessageFormatter,
  ) {}

  @WebSocketServer()
  server: Server;

  @Roles(UserRoleEnum.manager, UserRoleEnum.client)
  @SubscribeMessage('subscribeToChat')
  async subscribeToChat(
    @MessageBody("payload") dto: { payload: { chatId: ID} },
    @ConnectedSocket() client: Socket,
  ) {
    if (!dto.payload.chatId) {
      throw new BadRequestException('payload.chatId is empty');
    }
    return this.supportRequestService.subscribe((supportRequest, message) => {
      client.emit('newMessage', this.supportMessageFormatter.format(message))
    });
  }
}
