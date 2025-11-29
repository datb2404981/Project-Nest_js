import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompayDto } from './dto/create-company.dto';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { User } from '@/decorator/customize';
import { IUser } from '@/users/user.interface';
import { Request } from 'express';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCompayDto: CreateCompayDto, @User() user: IUser) {    
    return this.companyService.create(createCompayDto,user) ;
  }

  @Get()
  async findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
