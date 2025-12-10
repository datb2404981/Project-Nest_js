import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ResponseMessage, User } from '@/decorator/customize';
import { IUser } from '@/users/user.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Create a new job")
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ResponseMessage("Fetch jobs with pagination")
  findAll(
    @Query('current') currentPage: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('pagesize') pageSizeLower: string,
    @Query('limit') limitQuery: string,
    @Query() qs: Record<string, any>,) {
    
    const limit = pageSize ?? pageSizeLower ?? limitQuery;
    const pageParam = currentPage ?? page;

    return this.jobsService.findAll(pageParam,limit,qs);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ResponseMessage("Fetch a job by id")
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ResponseMessage("Update a job")
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @User() user: IUser) {
    return this.jobsService.update(id, updateJobDto,user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ResponseMessage("Delete a job")
  remove(@Param('id') id: string,@User() user : IUser) {
    return this.jobsService.remove(id,user);
  }
}
