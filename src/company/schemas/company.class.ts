import { Exclude, Expose, Transform } from 'class-transformer';

export class CompanyResponse {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())  // ⭐ Convert ObjectId → string
  _id: string;
  name: string;
}