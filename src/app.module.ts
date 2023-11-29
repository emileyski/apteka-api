import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationModule } from './medication/medication.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { ActiveIngredientModule } from './active-ingredient/active-ingredient.module';
import { CategoryModule } from './category/category.module';
import { DosageFormModule } from './dosage-form/dosage-form.module';
import { PositionModule } from './position/position.module';
import { EmployeeModule } from './employee/employee.module';
import { SupplyModule } from './supply/supply.module';
import { SaleModule } from './sale/sale.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'sql.bsite.net\\MSSQL2016',
      username: 'emilevi4_db',
      password: 'emilevi4',
      database: 'emilevi4_db',
      autoLoadEntities: true,
      synchronize: true,
      options: {
        encrypt: true, // Важливий параметр для самопідписаних сертифікатів
        trustServerCertificate: true, // Ігнорує помилку самопідписаного сертифікату
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    MedicationModule,
    ManufacturerModule,
    ActiveIngredientModule,
    CategoryModule,
    DosageFormModule,
    PositionModule,
    EmployeeModule,
    SupplyModule,
    SaleModule,
    OrderItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
