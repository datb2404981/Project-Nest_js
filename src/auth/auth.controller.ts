import { BadRequestException, Body, Controller, Get, Post, Render, Request, Res, UseGuards, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { ResponseMessage, User } from '@/decorator/customize';
import { CreateUserDto, RegisterUserDto } from '@/users/dto/create-user.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '@/users/user.interface';
import { RolesModule } from '@/roles/roles.module';
import { RolesService } from '@/roles/roles.service';


@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private roleService: RolesService,
  ) {}

  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ResponseMessage("User Login")
  async handleLogin(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(req.user,response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ResponseMessage("Logout User")
  async logout(@Res({ passthrough: true }) res:Response,@User() user:IUser) {
    return await this.authService.logout(res,user)
  }

  @Post('register')
  @ResponseMessage("Register a new user")
  async register(@Body() dto: RegisterUserDto) {
    const { data, id } = await this.authService.register(dto, "USER");
    return {
      _id: id,
      createdAt: data.createdAt
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('account')
  @ResponseMessage("Get user information")
  async account(@User() user: IUser) {
    const temp = await this.roleService.findOne(user.role._id) as any;
    user.permissions = temp.permissions;
    return user;
  }


  @ResponseMessage("Get User by refresh token")
  @Get('refresh')
  async refresh(
    @Request() req,
    @Res({ passthrough: true }) response: Response,
    @Query('refresh_token') refreshTokenQuery?: string,
  ) {
    // Ưu tiên đọc từ cookie (đã bật cookie-parser), fallback header nếu cần
    const refreshToken =
      req.cookies?.refresh_token ||
      refreshTokenQuery ||
      req.headers['refresh_token'] ||
      req.headers['authorization']?.toString().split(' ')[1];

    if (!refreshToken || refreshToken === 'undefined' || refreshToken === 'null') {
      throw new BadRequestException('Thiếu refresh token');
    }

    return await this.authService.processNewToken(refreshToken as string, response);
  }
}
