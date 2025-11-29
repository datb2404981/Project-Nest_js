import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Model } from 'mongoose';
import { CreateCompayDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { SoftDeleteModel } from 'mongoose-delete';
import { IUser } from '@/users/user.interface';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) { };

  async create(createCompayDto: CreateCompayDto,user :IUser) {
    
    const company = await this.companyModel.create({...CreateCompayDto,
      createdBy:{
      id: user._id,
      email: user.email,
      },
    })
    
    return company;
  }

  async findAll() {
    return this.companyModel.find({ isDeleted: false }).exec();
  }

  async findOne(id: string) {
    const company = await this.companyModel.findOne({ _id: id, isDeleted: false }).exec();
    if (!company) {
      throw new NotFoundException(`Không tìm thấy company với id: ${id}`);
    }
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: updateCompanyDto },
      { new: true },
    );

    if (!company) {
      throw new NotFoundException(`Không tìm thấy company với id: ${id}`);
    }

    return company;
  }

  async remove(id: string) {
    const company = await this.companyModel.deleteById(id);
    return company;
  }
}
