import { ArrayNotEmpty, IsArray, isArray, IsMongoId, IsNotEmpty } from "class-validator"

export class CreateRoleDto {
  @IsNotEmpty({message:"Role.name không để trống!"})
  name: string
  
  @IsNotEmpty({ message: "Role.name không để trống!" })
  description: string

  @IsNotEmpty({ message: "Role.name không để trống!" })
  isActive: string

  @IsArray({ message: 'permissions phải là mảng' })
  @ArrayNotEmpty({ message: 'permissions không được rỗng' })
  @IsMongoId({ each: true, message: 'Mỗi permission phải là MongoId hợp lệ' })
  permissions: string[];
}
