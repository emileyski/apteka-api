import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SqlQueryDto {
  @ApiProperty({
    description: 'SQL query',
    example: 'SELECT * FROM active_ingredient',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  query: string;
}
