import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //Swagger configuration
  const config = new DocumentBuilder()
  .setVersion('1.0')
  .setTitle('Blog API')
  .setDescription('API blog documentation using Nestjs')
  .setTermsOfService('http://localhost:3002/terms-of-service')
  .setLicense('MIT LICENSE', 'https://github.com/git/git-scm.com/blob/gh-pages/MIT-LICENSE.txt')
  .addServer('http://localhost:3002')
  .build();
  //Instantiate Document
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
