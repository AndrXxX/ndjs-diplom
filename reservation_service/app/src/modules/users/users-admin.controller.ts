import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DtoValidationPipe } from "src/validators/dto.validation.pipe";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { CreateUserDto } from "../users/dto/user-create.dto";
import { UsersFormatter } from "../users/users.formatter";
import { UsersService } from "../users/users.service";

@Controller('/api/admin')
export class UsersAdminController {
  constructor(
    private usersService: UsersService,
    private usersFormatter: UsersFormatter,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Post("/users")
  async users(@Body(DtoValidationPipe) createUserDto: CreateUserDto) {
    // TODO: Доступно только пользователям с ролью admin.
    // TODO: 403 - если роль пользователя не admin.
    return this.usersFormatter.formatForAdmin(await this.usersService.create(createUserDto));
  }
}
