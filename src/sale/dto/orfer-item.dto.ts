import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    description: 'The ID of the supply',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  SupplyID: number;

  @ApiProperty({
    description: 'The quantity of the order item',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  Quantity: number;
}
