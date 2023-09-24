import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DtoValidationPipe } from "src/validators/dto.validation.pipe";
import { NotAuthenticatedGuard } from "../auth/guards/not-authenticated.guard";
import { CreateUserDto } from "../users/dto/user-create.dto";
import { UsersFormatter } from "../users/users.formatter";
import { UsersService } from "../users/users.service";

@Controller('/api/client')
export class ClientController {
  constructor(
    private usersService: UsersService,
    private usersFormatter: UsersFormatter,
  ) {}

  @UseGuards(NotAuthenticatedGuard)
  @Post("/register")
  async clientRegister(@Body(DtoValidationPipe) createUserDto: CreateUserDto) {
    createUserDto.role = 'client';
    return this.usersFormatter.format(await this.usersService.create(createUserDto));
  }
}
