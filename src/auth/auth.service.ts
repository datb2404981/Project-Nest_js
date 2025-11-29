import { IUser } from '@/users/user.interface';
import { UsersService } from '@/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) { }
  
  //kiem tra user co dung khong
  async validateUser(username: string, password: string):Promise<any> {
    //kiem user tren database
  const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isVild = await this.usersService.isValidPass(password, user.password);
      if (isVild === true) return user;
    }
    return null
  }
  async login(user: IUser) {
    if (!user) {
      throw new UnauthorizedException('Không tìm thấy thông tin người dùng, vui lòng kiểm tra lại tài khoản/mật khẩu');
    }
    const { _id, name, email, role } = user;
    const payload = {
      sub: "token login",
      iss: "from server",
      _id, name, email, role
    };
    return {
      access_token: this.jwtService.sign(payload),_id,name,email,role
    };
  }

  logout(req: any) {
    req.logout((err: any) => {
      if (err) {
        throw new UnauthorizedException('Logout failed :', err);
      }
    });
    return { message: '✅ Logged out successfully' };
  }
}
