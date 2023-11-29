import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDosageFormDto {
  @ApiProperty({
    description: 'The name of the dosage form',
    default: 'Dosage Form Name',
    maxLength: 50,
    minLength: 3,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  FormName: string;

  @ApiProperty({
    description: 'The unit of the dosage form',
    default: 'Unit',
    maxLength: 50,
    minLength: 3,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  Unit: string;
}
