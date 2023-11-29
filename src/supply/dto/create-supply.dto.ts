import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSupplyDto {
  @ApiProperty({
    description: 'The quantity of the supply',
    default: 10,
    type: Number,
  })
  @IsNotEmpty()
  @IsString()
  Quantity: number;

  @ApiProperty({
    description: 'The expiry date of the supply',
    default: '2021-01-01',
    type: Date,
  })
  @IsNotEmpty()
  @IsString()
  ExpiryDate: Date;

  @ApiProperty({
    description: 'The unit price of the supply',
    default: 10.0,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  UnitPrice: number;

  @ApiProperty({
    description: 'The medication ID',
    default: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  MedicationID: number;
}
