import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateActiveIngredientDto {
  @ApiProperty({
    description: 'Name of the active ingredient',
    type: String,
    maxLength: 100,
    required: false,
    example: 'Paracetamol',
  })
  @IsNotEmpty()
  @IsString()
  IngredientName?: string;

  @ApiProperty({
    description: 'Dosage of the active ingredient',
    type: String,
    maxLength: 50,
    required: false,
    example: '500mg',
  })
  @IsNotEmpty()
  @IsString()
  Dosage?: string;
}
