import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserRoleEnum } from "src/enums/user-role.enum";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { AuthenticatedGuard } from "src/modules/auth/guards/authenticated.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { CreateHotelRoomDto } from "./dto/create-hotel-room.dto";
import { HotelsRoomFormatter } from "./hotels-room.formatter";
import { HotelsRoomService } from "./hotels-room.service";

@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('/api/admin/hotel-rooms')
export class HotelRoomsAdminController {
  constructor(
    private hotelsRoomService: HotelsRoomService,
    private hotelsRoomFormatter: HotelsRoomFormatter,
  ) {}

  @Roles(UserRoleEnum.admin)
  @Post('/')
  async addHotelRoom(@Body() createHotelRoomDto: CreateHotelRoomDto) {
    // TODO: Этот запрос предполагает загрузку файлов и должен использовать формат multipart/form-data.
    return this.hotelsRoomFormatter.format(await this.hotelsRoomService.create(createHotelRoomDto));
  }
}
