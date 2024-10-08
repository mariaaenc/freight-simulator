import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { initializeApp } from 'firebase-admin/app';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initializeApp({
    projectId: 'freight-simulator',
    storageBucket: 'freight-simulator.appspot.com',
  });

  const config = new DocumentBuilder()
    .setTitle('API Logistics Operations')
    .setDescription(
      'API responsible for the context of freight and logistics operators',
    )
    .setVersion('1.0')
    .addTag('Operator')
    .addTag('Freight Simulation')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
      },
      'authorization',
    )
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

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://freight-simulator.firebaseapp.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, x-customer-uid',
    credentials: true,
  });

  const port = process.env.PORT || 8000;
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
