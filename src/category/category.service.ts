import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const findResult = await this.categoryRepository.findOne({
      where: { CategoryID: id },
    });

    if (!findResult) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return findResult;
  }

  async update(id: number, updateCategoryDto: CreateCategoryDto) {
    const updateResult = await this.categoryRepository.update(
      { CategoryID: id },
      updateCategoryDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const removeResult = await this.categoryRepository.delete({
      CategoryID: id,
    });

    if (removeResult.affected === 0) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return { message: `Category #${id} deleted` };
  }
}
