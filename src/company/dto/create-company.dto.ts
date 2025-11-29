import { IsNotEmpty } from "class-validator";

export class CreateCompayDto {

  @IsNotEmpty({message:"Name không được để trống",})
  name: string;

  @IsNotEmpty({message:"Address không được để trống",})
  address: string;
  
  description: string;
}
