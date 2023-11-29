import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { Supply } from './entities/supply.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SupplyService {
  constructor(
    @InjectRepository(Supply)
    private supplyRepository: Repository<Supply>,
  ) {}

  create(createSupplyDto: CreateSupplyDto) {
    return this.supplyRepository.save({
      ...createSupplyDto,
      Medication: { MedicationID: createSupplyDto.MedicationID },
    });
  }

  findAll() {
    return this.supplyRepository.find({ relations: ['Medication'] });
  }

  async findOne(id: number) {
    const findResult = await this.supplyRepository.findOne({
      where: { SupplyID: id },
      relations: ['Medication'],
    });

    if (!findResult) {
      throw new NotFoundException(`Supply #${id} not found`);
    }

    return findResult;
  }

  async findByIds(ids: number[]) {
    const findResult = await this.supplyRepository.findByIds(ids);

    if (!findResult.length) {
      throw new NotFoundException(`Supplies not found`);
    }

    return findResult;
  }

  async update(id: number, updateSupplyDto: UpdateSupplyDto) {
    const updateResult = await this.supplyRepository.update(
      id,
      updateSupplyDto,
    );

    if (!updateResult.affected) {
      throw new NotFoundException(`Supply #${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteResult = await this.supplyRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Supply #${id} not found`);
    }

    return { message: `Supply #${id} deleted` };
  }
}
