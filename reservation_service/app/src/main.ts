import { NestFactory } from '@nestjs/core';
import * as passport from "passport"
import { AppModule } from './app.module';
import config from './config';
import { UnifiedExceptionFilter } from "./filters/unified.exception.filter";
import sessionMiddleware from "./middleware/session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new UnifiedExceptionFilter());

  app.use(sessionMiddleware)
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(config.port);
}
bootstrap();
