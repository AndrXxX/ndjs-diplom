import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DtoValidationPipe } from "src/validators/dto.validation.pipe";
import { NotAuthenticatedGuard } from "../auth/guards/not-authenticated.guard";
import { CreateUserDto } from "./dto/user-create.dto";
import { UsersFormatter } from "./users.formatter";
import { UsersService } from "./users.service";

@Controller('/api/client')
export class UsersClientController {
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
