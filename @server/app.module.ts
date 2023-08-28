import { Module } from '@nestjs/common'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { RavenInterceptor, RavenModule } from 'nest-raven'
import {
  EntityNotFoundExceptionFilter,
  HttpExceptionFilter,
  QueryErrorFilter,
} from './common/exceptions/http-exeception.filter'
import { ValidationPipe } from './common/pipes/validation.pipe'
import { config } from './config'
import { DatabaseModule } from './database/database.module'
import { DashboardModule } from './modules/dashboard/dashboard.module'
import { IamModule } from './modules/iam/iam.module'
import { NotificationModule } from './modules/notification/notification.module'
import { SettingModule } from './modules/setting/setting.module'
import { SentryModule } from './modules/support/sentry/sentry.module'
import { SupportModule } from './modules/support/support.module'

@Module({
  imports: [
    SentryModule.forRoot(config.sentry),
    ThrottlerModule.forRoot(config.server.rateLimiter),
    RavenModule,

    DatabaseModule,
    SupportModule,
    SettingModule,

    DashboardModule,
    IamModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new RavenInterceptor(),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: QueryErrorFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
