import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SupplyService } from './supply.service';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('supply')
@Controller('supply')
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

  @Post()
  create(@Body() createSupplyDto: CreateSupplyDto) {
    return this.supplyService.create(createSupplyDto);
  }

  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by medication name',
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
    description: 'Filter by minimum price',
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    description: 'Filter by maximum price',
  })
  @ApiQuery({
    name: 'minQuantity',
    required: false,
    description: 'Filter by minimum quantity',
  })
  @ApiQuery({
    name: 'maxQuantity',
    required: false,
    description: 'Filter by maximum quantity',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    description: 'Order by column:order',
  })
  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('minQuantity') minQuantity?: number,
    @Query('maxQuantity') maxQuantity?: number,
    @Query('orderBy') orderBy?: string,
  ) {
    return this.supplyService.findAll(
      name,
      minPrice,
      maxPrice,
      minQuantity,
      maxQuantity,
      orderBy,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplyDto: UpdateSupplyDto) {
    return this.supplyService.update(+id, updateSupplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplyService.remove(+id);
  }
}
