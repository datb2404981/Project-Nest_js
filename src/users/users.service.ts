import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { SoftDeleteModel } from 'mongoose-delete';
import { UserResponse } from './schemas/user.class';
import { IUser } from './user.interface';
import aqp from 'api-query-params';

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

  async create(dto: CreateUserDto | RegisterUserDto, role: string) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (user) {
      throw new ConflictException("Tài khoản đã tồn tại");
    }
    const password = await this.hashPassword(dto.password);

    const created = await this.userModel.create({
      ...dto,
      password,
    });

    const userObj = await this.userModel
      .findOne({ _id: created._id })
      .lean()
      .exec();

    return {
      id: created._id.toString(),
      data: plainToInstance(UserResponse, userObj),
  };
  }

  async findAll(page: number, limit: number, qs: any) {
    let parsed;
    try {
      parsed = aqp(qs);
    } catch (err) {
      throw new BadRequestException('Query filter phải là JSON hợp lệ, ví dụ filter={"name":"/fpt/i"} hoặc name=/fpt/i');
    }
    const { filter = {}, sort, projection, population } = parsed;
    delete (filter as any).current;
    delete (filter as any).pageSize;
    delete (filter as any).pagesize;

    const pageNumber = Number.isFinite(+page) && +page > 0 ? +page : 1;
    const limitNumber = Number.isFinite(+limit) && +limit > 0 ? +limit : 10;
    const skip = (pageNumber - 1) * limitNumber;

    const totalItems = await this.userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limitNumber);

    const Alluser = await this.userModel.find(filter)
      .skip(skip)
      .limit(limitNumber)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .select(projection)
      .populate(population)
      .lean()
      .exec();
    
    const result = plainToInstance(UserResponse, Alluser);
    
    return {
      meta:
      {
        current: pageNumber, //trang hiện tại 
        pageSize: limitNumber, //số lượng bản ghi đã lấy 
        pages: totalPages, //tổng số trang với điều kiện query 
        total: totalItems // tổng số phần tử (số bản ghi) }, 
      },
      result //kết quả query 
    }
  }

  async findOne(id: string) {
    const user = await this.userModel
      .findOne({ _id: id, deleted: { $ne: true } })
      .populate('company')
      .lean()
      .exec();

    if (!user) {
      throw new NotFoundException("Tài khoản không tồn tại");
    }

    return plainToInstance(UserResponse, user, { excludeExtraneousValues: false });
  }

  async update(dto: UpdateUserDto, user: IUser) {
    const userUpdate = await this.userModel.findById(dto._id);
    if (!user) {
      throw new NotFoundException("Tài khoản không tồn tại");
    }

    const updated = await this.userModel.updateOne(
      { _id: dto._id, deleted: false },
      {
        $set: {
          ...dto,
          updateBy: {
            _id: user._id,
            email: user.email,
          },
        }
      }
    ).exec();

    return updated;
  }

  async remove(id: string, user: IUser) {
    const userDelete = await this.userModel.findOne({ _id: id, deleted: false });
    if (!userDelete) {
      throw new NotFoundException("User không tồn tại hoặc đã bị xóa.");
    }

    const deleted = await this.userModel.deleteById(id, user._id); // hoặc delete({ _id: id }, user._id)
    const deletedCount =
      (deleted as any).deletedCount ?? (deleted as any).modifiedCount ?? (deleted as any).nModified ?? 0;

    return {
      deleted:deletedCount > 0 ? 1 : 0,
  }
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

  async updateUserRefreshToken(refreshToken: string, _id: string) {
    return await this.userModel
      .updateOne({ _id }, { $set: { refreshToken } })
      .exec();
  }

  async findUserByToken(refreshToken: string) {
    const user = await this.userModel
      .findOne({ refreshToken })
      .select("-password")
      .lean()
      .exec();
    
    return user;
  }
}
