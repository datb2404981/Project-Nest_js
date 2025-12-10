// src/main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new JwtAuthGuard(reflector));
  const reflector = app.get(Reflector);

  // LẤY CONFIG TRƯỚC KHI DÙNG
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 8080;

  // Cấu hình views + static
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');        // hoặc 'ejs' tùy bạn

  // Các middleware khác
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.use(cookieParser());

  //config versionsing
  app.setGlobalPrefix('api/')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion:['1','2']
});

app.enableCors({
  origin: true, // FE domain
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
});


  await app.listen(port);
  console.log(`Server đang chạy tại: http://localhost:${port}`);
}
bootstrap();
