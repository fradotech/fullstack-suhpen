import { Module } from '@nestjs/common'
import { AttachmentModule } from './attachment/attachment.module'
import { LoggerModule } from './logger/logger.module'
import { MailModule } from './mail/mail.module'

@Module({
  imports: [LoggerModule, AttachmentModule, MailModule],
  controllers: [],
  providers: [],
})
export class SupportModule {}
