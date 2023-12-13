import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const hashedPassword = await hash(createEmployeeDto.Password);

    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      Password: hashedPassword,
      Position: { PositionID: createEmployeeDto.PositionID },
    });

    return this.employeeRepository.save(employee);
  }

  findAll() {
    return this.employeeRepository.find({ relations: ['Position'] });
  }

  async findOneOrThrowByEmail(email: string): Promise<Employee> {
    const user = await this.employeeRepository.findOneBy({
      Email: email,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: { EmployeeID: id },
      relations: ['Position'],
    });

    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }

    return employee;
  }

  async updateRefreshToken(
    EmployeeID: number,
    refreshToken: string,
  ): Promise<Employee> {
    const user = await this.findOne(EmployeeID);

    if (!user) throw new NotFoundException('User not found');

    try {
      this.employeeRepository.merge(user, { Token: refreshToken });
      return await this.employeeRepository.save(user);
    } catch (error) {
      throw new ConflictException(
        'Some error occured while updating user token',
      );
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const updateResult = await this.employeeRepository.update(
      id,
      updateEmployeeDto,
    );

    if (!updateResult.affected) {
      throw new NotFoundException(`Employee #${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteResult = await this.employeeRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Employee #${id} not found`);
    }

    return {
      message: `Employee #${id} deleted`,
    };
  }
}
