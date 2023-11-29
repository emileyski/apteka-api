import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    default: 'Category Name',
    maxLength: 50,
    minLength: 3,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  CategoryName: string;
}
