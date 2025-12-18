import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { IsArray, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdatedBy{
  @IsNotEmpty()
  _id: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

class History{
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  updatedAt: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => UpdatedBy)
  updateBy :  UpdatedBy
}

export class UpdateResumeDto extends PartialType(CreateResumeDto) {

  @IsNotEmpty({ message: "History không được để trống" })
  @IsArray({ message: "History có định dạng là array" })
  @ValidateNested()
  @Type(()=> History)
  history: History[];
}
