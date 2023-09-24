import { Module } from '@nestjs/common';
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { GenerateHashService } from "./generate-hash.service";

@Module({
  imports: [UsersModule],
  providers: [AuthService, GenerateHashService],
  exports: [AuthService, GenerateHashService],
})
export class AuthModule {}
