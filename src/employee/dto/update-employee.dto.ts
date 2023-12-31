import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @ApiProperty({
    description: 'Employee login',
    type: String,
    maxLength: 50,
    nullable: false,
    required: false,
    example: 'login',
  })
  @IsNotEmpty()
  @IsString()
  Login?: string;

  @ApiProperty({
    description: 'Employee password',
    type: String,
    maxLength: 50,
    nullable: false,
    required: false,
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  Password?: string;

  @ApiProperty({
    description: 'Employee full name',
    type: String,
    maxLength: 100,
    nullable: false,
    required: false,
    example: 'Full Name',
  })
  @IsNotEmpty()
  @IsString()
  FullName?: string;

  @ApiProperty({
    description: 'Employee birth date',
    type: Date,
    nullable: false,
    required: false,
    example: '2000-01-01',
  })
  @IsNotEmpty()
  @IsString()
  BirthDate?: Date;

  @ApiProperty({
    description: 'Employee residence address',
    type: String,
    maxLength: 255,
    nullable: true,
    required: false,
    example: 'Residence Address',
  })
  @IsNotEmpty()
  @IsString()
  ResidenceAddress?: string;

  @ApiProperty({
    description: 'Employee phone number',
    type: String,
    maxLength: 20,
    nullable: true,
    required: false,
    example: 'Phone Number',
  })
  @IsNotEmpty()
  @IsString()
  PhoneNumber?: string;
}
