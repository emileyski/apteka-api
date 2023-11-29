import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DosageFormService } from './dosage-form.service';
import { CreateDosageFormDto } from './dto/create-dosage-form.dto';
import { UpdateDosageFormDto } from './dto/update-dosage-form.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dosage-form')
@Controller('dosage-form')
export class DosageFormController {
  constructor(private readonly dosageFormService: DosageFormService) {}

  @Post()
  create(@Body() createDosageFormDto: CreateDosageFormDto) {
    return this.dosageFormService.create(createDosageFormDto);
  }

  @Get()
  findAll() {
    return this.dosageFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dosageFormService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDosageFormDto: UpdateDosageFormDto,
  ) {
    return this.dosageFormService.update(+id, updateDosageFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dosageFormService.remove(+id);
  }
}
