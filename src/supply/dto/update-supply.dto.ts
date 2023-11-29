import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSupplyDto {
  @ApiProperty({
    description: 'The quantity of the supply',
    default: 10,
    type: Number,
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  Quantity?: number;

  @ApiProperty({
    description: 'The expiry date of the supply',
    default: '2021-01-01',
    type: Date,
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  ExpiryDate?: Date;

  @ApiProperty({
    description: 'The unit price of the supply',
    default: 10.0,
    type: Number,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  UnitPrice?: number;
}
