import { Module } from '@nestjs/common'
import { AttachmentModule } from './attachment/attachment.module'
import { AppCacheModule } from './cache/cache.module'

@Module({
  imports: [AttachmentModule, AppCacheModule],
  controllers: [],
  providers: [AppCacheModule],
})
export class SupportModule {}
