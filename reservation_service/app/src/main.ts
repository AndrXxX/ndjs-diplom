import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { UnifiedExceptionFilter } from "./filters/unified.exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new UnifiedExceptionFilter());
  await app.listen(config.port);
}
bootstrap();
