import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { DtoValidationPipe } from "src/validators/dto.validation.pipe";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { LocalAuthGuard } from "../auth/guards/local.auth.guard";
import { NotAuthenticatedGuard } from "../auth/guards/not-authenticated.guard";
import { CreateUserDto } from "./dto/user-create.dto";
import { SigninUserDto } from "./interfaces/user-signin.interface";
import { UsersFormatter } from "./users.formatter";
import { UsersService } from "./users.service";

@Controller('api')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private usersFormatter: UsersFormatter,
  ) {}

  @UseGuards(NotAuthenticatedGuard)
  @Post("/client/register")
  async clientRegister(@Body(DtoValidationPipe) createUserDto: CreateUserDto) {
    createUserDto.role = 'client';
    return this.usersFormatter.format(await this.usersService.create(createUserDto));
  }

  @UseGuards(NotAuthenticatedGuard)
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

  @UseGuards(AuthenticatedGuard)
  @Post('auth/logout')
  logout(@Request() req: any): any {
    req.session.destroy();
  }
}
