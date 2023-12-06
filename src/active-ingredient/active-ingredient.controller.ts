import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ActiveIngredientService } from './active-ingredient.service';
import { CreateActiveIngredientDto } from './dto/create-active-ingredient.dto';
import { UpdateActiveIngredientDto } from './dto/update-active-ingredient.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('active-ingredient')
@Controller('active-ingredient')
export class ActiveIngredientController {
  constructor(
    private readonly activeIngredientService: ActiveIngredientService,
  ) {}

  @Post()
  create(@Body() createActiveIngredientDto: CreateActiveIngredientDto) {
    if (parseInt(createActiveIngredientDto.Dosage) < 0)
      throw new BadRequestException('Dosage must be positive');

    return this.activeIngredientService.create(createActiveIngredientDto);
  }

  @Get()
  findAll() {
    return this.activeIngredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activeIngredientService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActiveIngredientDto: UpdateActiveIngredientDto,
  ) {
    return this.activeIngredientService.update(+id, updateActiveIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activeIngredientService.remove(+id);
  }
}
