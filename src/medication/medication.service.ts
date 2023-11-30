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

  findAll(name?: string, withSupplies?: string) {
    const query = this.medicationRepository
      .createQueryBuilder('medication')
      .leftJoinAndSelect('medication.Category', 'Category')
      .leftJoinAndSelect('medication.ActiveIngredient', 'ActiveIngredient')
      .leftJoinAndSelect('medication.DosageForm', 'DosageForm')
      .leftJoinAndSelect('medication.Manufacturer', 'Manufacturer');

    if (name !== undefined) {
      const lowercasedName = name.toLowerCase();
      query.where('LOWER(medication.TradeName) LIKE :name', {
        name: `%${lowercasedName}%`,
      });
    }

    if (withSupplies === 'true') {
      console.log(withSupplies);
      query.leftJoinAndSelect('medication.Supplies', 'Supplies');
    }

    return query.getMany();
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

  async findOneWithSupplies(id: number) {
    const findResult = await this.medicationRepository.findOne({
      where: { MedicationID: id },
      relations: [
        'Category',
        'ActiveIngredient',
        'DosageForm',
        'Manufacturer',
        'Supplies',
      ],
    });

    if (!findResult) {
      throw new NotFoundException(`Medication #${id} not found`);
    }

    return findResult;
  }

  async update(id: number, updateMedicationDto: UpdateMedicationDto) {
    const updateResult = await this.medicationRepository.update(id, {
      PackagingQuantity: updateMedicationDto.PackagingQuantity,
      TradeName: updateMedicationDto.TradeName,
      Category: { CategoryID: updateMedicationDto.CategoryID },
      ActiveIngredient: {
        ActiveIngredientID: updateMedicationDto.ActiveIngredientID,
      },
      DosageForm: { DosageFormID: updateMedicationDto.DosageFormID },
      Manufacturer: { ManufacturerID: updateMedicationDto.ManufacturerID },
    });

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
