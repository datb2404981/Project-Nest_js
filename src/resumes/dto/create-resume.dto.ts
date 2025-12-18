import { IsEmail, IsMongoId, isNotEmpty, IsNotEmpty, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateResumeDto {

  @IsNotEmpty({message:"Email không được để trống!"})
  @IsEmail()
  email: string
  
  @IsNotEmpty({message:"Id.User không được để trống"})
    userId:  Types.ObjectId 
  
  @IsNotEmpty({ message: "URL không được để trống" })
  @IsString()
  url: string
  
  @IsNotEmpty({ message: "Status không được để trống" })
  @IsString()
  status: string
    
  @IsNotEmpty({message:"Id.company không được để trống"})
  companyId: Types.ObjectId 
    
  @IsNotEmpty({message:"Id.job không được để trống"})
  jobId: Types.ObjectId 
}

export class CreateUserCTDTO{
@IsNotEmpty({ message: "URL không được để trống" })
  @IsString()
  url: string
    
  @IsNotEmpty({ message: "Id.company không được để trống" })
  @IsMongoId({ message: "companyId is a mog id}" })
  companyId: Types.ObjectId 
    
  @IsNotEmpty({ message: "Id.job không được để trống" })
  @IsMongoId({ message: "companyId is a mog id}" })
  jobId: Types.ObjectId 
}