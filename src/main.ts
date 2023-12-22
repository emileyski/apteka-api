import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Auth Service')
    .setDescription('Auth Service API')
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

  await app.listen(3000);
  Logger.log(`💊 Server running on port 3000`, 'Bootstrap');
}
bootstrap();
