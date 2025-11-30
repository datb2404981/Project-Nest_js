import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompayDto } from './dto/create-company.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ResponseMessage, User } from '@/decorator/customize';
import { IUser } from '@/users/user.interface';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCompayDto: CreateCompayDto, @User() user: IUser) {
    return this.companyService.create(createCompayDto, user);
  }

  @Get()
  @ResponseMessage("Fetch list company with paginate")
  async findAll(
    @Query("page") currentPage: string,
    @Query("limit") limit: string,
    @Query() qs:string) {
    return this.companyService.findAll(+currentPage,+limit,qs);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @User() user: IUser) {
    return this.companyService.update(id, updateCompanyDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @User() user: IUser) {
    return this.companyService.remove(id, user);
  }
}
