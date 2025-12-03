import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { IsEmail, isMongoId, IsMongoId, IsNumber, IsOptional, IsString, isString, Min, ValidateNested } from 'class-validator';

class Company{
  @IsMongoId()
  _id: mongoose.Types.ObjectId;
  
  @IsOptional()
  @IsString()
  name: string;
}

export class UpdateUserDto {
  @IsMongoId()
  _id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  age?: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @ValidateNested()
  @Type(()=>Company)
  company?: Company;
}
