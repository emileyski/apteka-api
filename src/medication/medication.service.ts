import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { Medication } from './entities/medication.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  create(createMedicationDto: CreateMedicationDto) {
    return this.medicationRepository.save({
      ...createMedicationDto,
      Category: { CategoryID: createMedicationDto.CategoryID },
      ActiveIngredient: {
        ActiveIngredientID: createMedicationDto.ActiveIngredientID,
      },
      DosageForm: { DosageFormID: createMedicationDto.DosageFormID },
      Manufacturer: { ManufacturerID: createMedicationDto.ManufacturerID },
    });
  }

  findAll() {
    return this.medicationRepository.find({
      relations: ['Category', 'ActiveIngredient', 'DosageForm', 'Manufacturer'],
    });
  }

  async findOne(id: number) {
    const findResult = await this.medicationRepository.findOne({
      where: { MedicationID: id },
      relations: ['Category', 'ActiveIngredient', 'DosageForm', 'Manufacturer'],
    });

    if (!findResult) {
      throw new NotFoundException(`Medication #${id} not found`);
    }

    return findResult;
  }

  async update(id: number, updateMedicationDto: UpdateMedicationDto) {
    const updateResult = await this.medicationRepository.update(
      id,
      updateMedicationDto,
    );

    if (!updateResult.affected) {
      throw new NotFoundException(`Medication #${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteResult = await this.medicationRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Medication #${id} not found`);
    }

    return { message: `Medication #${id} deleted` };
  }
}
