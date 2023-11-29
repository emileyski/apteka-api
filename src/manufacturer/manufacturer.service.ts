import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manufacturer } from './entities/manufacturer.entity';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,
  ) {}

  create(createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerRepository.save(createManufacturerDto);
  }

  findAll() {
    return this.manufacturerRepository.find();
  }

  async findOne(id: number) {
    const findResult = await this.manufacturerRepository.findOne({
      where: { ManufacturerID: id },
    });

    if (!findResult) {
      throw new NotFoundException(`Manufacturer #${id} not found`);
    }

    return findResult;
  }

  async update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    const updateResult = await this.manufacturerRepository.update(
      id,
      updateManufacturerDto,
    );

    if (updateResult.affected === 0) {
      throw new NotFoundException(`Manufacturer #${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const removeResult = await this.manufacturerRepository.delete(id);

    if (removeResult.affected === 0) {
      throw new NotFoundException(`Manufacturer #${id} not found`);
    }

    return { message: `Manufacturer #${id} deleted` };
  }
}
