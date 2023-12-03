import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { Sale } from './entities/sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { SupplyModule } from 'src/supply/supply.module';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, OrderItem]),
    SupplyModule,
    ReportsModule,
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
