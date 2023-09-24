import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DtoValidationPipe } from "src/validators/dto.validation.pipe";
import { Roles } from "../auth/decorators/roles.decorator";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CreateUserDto } from "../users/dto/user-create.dto";
import { UsersFormatter } from "../users/users.formatter";
import { UsersService } from "../users/users.service";

@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('/api/admin')
export class UsersAdminController {
  constructor(
    private usersService: UsersService,
    private usersFormatter: UsersFormatter,
  ) {}

  @Roles('admin')
  @Post("/users")
  async users(@Body(DtoValidationPipe) createUserDto: CreateUserDto) {
    return this.usersFormatter.formatForAdmin(await this.usersService.create(createUserDto));
  }
}
