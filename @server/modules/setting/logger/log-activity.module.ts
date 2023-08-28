import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogActivityInterceptor } from './common/log-activity.interceptor'
import { LogActivityIndexApp } from './infrastructure/log-activity-index.app'
import { LogActivity } from './infrastructure/log-activity.entity'
import { LogActivityService } from './infrastructure/log-activity.service'
import { LogActivityCrudApp } from './infrastructure/permission-crud.app'
import { LogActivityController } from './v1/log-activity.controller'
import { LogActivitySheetController } from './v1/sheet/log-activity-sheet.controller'
export const SENTRY_OPTIONS = 'SENTRY_OPTIONS'

@Module({
  imports: [TypeOrmModule.forFeature([LogActivity])],
  controllers: [LogActivityController, LogActivitySheetController],
  providers: [
    LogActivityService,
    LogActivityIndexApp,
    LogActivityCrudApp,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogActivityInterceptor,
    },
  ],
})
export class LogActivityModule {}
