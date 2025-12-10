import { CreateUserDto, RegisterUserDto } from '@/users/dto/create-user.dto';
import { IUser } from '@/users/user.interface';
import { UsersService } from '@/users/users.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }
  
  //kiem tra user co dung khong
  async validateUser(username: string, password: string): Promise<any> {
    //kiem user tren database
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isVild = await this.usersService.isValidPass(password, user.password);
      if (isVild === true) return user;
    }
    return null
  }


  async login(user: IUser, response: Response) {
    if (!user) {
      throw new UnauthorizedException('Không tìm thấy thông tin người dùng, vui lòng kiểm tra lại tài khoản/mật khẩu');
    }
    const { _id, name, email, role } = user;
    const payload = {
      sub: "token login",
      iss: "from server",
      _id, name, email, role
    };

    //create Refresh Token
    const refresh_token = await this.createRefreshToken({ _id, name, email, role });
    
    //update Refresh Token
    await this.usersService.updateUserRefreshToken(refresh_token, _id);

    const refreshExpireRaw = await this.configService.get<string>('JWT_REFRESH_EXPIRE');
    const refreshExpireString = (refreshExpireRaw ?? '1d').trim() as ms.StringValue;
    const refreshMaxAgeMs = ms(refreshExpireString);
    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    response.cookie('refresh_token', refresh_token, {
      maxAge: refreshMaxAgeMs,
      httpOnly: true,
      secure: isProd, // chỉ bật khi deploy HTTPS
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id, name, email, role
      }
    };
  }

  async logout(res:Response,user:IUser) {
    await this.usersService.updateUserRefreshToken("", user._id);
    res.clearCookie('refresh_token');
    return "ok";
  }

  async register(dto: RegisterUserDto, role: string) {
    return await this.usersService.create(dto, role);
  };

  async createRefreshToken(payload: any) {
    return await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') || 'defaultSecret',
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE') as any || '1h',
    })
  }

  async processNewToken(refreshToken: string, response: Response) {
    try {
      await this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET') || 'defaultSecret',
      });

      const user = await this.usersService.findUserByToken(refreshToken);
      if (!user) {
        throw new BadRequestException("Refresh token không hợp lệ. Vui lòng login.");
      }
      const { _id, name, email, role } = user;
      const payload = {
        sub: "token login",
        iss: "from server",
        _id, name, email, role
      };

      //create Refresh Token
      const refresh_token = await this.createRefreshToken({ _id, name, email, role });
    
      //update Refresh Token
      await this.usersService.updateUserRefreshToken(refresh_token, _id.toString());

      const refreshExpireRaw = await this.configService.get<string>('JWT_REFRESH_EXPIRE');
      const refreshExpireString = (refreshExpireRaw ?? '1d').trim() as ms.StringValue;
      const refreshMaxAgeMs = ms(refreshExpireString);
      const isProd = this.configService.get<string>('NODE_ENV') === 'production';

      response.cookie('refresh_token', refresh_token, {
        maxAge: refreshMaxAgeMs,
        httpOnly: true,
        secure: isProd, // chỉ bật khi deploy HTTPS
        sameSite: isProd ? 'none' : 'lax',
        path: '/',
      });

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          _id, name, email, role
        }
      };

    } catch (error) {
      throw new BadRequestException("Refresh token không hợp lệ. Vui lòng login.");
    }
  }
}
