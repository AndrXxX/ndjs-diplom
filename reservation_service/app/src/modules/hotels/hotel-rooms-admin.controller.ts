import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserRoleEnum } from "src/enums/user-role.enum";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { AuthenticatedGuard } from "src/modules/auth/guards/authenticated.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { ID } from "src/types/ID";
import { CreateHotelRoomDto } from "./dto/create-hotel-room.dto";
import { UpdateHotelRoomDto } from "./dto/update-hotel-room.dto";
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

  @Roles(UserRoleEnum.admin)
  @Put('/:id')
  async updateHotelRoom(@Param('id') id: ID, @Body() updateHotelRoomDto: UpdateHotelRoomDto) {
    // TODO: Этот запрос предполагает загрузку файлов и должен использовать формат multipart/form-data.
    // TODO: При обновлении может быть отправлен одновременно список ссылок на уже загруженные картинки и список файлов с новыми картинками.
    // TODO: При использовании multer список загруженных файлов можно получить через @UploadedFiles(). Этот список нужно объединить со списком, который пришёл в body.
    return this.hotelsRoomFormatter.format(await this.hotelsRoomService.update(id, updateHotelRoomDto as any)); // TODO
  }
}
