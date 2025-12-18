import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateResumeDto, CreateUserCTDTO } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from '@/users/user.interface';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import aqp from 'api-query-params';

@Injectable()
export class ResumesService {
  constructor(
      @InjectModel(Resume.name)
      private readonly resumeModel: SoftDeleteModel<ResumeDocument>) { }

  async create(createResumeDto: CreateUserCTDTO, user: IUser) {
    const historyEntry = {
      status: "PENDING",
      updatedAt: new Date(),
      updatedBy: {
        _id: user._id,
        email: user.email,
      },
    };

    const resume = await this.resumeModel.create({
      url: createResumeDto.url,
      userId: { _id: user._id },
      email: user.email,
      companyId: { _id: createResumeDto.companyId },
      jobId: { _id: createResumeDto.jobId },
      status: "PENDING",
      history: [historyEntry],
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });

    return {
      _id: resume.id,
      createAt: resume.createdAt,
    } ;
  }

  async findAll(currentPage: string, pageSize: string, qs: any) {
    let parsed;
    try {
      parsed = aqp(qs);
    } catch (error) {
      throw new BadRequestException('Query filter phải là JSON hợp lệ');
    }

    const { filter = {}, sort, projection, population } = parsed ?? {};
    delete (filter as any).current;
    delete (filter as any).pageSize;
    delete (filter as any).pagesize;

    const pageNumber = Number.isFinite(+currentPage) && +currentPage > 0 ? +currentPage : 1;
    const limitNumber = Number.isFinite(+pageSize) && +pageSize > 0 ? +pageSize : 10;
    const skip = (pageNumber - 1) * limitNumber;

    const totalItems = await this.resumeModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limitNumber);

    const Allresume = await this.resumeModel.find(filter)
      .skip(skip)
      .limit(limitNumber)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .select(projection)
      .populate('userId', 'email')
      .populate('companyId', 'name')
      .populate('jobId', 'name')
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
      result: Allresume //kết quả query 
    }

    return `This action returns all resumes`;
  }

  async findOne(id: string) {
    const resum = await this.resumeModel.findOne({ _id: id, deleted: { $ne: true } })
      .populate('userId', 'email')
      .populate('companyId', 'name')
      .populate('jobId', 'name')
      .lean().exec()
    
    if (!resum) {
      throw new NotFoundException("Resum không tồn tại!");
    }
    return resum;
  }

  async updateStatus(
  id: string,
  status: string,
  user: { _id: string; email: string },) {
        if (!user || !user._id) {
          throw new UnauthorizedException('User not found');
        }

        const update = await this.resumeModel.updateOne(
          // use mongoose-delete's default flag
          { _id: id, deleted: { $ne: true } },
          {
            $set: {
              status: status,
              updatedBy: user._id,
            },
            $push: {
              history: {
                status: status,
                updatedAt: new Date(),
                updatedBy: {
                  _id: user._id,
                  email: user.email,
                },
              },
            },
          },
        );

        if (update.matchedCount === 0) {
          throw new NotFoundException('Resume không tồn tại!');
        }

        return update;
  }

  async update(id: string, updateResumeDto: UpdateResumeDto, user : IUser) {
    const update = await this.resumeModel.updateOne({ _id: id, deleted: { $ne: true } }, {
      $set: {
        ...updateResumeDto,
        updateBy: {
          _id: user._id,
          email: user.email,
        },
      },
      $push: {
        history: {
          status: updateResumeDto.status,
          updateAt: new Date(),
          updateBy: {
            _id: user._id,
            email: user.email
          }
        }
      }
    })
    if (update.matchedCount == 0) {
      throw new NotFoundException("Resum không tồn tại!");
    }
    return update;
  }

  async remove(id: string, user: IUser) {
    const deleted = await this.resumeModel.deleteById(id, user._id);
    if (deleted.deletedCount == 0) {
      throw new NotFoundException("Resum không tồn tại!");
    }
    
    const deletedCount =
      (deleted as any).deletedCount ?? (deleted as any).modifiedCount ?? (deleted as any).nModified ?? 0;

    return {
      deleted: deletedCount
    }
  }

  async findOneByUser(User : IUser) {
    const resum = await this.resumeModel.findOne({ userId: User._id, deleted: { $ne: true } })
      .sort("-createdAt")
      .populate("companyId", "name")
      .populate("jobId","name")
      .lean().exec()
    
    if (!resum) {
      throw new NotFoundException("Resum không tồn tại!");
    }
    return resum;
  }
}
