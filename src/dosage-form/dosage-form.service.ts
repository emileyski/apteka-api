import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDosageFormDto } from './dto/create-dosage-form.dto';
import { UpdateDosageFormDto } from './dto/update-dosage-form.dto';
import { DosageForm } from './entities/dosage-form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DosageFormService {
  constructor(
    @InjectRepository(DosageForm)
    private dosageFormRepository: Repository<DosageForm>,
  ) {}

  create(createDosageFormDto: CreateDosageFormDto) {
    return this.dosageFormRepository.save(createDosageFormDto);
  }

  findAll() {
    return this.dosageFormRepository.find();
  }

  async findOne(id: number) {
    const findResult = await this.dosageFormRepository.findOne({
      where: { DosageFormID: id },
    });

    if (!findResult) {
      throw new NotFoundException(`Dosage Form #${id} not found`);
    }

    return findResult;
  }

  async update(id: number, updateDosageFormDto: UpdateDosageFormDto) {
    const updateResult = await this.dosageFormRepository.update(
      id,
      updateDosageFormDto,
    );

    if (updateResult.affected === 0) {
      throw new NotFoundException(`Dosage Form #${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const removeResult = await this.dosageFormRepository.delete(id);

    if (removeResult.affected === 0) {
      throw new NotFoundException(`Dosage Form #${id} not found`);
    }

    return { message: `Dosage Form #${id} deleted` };
  }
}
