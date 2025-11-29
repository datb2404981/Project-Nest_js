import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { SoftDeleteModel } from 'mongoose-delete';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,
  ) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(dto: CreateUserDto) {
    const password = await this.hashPassword(dto.password);

    const created = await this.userModel.create({
      ...dto,
      password,
    });

    const userObj = await this.userModel
      .findOne({ _id: created._id })
      .lean()
      .exec();

    return plainToInstance(User, userObj);
  }

  async findAll() {
    const users = await this.userModel.find().lean().exec();
    return users.map((u) => plainToInstance(User, u));
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).lean().exec();
    
    return (user)? plainToInstance(User, user) :null;
  }

  async update(dto: UpdateUserDto) {
    await this.userModel.updateOne({ _id: dto._id }, dto).exec();
    const updated = await this.userModel.findById(dto._id).lean().exec();
    return plainToInstance(User, updated);
  }

  async remove(id: string) {
    return this.userModel.deleteById(id);
  }

  async findOneByUsername(username: string) { 
    if (!username) return null;
    const user = await this.userModel
      .findOne({ email: username })
      .lean()
      .exec();

    return user ? plainToInstance(User, user) : null;
  }

  async isValidPass(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
