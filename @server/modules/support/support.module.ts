import { Module } from '@nestjs/common'
import { AttachmentModule } from './attachment/attachment.module'
import { AppCacheModule } from './cache/cache.module'
import { LoggerModule } from './logger/logger.module'
import { MailModule } from './mail/mail.module'

@Module({
  imports: [LoggerModule, AttachmentModule, AppCacheModule, MailModule],
  controllers: [],
  providers: [AppCacheModule],
})
export class SupportModule {}
