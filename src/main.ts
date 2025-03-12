import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  const configDocs = new DocumentBuilder()
    .setTitle('Store Api Docs')
    .setDescription('Документация пет-проекта интернет-магазина')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, configDocs);
  SwaggerModule.setup('store-api', app, documentFactory);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  await app.listen(config.getOrThrow<number>('PORT'));
}
bootstrap();
