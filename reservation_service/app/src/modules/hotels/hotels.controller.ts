import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IHotelsRoomService } from "src/modules/hotels/interfaces/hotels-room-service.interface";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { FormatHotelRoomService } from "./format-hotel-room.service";
import { FormatHotelService } from "./format-hotel.service";
import { IHotelsService } from "./interfaces/hotels-service.interface";
import { SearchHotelParams } from "./interfaces/search-hotel-params.interface";
import { SearchRoomsParams } from "./interfaces/search-rooms-params.interface";

@Controller('api')
export class HotelsController {
  constructor(
    private hotelsService: IHotelsService,
    private hotelRoomsService: IHotelsRoomService,
    private formatHotelService: FormatHotelService,
    private formatHotelRoomService: FormatHotelRoomService,
  ) {}

  @Post('/admin/hotels/')
  async addHotel(@Body() createHotelDto: CreateHotelDto) {
    // TODO: Доступно только аутентифицированным пользователям с ролью admin.
    //
    // Ошибки
    // 401 - если пользователь не аутентифицирован;
    // 403 - если роль пользователя не admin.
    return this.formatHotelService.format(await this.hotelsService.create(createHotelDto))
  }

  @Get('/admin/hotels/')
  async hotelsList(@Query() query: SearchHotelParams) {
    // TODO: Доступно только аутентифицированным пользователям с ролью admin.
    //
    // Ошибки
    // 401 - если пользователь не аутентифицирован;
    // 403 - если роль пользователя не admin.
    const hotels = await this.hotelsService.search(query);
    return hotels.map(hotel => this.formatHotelService.format(hotel));
  }

  @Get('/common/hotel-rooms/')
  async hotelRoomsList(@Query() query: SearchRoomsParams) {
    // TODO: Если пользователь не аутентифицирован или его роль client, то при поиске всегда должен использоваться флаг isEnabled: true.
    const rooms = await this.hotelRoomsService.search(query);
    return rooms.map(room => this.formatHotelRoomService.format(room));
  }
}
