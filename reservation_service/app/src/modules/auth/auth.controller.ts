import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { DtoValidationPipe } from "src/validators/dto.validation.pipe";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { LocalAuthGuard } from "../auth/guards/local.auth.guard";
import { NotAuthenticatedGuard } from "../auth/guards/not-authenticated.guard";
import { SigninUserDto } from "../users/interfaces/user-signin.interface";
import { UsersFormatter } from "../users/users.formatter";

@Controller('/api/auth')
export class AuthController {
  constructor(
    private usersFormatter: UsersFormatter,
  ) {}

  @UseGuards(NotAuthenticatedGuard)
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async authLogin(
    @Body(DtoValidationPipe) signinUserDto: SigninUserDto,
    @Request() req: any,
  ) {
    return this.usersFormatter.format(req.user);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/logout')
  logout(@Request() req: any): any {
    req.session.destroy();
  }
}
