import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogActivityInterceptor } from './common/log-activity.interceptor'
import { LogActivityIndexUsecase } from './infrastructure/log-activity-index.usecase'
import { LogActivity } from './infrastructure/log-activity.entity'
import { LogActivityService } from './infrastructure/log-activity.service'
import { LogActivityCrudUsecase } from './infrastructure/permission-crud.usecase'
import { LogActivityController } from './v1/log-activity.controller'
import { LogActivitySheetController } from './v1/sheet/log-activity-sheet.controller'
export const SENTRY_OPTIONS = 'SENTRY_OPTIONS'

@Module({
  imports: [TypeOrmModule.forFeature([LogActivity])],
  controllers: [LogActivityController, LogActivitySheetController],
  providers: [
    LogActivityService,
    LogActivityIndexUsecase,
    LogActivityCrudUsecase,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogActivityInterceptor,
    },
  ],
})
export class LogActivityModule {}
