import { User, UserDocument } from '@/users/schemas/user.schema';
import { Permission, PermissionDocument } from '@/permission/schema/permission.schema';
import { Role, RoleDocument } from '@/roles/schema/role.schema';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';
import { UsersService } from '@/users/users.service';

@Injectable()
export class DatabasesService implements OnModuleInit {
  private readonly logger = new Logger(DatabasesService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,
    
    @InjectModel(Role.name)
    private readonly roleModel: SoftDeleteModel<RoleDocument>,
    
    @InjectModel(Permission.name)
    private readonly permissionModel: SoftDeleteModel<PermissionDocument>,

    private configService: ConfigService,
    private userService: UsersService
  ) { }
  

  async onModuleInit() {
    const isInit = this.configService.get<string>("SHOULD_INIT");
    if (Boolean(isInit)) {
      
      const countUser = await this.userModel.countDocuments({});
      const countRole = await this.roleModel.countDocuments({});
      const countPermission = await this.permissionModel.countDocuments({});

      //create permissions
      if (countPermission === 0) {
        await this.permissionModel.insertMany(INIT_PERMISSIONS);
      }

      //create role
      if (countRole === 0) {
        const permissions = await this.permissionModel.find({}).select("_id");
        const permissionIds:any[] = [];
        for (const item of permissions) {
          permissionIds.push(item._id);
        }
        await this.roleModel.insertMany([
          {
            name: ADMIN_ROLE,
            description: "Admin thì full quyền",
            isActive: true,
            permissions: permissionIds
          },
          {
            name: USER_ROLE,
            description: "Người dùng/ Ứng viên sử dụng hệ thống",
            isActive: true,
            permissions: []
          }
        ])
      }

      //create user
      if (countUser === 0) {
        const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE });
        const userRole = await this.roleModel.findOne({ name: USER_ROLE });
        const hashedPassword = await this.userService.hashPassword(this.configService.get<string>("INIT_PASSWORD"));
        await this.userModel.insertMany([
          {
            name: "I'm admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            age: 20,
            gender: "MALE",
            address: "VietNam",
            role: {
              _id: adminRole?._id,
              name: ADMIN_ROLE
            }
          },
          {
            name: "I'm Văn Đạt",
            email: "dat@gmail.com",
            password: hashedPassword,
            age: 20,
            gender: "MALE",
            address: "VietNam",
            role: {
              _id: adminRole?._id,
              name: ADMIN_ROLE
            }
          },
          {
            name: "I'm normal user",
            email: "user@gmail.com",
            password: hashedPassword,
            age: 20,
            gender: "MALE",
            address: "VietNam",
            role: {
              _id: userRole?._id,
              name: USER_ROLE
            }
          },
        ])
      }

      if (countUser > 0 && countRole > 0 && countPermission > 0) {
        this.logger.log(">>> ALREADY INIT SAMPLE DATA ..."); 
      }
    }
  }
}
