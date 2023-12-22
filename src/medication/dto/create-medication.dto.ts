import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateMedicationDto {
  @ApiProperty({
    description: 'The name of the medication',
    default: 'Medication Name',
    maxLength: 50,
    minLength: 3,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  TradeName: string;

  @ApiProperty({
    description: 'The packaging quantity of the medication',
    default: 10,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  PackagingQuantity: number;

  @ApiProperty({
    description: "The manufacturer's ID",
    default: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  ManufacturerID: number;

  @ApiProperty({
    description: 'The active ingredient ID',
    default: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  ActiveIngredientID: number;

  @ApiProperty({
    description: 'The dosage form ID',
    default: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  DosageFormID: number;

  @ApiProperty({
    description: 'The category ID',
    default: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  CategoryID: number;

  @ApiProperty({
    description: 'The active ingredient dosage',
    default: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  ActiveIngredientDosage: number;
}
