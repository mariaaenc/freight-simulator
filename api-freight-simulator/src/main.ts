import { MongoClient } from 'mongodb';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Logistics Operations')
    .setDescription(
      'API responsible for the context of freight and logistics operators',
    )
    .setVersion('1.0')
    .addTag('Operators')
    .addTag('Freight Simulation')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService: ConfigService = new ConfigService();

  const mongoURI = configService.get<string>('MONGO_DB_URI');

  const mongoClient = new MongoClient(mongoURI);

  try {
    await mongoClient.connect();
    console.info('Success to connect mongodb.');
  } catch (error) {
    console.error(`Failed to connect mongodb. Error: ${error}`);
  } finally {
    await mongoClient.close();
  }

  await app.listen(3000);
}
bootstrap();
