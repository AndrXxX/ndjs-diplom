import { Module } from '@nestjs/common';
import { GenerateHashService } from "src/modules/auth/generate-hash.service";

@Module({
  imports: [],
  providers: [GenerateHashService],
  exports: [GenerateHashService],
})
export class AuthModule {}
