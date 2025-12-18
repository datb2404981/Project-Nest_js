import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from '@/users/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schema/role.schema';
import { SoftDeleteModel } from 'mongoose-delete';
import { NotFoundError } from 'rxjs';
import aqp from 'api-query-params';

@Injectable()
export class RolesService {
  constructor(
  @InjectModel(Role.name)
  private readonly roleModel: SoftDeleteModel<RoleDocument>) { }
  
  async create(createRoleDto: CreateRoleDto, user: IUser) {
    const Role = await this.roleModel.findOne({ name: createRoleDto.name, deleted: { $ne: true } }).exec();
    if (Role) {
      throw new ConflictException("Đã tồn tại Role với Name này rồi");;
    }

    const createRole = await this.roleModel.create({
      ...createRoleDto
      ,createdBy: {
        _id: user._id,
        email: user.email,
      }
    })
    return {
      _id: createRole.id,
      createdAt : createRole.createdAt
    };
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

    const totalItems = await this.roleModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limitNumber);

    const All = await this.roleModel.find(filter)
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


  async findOne(id: string) {
    const role = await this.roleModel.findOne({ _id: id, deleted: { $ne: true } })
      .populate('permissions', 'apiPath name method module')
      .lean()
      .exec();
    
    if (!role) {
      throw new NotFoundException("Vai trò không tồn tại")
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    const role = await this.roleModel.updateOne({ _id: id, deleted: { $ne: true } }
      , {$set: {
          ...updateRoleDto,
          upadateBy: {
            _id: user._id,
            email : user.email,
          }
        }
      })
    
    if (role.matchedCount === 0) {
      throw new NotFoundException("Role không tồn tại!")
    }
    return role;
  }

  async remove(id: string, user: IUser) {
    const role = await this.roleModel.findById(id).exec();
    if (role.name === "ADMIN") {
      throw new BadRequestException("Không thể xóa role ADMIN");
    }

    const deleted = await this.roleModel.deleteById(id, user._id);
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
