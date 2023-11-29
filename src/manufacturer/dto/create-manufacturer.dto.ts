import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateManufacturerDto {
  @ApiProperty({
    description: 'The name of the manufacturer',
    default: 'Manufacturer Name',
    maxLength: 50,
    minLength: 3,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  ManufacturerName: string;

  @ApiProperty({
    description: 'The country of the manufacturer',
    default: 'Country',
    maxLength: 50,
    minLength: 3,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  Country: string;
}
