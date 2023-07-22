import { Module } from '@nestjs/common'
import { MessageCategoryModule } from './message-category/message-category.module'

@Module({
  imports: [MessageCategoryModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class MessageModule {}
