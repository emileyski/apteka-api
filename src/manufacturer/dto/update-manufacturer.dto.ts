import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateManufacturerDto {
  @ApiProperty({
    description: 'The name of the manufacturer',
    default: 'Manufacturer Name',
    maxLength: 50,
    minLength: 3,
    type: String,
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  ManufacturerName?: string;

  @ApiProperty({
    description: 'The country of the manufacturer',
    default: 'Country',
    maxLength: 50,
    minLength: 3,
    type: String,
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  Country?: string;
}
