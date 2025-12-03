import { Exclude, Expose, Transform, Type } from 'class-transformer';

class CompanyResponse {
  @Expose()
  @Transform(({ value }) => value.toString())   // ⭐ value chính là ObjectId
  _id: string;
}

export class UserResponse {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id: string;
  @Exclude()
  password: string;

  @Expose()
  @Type(() => CompanyResponse)
  company: CompanyResponse;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  deletedBy: string;

  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  upadateBy: string;
  
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  createdBy: string;
}