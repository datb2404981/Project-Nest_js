import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
  @IsNotEmpty({ message: "Permission.name không để trống!" })
  name: string
  
  @IsNotEmpty({ message: "Permission.apiPath không để trống!" })
  apiPath: string
  
  @IsNotEmpty({ message: "Permission.method không để trống!" })
  method: string
  
  @IsNotEmpty({ message: "Permission.module không để trống!" })
  module: string
}
