import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HotelsFormatter } from "src/modules/hotels/hotels.formatter";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { HotelsRoomFormatter } from "./hotels-room.formatter";
import { HotelsRoomService } from "./hotels-room.service";
import { HotelsService } from "./hotels.service";
import { SearchHotelParams } from "./interfaces/search-hotel-params.interface";
import { SearchRoomsParams } from "./interfaces/search-rooms-params.interface";

@Controller('api')
export class HotelsController {
  constructor(
    private hotelsService: HotelsService,
    private hotelRoomsService: HotelsRoomService,
    private hotelsFormatter: HotelsFormatter,
    private hotelsRoomFormatter: HotelsRoomFormatter,
  ) {}

  @Post('/admin/hotels/')
  async addHotel(@Body() createHotelDto: CreateHotelDto) {
    // TODO: Доступно только аутентифицированным пользователям с ролью admin.
    //
    // Ошибки
    // 401 - если пользователь не аутентифицирован;
    // 403 - если роль пользователя не admin.
    return this.hotelsFormatter.format(await this.hotelsService.create(createHotelDto))
  }

  @Get('/admin/hotels/')
  async hotelsList(@Query() query: SearchHotelParams) {
    // TODO: Доступно только аутентифицированным пользователям с ролью admin.
    //
    // Ошибки
    // 401 - если пользователь не аутентифицирован;
    // 403 - если роль пользователя не admin.
    const hotels = await this.hotelsService.search(query);
    return hotels.map(hotel => this.hotelsFormatter.format(hotel));
  }

  @Get('/common/hotel-rooms/')
  async hotelRoomsList(@Query() query: SearchRoomsParams) {
    // TODO: Если пользователь не аутентифицирован или его роль client, то при поиске всегда должен использоваться флаг isEnabled: true.
    const rooms = await this.hotelRoomsService.search(query);
    return rooms.map(room => this.hotelsRoomFormatter.format(room));
  }

  @Get('/common/hotel-rooms/:id')
  async hotelRoom(@Param('id') id: string) {
    const room = await this.hotelRoomsService.findById(id);
    return room ? this.hotelsRoomFormatter.format(room) : {};
  }
}
