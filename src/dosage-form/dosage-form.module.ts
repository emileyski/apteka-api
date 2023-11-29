import { Module } from '@nestjs/common';
import { DosageFormService } from './dosage-form.service';
import { DosageFormController } from './dosage-form.controller';

@Module({
  controllers: [DosageFormController],
  providers: [DosageFormService],
})
export class DosageFormModule {}
