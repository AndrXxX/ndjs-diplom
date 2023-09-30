import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HotelsFormatter } from "src/modules/hotels/hotels.formatter";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { HotelsService } from "./hotels.service";
import { SearchHotelParams } from "./interfaces/search-hotel-params.interface";

@Controller('/api/admin')
export class HotelsAdminController {
  constructor(
    private hotelsService: HotelsService,
    private hotelsFormatter: HotelsFormatter,
  ) {}

  @Post('/hotels/')
  async addHotel(@Body() createHotelDto: CreateHotelDto) {
    // TODO: Доступно только аутентифицированным пользователям с ролью admin.
    //
    // Ошибки
    // 401 - если пользователь не аутентифицирован;
    // 403 - если роль пользователя не admin.
    return this.hotelsFormatter.format(await this.hotelsService.create(createHotelDto))
  }

  @Get('/hotels/')
  async hotelsList(@Query() query: SearchHotelParams) {
    // TODO: Доступно только аутентифицированным пользователям с ролью admin.
    //
    // Ошибки
    // 401 - если пользователь не аутентифицирован;
    // 403 - если роль пользователя не admin.
    const hotels = await this.hotelsService.search(query);
    return hotels.map(hotel => this.hotelsFormatter.format(hotel));
  }
}
