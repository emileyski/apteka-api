import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  create(createPositionDto: CreatePositionDto) {
    return this.positionRepository.save(createPositionDto);
  }

  findAll() {
    return this.positionRepository.find();
  }

  async findOne(id: number) {
    const findResult = await this.positionRepository.findOne({
      where: { PositionID: id },
    });

    if (!findResult) {
      throw new NotFoundException(`Position #${id} not found`);
    }

    return findResult;
  }

  async update(id: number, updatePositionDto: CreatePositionDto) {
    const updateResult = await this.positionRepository.update(
      id,
      updatePositionDto,
    );

    if (!updateResult.affected) {
      throw new NotFoundException(`Position #${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteResult = await this.positionRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Position #${id} not found`);
    }

    return { message: `Position #${id} deleted` };
  }
}
