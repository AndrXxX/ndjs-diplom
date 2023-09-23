import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config';
import { AuthModule } from "./modules/auth/auth.module";
import { HotelsModule } from "./modules/hotels/hotels.module";
import { ReservationsModule } from "./modules/reservations/reservations.module";
import { SupportRequestModule } from "./modules/support-request/support-request.module";
import { UsersModule } from "./modules/users/users.module";

const modules = [
  MongooseModule.forRoot(config.dbUrl),
  AuthModule,
  HotelsModule,
  ReservationsModule,
  SupportRequestModule,
  UsersModule,
];

@Module({
  imports: [
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
