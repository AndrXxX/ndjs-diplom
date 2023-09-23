import { Body, Controller, Post } from '@nestjs/common';
import { CreateHotelDto } from "src/modules/hotels/dto/create-hotel.dto";
import { IHotelsService } from "src/modules/hotels/interfaces/hotels-service.interface";

@Controller('api')
export class HotelsController {
  constructor(private hotelsService: IHotelsService) {
  }

  @Post('/admin/hotels/')
  async addHotel(@Body() createHotelDto: CreateHotelDto) {
    const { id, title, description } = await this.hotelsService.create(createHotelDto);
    return { id, title, description }
  }
}
