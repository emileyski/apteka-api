import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePositionDto {
  @ApiProperty({
    description: 'The name of the position',
    default: 'Position Name',
    maxLength: 50,
    minLength: 3,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  PositionName: string;
}
