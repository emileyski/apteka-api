import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActiveIngredientDto {
  @ApiProperty({
    description: 'Name of the active ingredient',
    type: String,
    maxLength: 100,
    required: true,
    example: 'Paracetamol',
  })
  @IsNotEmpty()
  @IsString()
  IngredientName: string;

  //TODO: decide if we need this (we can get it from medication)
  // @ApiProperty({
  //   description: 'Dosage of the active ingredient',
  //   type: String,
  //   maxLength: 50,
  //   required: true,
  //   example: '500mg',
  // })
  // @IsNotEmpty()
  // @IsString()
  // Dosage: string;
}
