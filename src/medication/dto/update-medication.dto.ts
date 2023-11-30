import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMedicationDto {
  @ApiProperty({
    description: 'The name of the medication',
    default: 'Medication Name',
    maxLength: 50,
    minLength: 3,
    type: String,
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  TradeName?: string;

  @ApiProperty({
    description: 'The packaging quantity of the medication',
    default: 10,
    type: Number,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  PackagingQuantity?: number;

  @ApiProperty({
    description: "The manufacturer's ID",
    default: 1,
    type: Number,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  ManufacturerID?: number;

  @ApiProperty({
    description: 'The active ingredient ID',
    default: 1,
    type: Number,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  ActiveIngredientID?: number;

  @ApiProperty({
    description: 'The dosage form ID',
    default: 1,
    type: Number,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  DosageFormID?: number;

  @ApiProperty({
    description: 'The category ID',
    default: 1,
    type: Number,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  CategoryID?: number;
}
