/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, '..', 'src'));

  const config = new DocumentBuilder()
    .setTitle('Gameplay')
    .setDescription('API para jogos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
      customCss: fs.readFileSync(path.join(__dirname, '../src/swagger-custom.css'), 'utf8'),
      customSiteTitle: 'Gameplay',
      swaggerOptions: {
        docExpansion: 'none',
      },
  });

  await app.listen(3000);
}
bootstrap();
