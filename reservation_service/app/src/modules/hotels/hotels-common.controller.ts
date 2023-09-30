import { Controller, Get, Query, Request } from '@nestjs/common';
import { UserRoleEnum } from "src/enums/user-role.enum";
import { HotelsRoomFormatter } from "./hotels-room.formatter";
import { HotelsRoomService } from "./hotels-room.service";
import { SearchRoomsParams } from "./interfaces/search-rooms-params.interface";

@Controller('/api/common')
export class HotelsCommonController {
  constructor(
    private hotelsRoomService: HotelsRoomService,
    private hotelsRoomFormatter: HotelsRoomFormatter,
  ) {}

  @Get("/hotel-rooms")
  async hotelRooms(@Query() query: SearchRoomsParams, @Request() req: any) {
    if (!req.user || [UserRoleEnum.client].includes(req.user.role)) {
      query.isEnabled = true;
    }
    const rooms = await this.hotelsRoomService.search(query);
    return rooms.map(room => this.hotelsRoomFormatter.format(room));
  }
}
