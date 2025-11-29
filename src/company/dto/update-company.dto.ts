import { PartialType } from '@nestjs/mapped-types';
import { CreateCompayDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompayDto) {}
