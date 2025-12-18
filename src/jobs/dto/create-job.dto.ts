import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class CompanyDto {
  @IsNotEmpty({ message: "Company._id không được để trống" })
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty({ message: "Company.name không được để trống" })
  name: string;

  @IsNotEmpty({ message: "Company.logo không được để trống" })
  logo: string; 
}

export class CreateJobDto {
  @IsNotEmpty({ message: "Name job không được để trống" })
  @IsString()
  name: string;

  @IsNotEmpty({ message: "Skill job không được để trống" })
  @IsArray()
  @IsString({ each: true })
  skills: string[];
  
  @IsNotEmptyObject({ nullable: false })
  @IsObject()
  @ValidateNested()
  @Type(() => CompanyDto)
  company!: CompanyDto;

  @IsNotEmpty({ message: "Lacation job không được để trống" })
  @IsString()
  location: string;

  @IsNotEmpty({ message: "Salary job không được để trống" })
  @IsNumber()
  salary: number;

  @IsNotEmpty({ message: "Quantity job không được để trống" })
  @IsNumber()
  quantity: number;

  @IsNotEmpty({ message: "Level job không được để trống" })
  @IsString()
  level: string;

  @IsNotEmpty({ message: "Description job không được để trống" })
  @IsString()
  description: string;
}
