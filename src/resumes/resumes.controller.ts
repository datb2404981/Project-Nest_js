import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCTDTO } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage, User } from '@/decorator/customize';
import { IUser } from '@/users/user.interface';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  
  @UseGuards(JwtAuthGuard)
  @Post("by-user")
  @ResponseMessage("Create a new resume")
  findOneByUser(@User() user:IUser) {
    return this.resumesService.findOneByUser(user);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @ResponseMessage("Create a new resume")
  create(@Body() createResumeDto: CreateUserCTDTO,@User() user:IUser) {
    return this.resumesService.create(createResumeDto,user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ResponseMessage("Fetch all resumes with paginate")
  findAll(
    @Query('current') currentPage: string,
    @Query('pagesize') pageSize: string,
    @Query() qs: string,
  ) {
    return this.resumesService.findAll(currentPage,pageSize,qs);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ResponseMessage("Fetch a resume by id")
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ResponseMessage("Update status resume")
  updateStatus(@Param('id') id: string, @Body("status") status: string,@User() user : IUser) {
    return this.resumesService.updateStatus(id, status,user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // @ResponseMessage("Update resume")
  // update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto,@User() user : IUser) {
  //   return this.resumesService.update(id, updateResumeDto,user);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ResponseMessage("Delete a resume by id")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id,user);
  }
}
