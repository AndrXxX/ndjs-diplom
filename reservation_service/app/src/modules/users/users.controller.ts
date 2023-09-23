import { Body, Controller, Post } from '@nestjs/common';
import { DtoValidationPipe } from "src/validators/dto.validation.pipe";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "./dto/user-create.dto";
import { UsersService } from "./users.service";

@Controller('api')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post("/client/register")
  async signup(@Body(DtoValidationPipe) createUserDto: CreateUserDto) {
    createUserDto.role = 'client';
    await this.usersService.create(createUserDto);
  }
}
