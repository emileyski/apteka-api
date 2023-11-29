import { Injectable } from '@nestjs/common';
import { CreateDosageFormDto } from './dto/create-dosage-form.dto';
import { UpdateDosageFormDto } from './dto/update-dosage-form.dto';

@Injectable()
export class DosageFormService {
  create(createDosageFormDto: CreateDosageFormDto) {
    return 'This action adds a new dosageForm';
  }

  findAll() {
    return `This action returns all dosageForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dosageForm`;
  }

  update(id: number, updateDosageFormDto: UpdateDosageFormDto) {
    return `This action updates a #${id} dosageForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} dosageForm`;
  }
}
