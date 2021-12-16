import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as xmlParser from 'express-xml-bodyparser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.use(xmlParser());

  await app.listen(3000);
}
bootstrap();
