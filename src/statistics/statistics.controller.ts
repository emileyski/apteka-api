import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('top-sold-medications')
  getTopSoldMedications() {
    return this.statisticsService.getTopSoldMedications();
  }

  @Get('average-sales-count-per-day')
  getAverageSalesCountPerDay() {
    return this.statisticsService.getAverageSalesCountPerDay();
  }

  @Get('top-manufacturers-by-sales-count')
  getTopManufacturersBySalesCount() {
    return this.statisticsService.getTopManufacturersBySalesCount();
  }

  @Get('daily-sales')
  getDailySales() {
    return this.statisticsService.getDailySaleStatistics();
  }

  @Get('average-unit-price-by-manufacturer')
  getAverageUnitPriceByManufacturer() {
    return this.statisticsService.getAverageUnitPriceByManufacturer();
  }
}
