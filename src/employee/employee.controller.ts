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
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/core/guards/access-token.guard';
import { UserId } from 'src/core/decorators/user-id.decorator';
import { RoleGuard } from 'src/core/guards/role.guard';
import { Role } from 'src/core/decorators/role.decorator';
import { Roles } from 'src/core/enums/roles.enum';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('insert-default-admin')
  async createDefaultAdmin() {
    const adminCredentials: CreateEmployeeDto = {
      BirthDate: new Date(),
      Email: 'admin@admin.com',
      FullName: 'Admin',
      Password: 'admin',
      PhoneNumber: '380935558877',
      PositionID: 1,
      ResidenceAddress: 'Kharkiv, Nauky Ave 14',
    };

    await this.employeeService.create(adminCredentials);
    return { message: 'admin succesfully created' };
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized, you must provide access token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, you must be admin to access this resource',
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized, you must provide access token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, you must be admin to access this resource',
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized, you must provide access token',
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getProfile(@UserId() userId: number) {
    return this.employeeService.findOne(userId);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized, you must provide access token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, you must be admin to access this resource',
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized, you must provide access token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, you must be admin to access this resource',
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized, you must provide access token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, you must be admin to access this resource',
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
