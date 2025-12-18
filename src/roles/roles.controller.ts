import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage, User } from '@/decorator/customize';
import { IUser } from '@/users/user.interface';
import { UsersService } from '@/users/users.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ResponseMessage("Create a new role")
  create(@Body() createRoleDto: CreateRoleDto,@User() user :IUser ) {
    return this.rolesService.create(createRoleDto,user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ResponseMessage("Fetch Role with paginate")
  findAll(
      @Query("current") currentPage : number,
      @Query("pageSize") limits: number,
      @Query("") qs: string,
    ) {
      return this.rolesService.findAll(currentPage, limits,qs);
    }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ResponseMessage("Fetch Role by ID")
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ResponseMessage("Update a role")
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto,@User() user: IUser) {
    return this.rolesService.update(id, updateRoleDto,user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ResponseMessage("Delete a Role")
  remove(@Param('id') id: string,@User() user:IUser) {
    return this.rolesService.remove(id,user);
  }
}
