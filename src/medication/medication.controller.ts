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
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('medication')
@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.create(createMedicationDto);
  }

  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by medication name',
  })
  @ApiQuery({
    name: 'withSupplies',
    required: false,
    description: 'Include supplies',
  })
  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('withSupplies') withSupplies?: string,
  ) {
    return this.medicationService.findAll(name, withSupplies);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationService.findOne(+id);
  }

  @Get(':id/supplies')
  findOneWithSupplies(@Param('id') id: string) {
    return this.medicationService.findOneWithSupplies(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicationDto: UpdateMedicationDto,
  ) {
    return this.medicationService.update(+id, updateMedicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationService.remove(+id);
  }
}
