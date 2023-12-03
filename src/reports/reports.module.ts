import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { MailModule } from 'src/mail/mail.module';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  imports: [MailModule, StatisticsModule],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
