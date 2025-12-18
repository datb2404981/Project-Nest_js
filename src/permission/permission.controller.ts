import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { IUser } from '@/users/user.interface';
import { ResponseMessage, User } from '@/decorator/customize';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ResponseMessage("Create a new permission")
  create(@Body() createPermissionDto: CreatePermissionDto,@User() user :IUser) {
    return this.permissionService.create(createPermissionDto,user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ResponseMessage("Fetch permission with paginate")
  findAll(
    @Query("current") currentPage : number,
    @Query("pageSize") limits: number,
    @Query("") qs: string,
  ) {
    return this.permissionService.findAll(currentPage, limits,qs);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ResponseMessage("Fetch Permission by ID")
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ResponseMessage("Update a permission")
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto,@User() user:IUser) {
    return this.permissionService.update(id, updatePermissionDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ResponseMessage("Delete a permission")
  remove(@Param('id') id: string,@User() user:IUser) {
    return this.permissionService.remove(id,user);
  }
}
