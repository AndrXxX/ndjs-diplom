import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UserRoleEnum } from "src/enums/user-role.enum";
import { Roles } from "../auth/decorators/roles.decorator";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { HotelsRoomService } from "../hotels/hotels-room.service";
import { CreateReservationDto } from "../reservations/dto/create-reservation.dto";
import { ReservationsFormatter } from "./reservations.formatter";
import { ReservationsService } from "./reservations.service";

@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('/api/client/reservations')
export class ReservationsClientController {
  constructor(
    private reservationsService: ReservationsService,
    private hotelsRoomService: HotelsRoomService,
    private reservationsFormatter: ReservationsFormatter,
  ) {}

  @Roles(UserRoleEnum.client)
  @Post("/")
  async addReservation(@Body() dto: CreateReservationDto, @Request() req: any) {
    const room = await this.hotelsRoomService.findById(dto.hotelRoom);
    const item = await this.reservationsService.addReservation({
      userId: req.user.id,
      hotelId: room.hotel,
      roomId: dto.hotelRoom,
      dateStart: dto.startDate,
      dateEnd: dto.endDate,
    });
    return this.reservationsFormatter.format(item);
  }

  @Roles(UserRoleEnum.client)
  @Get("/")
  async reservationsList(@Request() req: any) {
    const items = await this.reservationsService.getReservations({ userId: req.user.id });
    return items.map(item => this.reservationsFormatter.format(item));
  }
}
