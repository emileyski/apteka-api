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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      name: 'default', // Specify the connection name as 'default'
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      //THIS CONFIGURATION IS FOR MS SQL SERVER DATABASE

      //type: 'mssql',
      // host: 'sql.bsite.net\\MSSQL2016',
      // username: 'apteka_db',
      // password: 'apteka',
      // database: 'apteka_db',
      // autoLoadEntities: true,
      // synchronize: true,
      // options: {
      //   encrypt: true,
      //   trustServerCertificate: true,
      // },
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
