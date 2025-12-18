import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IUser } from '@/users/user.interface';
import { Permission, PermissionDocument } from './schema/permission.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import aqp from 'api-query-params';

@Injectable()
export class PermissionService {
  constructor(
      @InjectModel(Permission.name)
      private readonly permissionModel: SoftDeleteModel<PermissionDocument>,
  ) { }
  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    const permission = await this.permissionModel.findOne({ apiPath: createPermissionDto.apiPath, method: createPermissionDto.method })
    
    if (permission) {
      throw new ConflictException("Permisstion đã tồn tại!");
    }
    const CreatePermission = await this.permissionModel.create({
      ...createPermissionDto,
      createBy:{
      _id: user._id,
      email: user.email,
      }
    })

    return {
      _id: CreatePermission.id,
      createAt: CreatePermission.createdAt
    }
  }

  async findAll(currentPage: number, limits: number, qs: string) {
    let parsed;
    try {
      parsed = aqp(qs);
    } catch (error) {
      throw new BadRequestException('Query filter phải là JSON hợp lệ');
    }

    const { filter = {}, sort, projection, population } = parsed ?? {};
    delete (filter as any).current;
    delete (filter as any).pageSize;

    const pageNumber = Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1;
    const limitNumber = Number.isFinite(limits) && limits > 0 ? limits : 1;
    const skip = (pageNumber - 1) * limitNumber;

    const totalItems = await this.permissionModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limitNumber);

    const All = await this.permissionModel.find(filter)
      .skip(skip)
      .limit(limitNumber)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .lean()
      .exec();
    
    return {
      meta:
      {
        current: pageNumber, //trang hiện tại 
        pageSize: limitNumber, //số lượng bản ghi đã lấy 
        pages: totalPages, //tổng số trang với điều kiện query 
        total: totalItems // tổng số phần tử (số bản ghi) }, 
      },
      result: All //kết quả query 
    };
  }

  async findOne(id: String) {
    const permission = await this.permissionModel.findOne({ _id: id, deleted: { $ne: true } }).exec();
    if (!permission) {
      throw new NotFoundException("permission không tồn tại")
    }

    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
    const update = await this.permissionModel.updateOne({ _id: id, deleted : { $ne: true } },
      {$set: {
        ...updatePermissionDto,
        upadateBy: {
          _id: user._id,
          email : user.email
        }
      }}
    )
    if (update.matchedCount === 0) {
      throw new NotFoundException("permission không tồn tại")
    }
    return update;
  }

  async remove(id: string, user: IUser) {
    const deleted = await this.permissionModel.deleteById(id, user._id);
    if (deleted.deletedCount === 0) {
      throw new NotFoundException("Permission không tồn tại!");
    }
    
    const deletedCount =
      (deleted as any).deletedCount ?? (deleted as any).modifiedCount ?? (deleted as any).nModified ?? 0;

    return {
      deleted: deletedCount
    }
  }
}
