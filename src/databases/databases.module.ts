import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { DatabasesController } from './databases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/users/schemas/user.schema';
import { Permission, PermissionSchema } from '@/permission/schema/permission.schema';
import { Role, RoleSchema } from '@/roles/schema/role.schema';
import { UsersModule } from '@/users/users.module';

@Module({
  controllers: [DatabasesController],
  providers: [DatabasesService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    UsersModule,
  ],
})
export class DatabasesModule {}
