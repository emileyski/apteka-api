import { Module } from '@nestjs/common';
import { DosageFormService } from './dosage-form.service';
import { DosageFormController } from './dosage-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DosageForm } from './entities/dosage-form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DosageForm])],
  controllers: [DosageFormController],
  providers: [DosageFormService],
})
export class DosageFormModule {}
