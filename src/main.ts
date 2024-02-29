import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ORIGIN, CREDENTIALS } from './config/index.config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: ORIGIN,
    credentials: CREDENTIALS as unknown as boolean,
  };

  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('Sabbath scool API')
    .addBearerAuth()
    .setDescription(
      'The entire request and API responses are encrypted with AES and protected by JWT token authentication.',
    )
    .setVersion('1.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
