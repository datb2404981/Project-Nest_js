import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}


@Get()
@Render('home.ejs')
getHello() {
  return { message: 'Hello' };
}


  
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
