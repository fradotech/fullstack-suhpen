import { Module } from '@nestjs/common'
import { AttachmentModule } from './attachment/attachment.module'
import { AppCacheModule } from './cache/cache.module'
import { LogActivityModule } from './logger/log-activity.module'

@Module({
  imports: [LogActivityModule, AttachmentModule, AppCacheModule],
  controllers: [],
  providers: [AppCacheModule],
})
export class SupportModule {}
