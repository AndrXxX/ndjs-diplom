import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/modules/auth/auth.module";
import { User, UserSchema } from "./mongo.schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
