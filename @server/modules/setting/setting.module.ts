import { Module } from '@nestjs/common'
import { LogActivityModule } from './logger/log-activity.module'

@Module({
  imports: [LogActivityModule],
  controllers: [],
  providers: [],
})
export class SettingModule {}
