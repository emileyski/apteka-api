import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('💊 Apteka API v1')
    .setDescription('This is the API for Apteka-System version 1.0')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      description: 'Enter access token here',
      bearerFormat: 'Bearer ${token}',
      in: 'header',
      name: 'Authorization',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs', app, document);

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  Logger.log(
    `💊 Apteka API is running http://localhost:${PORT}/docs`,
    'Bootstrap',
  );

  Logger.log(
    `📚 Swagger is running http://localhost:${PORT}/docs`,
    'Bootstrap',
  );
}
bootstrap();
