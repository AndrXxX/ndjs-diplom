import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { DtoValidationPipe } from "src/validators/dto.validation.pipe";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/guards/local.auth.guard";
import { CreateUserDto } from "./dto/user-create.dto";
import { SigninUserDto } from "./interfaces/user-signin.interface";
import { UsersService } from "./users.service";

@Controller('api')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post("/client/register")
  async clientRegister(@Body(DtoValidationPipe) createUserDto: CreateUserDto) {
    createUserDto.role = 'client';
    await this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post("/auth/login")
  async authLogin(
    @Body(DtoValidationPipe) signinUserDto: SigninUserDto,
    @Request() req: any,
  ) {
    // TODO: Доступно только не аутентифицированным пользователям.
    // TODO: 401 - если пользователя с указанным email не существует или пароль неверный.
    // TODO: Стартует сессию пользователя и выставляет Cookies.
    return {
      email: req.user.email,
      name: req.user.name,
      contactPhone: req.user.contactPhone,
    }
  }
}
