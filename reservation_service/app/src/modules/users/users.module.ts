import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { User, UserSchema } from "./mongo.schemas/user.schema";
import { UsersAuthController } from "./users-auth.controller";
import { UsersClientController } from "./users-client.controller";
import { UsersFormatter } from "./users.formatter";
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService, UsersFormatter],
  exports: [UsersService, UsersFormatter],
  controllers: [UsersAuthController, UsersClientController],
})
export class UsersModule {}
