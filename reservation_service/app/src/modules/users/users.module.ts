import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { User, UserSchema } from "./mongo.schemas/user.schema";
import { UsersFormatter } from "src/modules/users/users.formatter";
import { UsersController } from "./users.controller";
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
  controllers: [UsersController],
})
export class UsersModule {}
