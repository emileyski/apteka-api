import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActiveIngredientDto } from './dto/create-active-ingredient.dto';
import { UpdateActiveIngredientDto } from './dto/update-active-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveIngredient } from './entities/active-ingredient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActiveIngredientService {
  constructor(
    @InjectRepository(ActiveIngredient)
    private activeIngredientRepository: Repository<ActiveIngredient>,
  ) {}

  create(createActiveIngredientDto: CreateActiveIngredientDto) {
    return this.activeIngredientRepository.save(createActiveIngredientDto);
  }

  findAll() {
    return this.activeIngredientRepository.find();
  }

  async findOne(id: number) {
    const findResult = await this.activeIngredientRepository.findOne({
      where: { ActiveIngredientID: id },
    });

    if (!findResult) {
      throw new NotFoundException(`Active Ingredient #${id} not found`);
    }

    return findResult;
  }

  async update(
    id: number,
    updateActiveIngredientDto: UpdateActiveIngredientDto,
  ) {
    const updateResult = await this.activeIngredientRepository.update(
      { ActiveIngredientID: id },
      updateActiveIngredientDto,
    );

    if (updateResult.affected === 0) {
      throw new NotFoundException(`Active Ingredient #${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const removeResult = await this.activeIngredientRepository.delete({
      ActiveIngredientID: id,
    });

    if (removeResult.affected === 0) {
      throw new NotFoundException(`Active Ingredient #${id} not found`);
    }

    return { message: `Active Ingredient #${id} deleted` };
  }
}
