import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Employee email',
    type: String,
    maxLength: 50,
    nullable: false,
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  Email: string;

  @ApiProperty({
    description: 'Employee password',
    type: String,
    maxLength: 50,
    nullable: false,
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  Password: string;

  @ApiProperty({
    description: 'Employee full name',
    type: String,
    maxLength: 100,
    nullable: false,
    example: 'Full Name',
  })
  @IsNotEmpty()
  @IsString()
  FullName: string;

  @ApiProperty({
    description: 'Employee birth date',
    type: Date,
    nullable: false,
    example: '2000-01-01',
  })
  @IsNotEmpty()
  @IsString()
  BirthDate: Date;

  @ApiProperty({
    description: 'Employee position ID (foreign key)',
    type: Number,
    nullable: false,
    example: 1,
  })
  @IsNotEmpty()
  @IsString()
  PositionID: number;

  @ApiProperty({
    description: 'Employee residence address',
    type: String,
    maxLength: 255,
    nullable: true,
    example: 'Residence Address',
  })
  @IsNotEmpty()
  @IsString()
  ResidenceAddress: string;

  @ApiProperty({
    description: 'Employee phone number',
    type: String,
    maxLength: 20,
    nullable: true,
    example: 'Phone Number',
  })
  @IsNotEmpty()
  @IsString()
  PhoneNumber: string;
}
