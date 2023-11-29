import { PartialType } from '@nestjs/mapped-types';
import { CreateDosageFormDto } from './create-dosage-form.dto';

export class UpdateDosageFormDto extends PartialType(CreateDosageFormDto) {}
