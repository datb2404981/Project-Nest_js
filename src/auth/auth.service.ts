import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }
  
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
}
