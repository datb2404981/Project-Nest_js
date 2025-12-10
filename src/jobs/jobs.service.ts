import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './schema/job.schema';
import { SoftDeleteModel } from 'mongoose-delete';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '@/users/user.interface';
import aqp from 'api-query-params';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name)
    private readonly jobModel: SoftDeleteModel<JobDocument>) { }
  
  
  async create(createJobDto: CreateJobDto) {
    const job = await this.jobModel.create({...createJobDto})
    return {
      _id: job.id.toString(),
      createAt: job.createdAt
    };
  }

  async findAll(page: string, limit: string, qs: Record<string, any>) {
    let parsed;
    try {
      parsed = aqp(qs);
    } catch (err) {
      throw new BadRequestException('Query filter phải là JSON hợp lệ, ví dụ filter={"name":"/fpt/i"} hoặc name=/fpt/i');
    }

    const { filter = {}, sort, projection, population } = parsed;
    delete (filter as any).current;
    delete (filter as any).page;
    delete (filter as any).pageSize;
    delete (filter as any).pagesize;
    delete (filter as any).limit;

    const pageNumber = Number.isFinite(+page) && +page > 0 ? +page : 1;
    const limitNumber = Number.isFinite(+limit) && +limit > 0 ? +limit : 10;
    const skip = (pageNumber - 1) * limitNumber;

    const totalItems = await this.jobModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limitNumber);

    const Alljob = await this.jobModel.find(filter)
      .skip(skip)
      .limit(limitNumber)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .select(projection)
      .populate(population)
      .lean()
      .exec();
    

    
    return {
      meta:
      {
        current: pageNumber, //trang hiện tại 
        pageSize: limitNumber, //số lượng bản ghi đã lấy 
        pages: totalPages, //tổng số trang với điều kiện query 
        total: totalItems // tổng số phần tử (số bản ghi) }, 
      },
      result: Alljob //kết quả query 
    }
  }

  async findOne(id: string) {
    const job = await this.jobModel.findOne({ _id: id, deleted: false })
    .populate('createdBy','company')
    .lean()
    .exec();
    
    if (!job) {
      throw new NotFoundException("Job không tồn tại!");
    }
    
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto, user :IUser) {
    const job = await this.jobModel.findOne({_id: id, deleted: false});
    if (!job) {
      throw new NotFoundException("Job không tồn tại!");
    }

    const update = this.jobModel.updateOne({ _id: id, deleted: false }, {
      $set: {
        ...updateJobDto,
          updateBy: {
            _id: user._id,
            email: user.email,
          },
      }
    })
    return update;
  }

  async remove(id: string, user :IUser) {
    const job = await this.jobModel.findOne({ _id: id, deleted: false });
    if (!job) {
      throw new NotFoundException("Job không tồn tại!");
    }

    const deleted = await this.jobModel.deleteById(id, user._id);
    
    const deletedCount =
      (deleted as any).deletedCount ?? (deleted as any).modifiedCount ?? (deleted as any).nModified ?? 0;

    return {
      deleted:deletedCount > 0 ? 1 : 0,
  }
  }
}
