import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOrderItemDto } from './orfer-item.dto';

export class CreateSaleDto {
  // @ApiProperty({
  //   description: 'The ID of the employee who made the sale',
  //   example: 1,
  //   required: true,
  // })
  // @IsNotEmpty()
  // @IsNumber()
  // EmployeeID: number;

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
}
