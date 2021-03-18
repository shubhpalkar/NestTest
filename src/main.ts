import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    session({
      secret: 'asdasd123321',
      resave: false,
      saveUninitialized: false,
    }),
  );
  const server = await app.listen(3000);
  server.setTimeout(1800000); //30min
}
bootstrap();
