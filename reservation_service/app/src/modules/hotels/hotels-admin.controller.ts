import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserRoleEnum } from "src/enums/user-role.enum";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { AuthenticatedGuard } from "src/modules/auth/guards/authenticated.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { HotelsFormatter } from "src/modules/hotels/hotels.formatter";
import { ID } from "src/types/ID";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { HotelsService } from "./hotels.service";
import { SearchHotelParams } from "./interfaces/search-hotel-params.interface";

@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('/api/admin/hotels')
export class HotelsAdminController {
  constructor(
    private hotelsService: HotelsService,
    private hotelsFormatter: HotelsFormatter,
  ) {}

  @Roles(UserRoleEnum.admin)
  @Post('/')
  async addHotel(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsFormatter.format(await this.hotelsService.create(createHotelDto));
  }

  @Roles(UserRoleEnum.admin)
  @Get('/')
  async hotelsList(@Query() query: SearchHotelParams) {
    const hotels = await this.hotelsService.search(query);
    return hotels.map(hotel => this.hotelsFormatter.format(hotel));
  }

  @Roles(UserRoleEnum.admin)
  @Put('/:id')
  async updateHotel(@Param('id') id: ID, @Body() updateHotelDto: UpdateHotelParams) {
    return this.hotelsFormatter.format(await this.hotelsService.update(id, updateHotelDto));
  }
}
