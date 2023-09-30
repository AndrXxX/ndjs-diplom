import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserRoleEnum } from "src/enums/user-role.enum";
import { Roles } from "../auth/decorators/roles.decorator";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { ReservationsFormatter } from "./reservations.formatter";
import { ReservationsService } from "./reservations.service";

@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('/api/client/reservations')
export class ReservationsClientController {
  constructor(
    private reservationsService: ReservationsService,
    private reservationsFormatter: ReservationsFormatter,
  ) {}

  @Roles(UserRoleEnum.client)
  @Get("/")
  async reservationsList(@Request() req: any) {
    const items = await this.reservationsService.getReservations({ userId: req.user.id });
    return items.map(item => this.reservationsFormatter.format(item));
  }
}
