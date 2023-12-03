import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from 'src/medication/entities/medication.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medication, Sale, Manufacturer])],
  providers: [StatisticsService],
  controllers: [StatisticsController],
  exports: [StatisticsService],
})
export class StatisticsModule {}
