import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ActiveIngredientService } from './active-ingredient.service';
import { CreateActiveIngredientDto } from './dto/create-active-ingredient.dto';
import { UpdateActiveIngredientDto } from './dto/update-active-ingredient.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/core/enums/roles.enum';
import { AccessTokenGuard } from 'src/core/guards/access-token.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { Role } from 'src/core/decorators/role.decorator';

@ApiNotFoundResponse({
  description: 'Active ingredient with the specified ID was not found',
})
@ApiCreatedResponse({ description: 'Active ingredient created' })
@ApiUnauthorizedResponse({
  description: 'Unauthorized, you must provide access token',
})
@ApiForbiddenResponse({
  description: 'Forbidden, you must be admin to access this resource',
})
@ApiTags('active-ingredient')
@Controller('active-ingredient')
export class ActiveIngredientController {
  constructor(
    private readonly activeIngredientService: ActiveIngredientService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Post()
  create(@Body() createActiveIngredientDto: CreateActiveIngredientDto) {
    return this.activeIngredientService.create(createActiveIngredientDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.activeIngredientService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activeIngredientService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActiveIngredientDto: UpdateActiveIngredientDto,
  ) {
    return this.activeIngredientService.update(+id, updateActiveIngredientDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activeIngredientService.remove(+id);
  }
}
