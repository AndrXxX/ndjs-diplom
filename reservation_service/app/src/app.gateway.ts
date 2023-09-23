import { UseFilters } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsExceptionFilter } from "src/filters/ws.exception.filter";
import { CreateBookCommentDto } from "src/modules/book-comments/dto/book-comment-create.dto";
import { IdValidationPipe } from "src/validators/id.validation.pipe";
import { WsDtoValidationPipe } from "src/validators/ws.dto.validation.pipe";
import { BookCommentsService } from "./modules/book-comments/book-comments.service";

@UseFilters(new WsExceptionFilter)
@WebSocketGateway({ cors: true })
export class AppGateway {
  constructor(
    private readonly commentsService: BookCommentsService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('getAllComments')
  async getAllComments(@MessageBody("bookId", IdValidationPipe) bookId: string) {
    return await this.commentsService.findAllBookComment(bookId);
  }

  @SubscribeMessage('addComment')
  async addComment(@MessageBody(WsDtoValidationPipe) createCommentDto: CreateBookCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }
}
