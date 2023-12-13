import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateOrderItemDto } from './orfer-item.dto';

export class CreateSaleDto {
  @ApiProperty({
    description: 'The ID of the customer who made the sale',
    example: [
      {
        SupplyID: 1,
        Quantity: 5,
      },
    ],
    required: true,
    type: [CreateOrderItemDto],
  })
  @IsNotEmpty()
  OrderItems: CreateOrderItemDto[];

  @ApiProperty({
    description: 'The email of the customer who made the sale',
    example: 'example@example.com',
    required: false,
  })
  @IsNotEmpty()
  @IsEmail()
  CustomerEmail?: string;
}
