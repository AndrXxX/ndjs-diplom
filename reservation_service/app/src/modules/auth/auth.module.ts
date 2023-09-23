import { Module } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { GenerateHashService } from "./generate-hash.service";

@Module({
  imports: [],
  providers: [GenerateHashService],
  exports: [AuthService, GenerateHashService],
})
export class AuthModule {}
