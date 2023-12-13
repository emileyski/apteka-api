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
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/core/guards/access-token.guard';
import { UserId } from 'src/core/decorators/user-id.decorator';

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

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getProfile(@UserId() userId: number) {
    return this.employeeService.findOne(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
