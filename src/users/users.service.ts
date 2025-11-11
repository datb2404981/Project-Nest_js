import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) { }
  
async hasdpassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email;
    const password = await this.hasdpassword(createUserDto.password);
    const name = createUserDto.name;
    let user = await this.UserModel.create({ email, password, name });
    return user;
  }

  async findAll() {
    const users = await this.UserModel.find().exec();
    if (!users) {
      throw new NotFoundException("Users not found");
    }
    return users;
  }

async findOne(id: string):Promise <User | null>  {
  try {
    const user = await this.UserModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  } catch (error) {
    throw new BadRequestException('Invalid ID format');
  }
}

async update( updateUserDto: UpdateUserDto) {
    return await this.UserModel.updateOne({_id: updateUserDto._id}, {...updateUserDto}).exec();
  }

async remove(id: string) {
    return await this.UserModel.deleteOne({_id:id});
}
  
async findOneByUsername(username : string): Promise<User | null> {
  try {
    const user = await this.UserModel.findOne({email : username}).exec();
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  } catch (error) {
    throw new BadRequestException('Invalid ID format');
  }
}
  
  async isValidPass(password: string,hash:string) {
    return bcrypt.compare(password, hash);
  }
}

