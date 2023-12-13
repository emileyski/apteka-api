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
import { StatisticsModule } from './statistics/statistics.module';
import { MailModule } from './mail/mail.module';
import { ReportsModule } from './reports/reports.module';
import { SqlModule } from './sql/sql.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default', // Specify the connection name as 'default'
      type: 'mssql',
      host: 'sql.bsite.net\\MSSQL2016',
      username: 'apteka_db',
      password: 'apteka',
      database: 'apteka_db',
      autoLoadEntities: true,
      synchronize: true,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthModule,
    MedicationModule,
    ManufacturerModule,
    ActiveIngredientModule,
    CategoryModule,
    DosageFormModule,
    PositionModule,
    EmployeeModule,
    SupplyModule,
    SaleModule,
    StatisticsModule,
    MailModule,
    ReportsModule,
    SqlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
