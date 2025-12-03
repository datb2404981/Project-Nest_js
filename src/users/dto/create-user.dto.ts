import { IsEmail, isNotEmpty, IsNotEmpty, IsNotEmptyObject, IsNumber, isNumber, IsObject, IsString, MIN, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';


export class RegisterUserDto {
  @IsNotEmpty({ message: "Name không được để trống", })
  @IsString()
  name: string;

  @IsEmail({},{message:"Email không đúng định dạng",})
  @IsNotEmpty({message:"Email không được để trống",})
  email: string;

  @IsNotEmpty({ message: "Password không được để trống", })
  @IsString()
  password: string;


  @IsNotEmpty({ message: "Age không được để trống", })
  @IsNumber()
  @Min(1)
  age: number;

  @IsNotEmpty({ message: "Gender không được để trống", })
  @IsString()
  gender: string;

  @IsNotEmpty({message:"Address không được để trống",})
  address: number;
}

class CompanyDto {
  @IsNotEmpty({ message: "Company._id không được để trống" })
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty({ message: "Company.name không được để trống" })
  name: string;
}

export class CreateUserDto {
  @IsNotEmpty({ message: "Name không được để trống", })
  @IsString()
  name: string;

  @IsEmail({},{message:"Email không đúng định dạng",})
  @IsNotEmpty({message:"Email không được để trống",})
  email: string;

  @IsNotEmpty({ message: "Password không được để trống", })
  @IsString()
  password: string;

  @IsNotEmpty({ message: "Age không được để trống", })
  @IsNumber()
  @Min(1)
  age: number;

  @IsNotEmpty({ message: "Gender không được để trống", })
  @IsString()
  gender: string;

  @IsNotEmpty({ message: "Address không được để trống", })
  @IsString()
  address: string;

  @IsNotEmpty({ message: "Role không được để trống", })
  @IsString()
  role: string;

  @IsNotEmptyObject({ nullable: false })
  @IsObject()
  @ValidateNested()
  @Type(() => CompanyDto)
  company!: CompanyDto;
}
