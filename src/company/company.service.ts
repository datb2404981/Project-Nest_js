import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { CreateCompayDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { SoftDeleteModel } from 'mongoose-delete';
import { IUser } from '@/users/user.interface';
import aqp from 'api-query-params';
import { isEmpty } from 'class-validator';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) { }

  async create(createCompayDto: CreateCompayDto, user: IUser) {
    const company = await this.companyModel.create({
      ...createCompayDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    return company;
  }

  async findAll(page: number, limit: number, qs: any) {
    let parsed;
    try {
      parsed = aqp(qs);
    } catch (err) {
      throw new BadRequestException('Query filter phải là JSON hợp lệ, ví dụ filter={"name":"/fpt/i"} hoặc name=/fpt/i');
    }

    const { filter = {}, sort, projection, population } = parsed;
    delete (filter as any).page;
    delete (filter as any).limit;

    const pageNumber = Number.isFinite(+page) && +page > 0 ? +page : 1;
    const limitNumber = Number.isFinite(+limit) && +limit > 0 ? +limit : 10;
    const skip = (pageNumber - 1) * limitNumber;

    const totalItems = await this.companyModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limitNumber);

    const result = await this.companyModel.find(filter)
      .skip(skip)
      .limit(limitNumber)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .select(projection)
      .populate(population)
      .exec();
    
    return {
      meta:
      {
        current: pageNumber, //trang hiện tại 
        pageSize: limitNumber, //số lượng bản ghi đã lấy 
        pages: totalPages, //tổng số trang với điều kiện query 
        total: totalItems // tổng số phần tử (số bản ghi) }, 
      },
      result //kết quả query 
    }
  }

  async findOne(id: string) {
    const company = await this.companyModel.findOne({ _id: id, isDeleted: false }).exec();
    if (!company) {
      throw new NotFoundException(`Không tìm thấy company với id: ${id}`);
    }
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    const company = await this.companyModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        $set: {
          ...updateCompanyDto,
          updateBy: {
            _id: user._id,
            email: user.email,
          },
        },
      },
      { new: true },
    );

    if (!company) {
      throw new NotFoundException(`Không tìm thấy company với id: ${id}`);
    }

    return company;
  }

  async remove(id: string, user: IUser) {
    // mongoose-delete's deleteById second arg expects an ObjectId/string/Document, not a custom object
    return this.companyModel.deleteById(id, user._id);
  }
}
