import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
