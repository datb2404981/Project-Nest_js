import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage, User } from '@/decorator/customize';
import { IUser } from './user.interface';

@UseInterceptors(ClassSerializerInterceptor)
  @Controller('users')
  
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Create a new User")
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { data, id } = await this.usersService.create(createUserDto,createUserDto.role);
    return {
      _id: id,
      createdAt: data.createdAt
    };
  }

  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Fetch user with paginate")
  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') pageSize: string,
    @Query('pagesize') pageSizeLower: string,
    @Query() qs: string,
  ) {
    const limit = pageSize ?? pageSizeLower;
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Fetch user by id")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Update a User")
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @User() user:IUser) {
    return this.usersService.update(updateUserDto,user);
  }

  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Delete a User")
  @Delete(':id')
  remove(@Param('id') id: string,@User() user:IUser) {
    return this.usersService.remove(id,user);
  }
}
