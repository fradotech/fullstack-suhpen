import { Module } from '@nestjs/common'
import { MailService } from './infrastructure/mail.service'

@Module({
  imports: [],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
