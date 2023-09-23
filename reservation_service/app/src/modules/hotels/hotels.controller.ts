import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { FormatHotelService } from "./format-hotel.service";
import { IHotelsService } from "./interfaces/hotels-service.interface";
import { SearchHotelParams } from "./interfaces/search-hotel-params.interface";

@Controller('api')
export class HotelsController {
  constructor(
    private hotelsService: IHotelsService,
    private formatHotelService: FormatHotelService,
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
}
