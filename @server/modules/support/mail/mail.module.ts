import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { config } from '@server/config'
import { MailService } from './infrastructure/mail.service'

@Module({
  imports: [MailerModule.forRoot(config.mail)],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
