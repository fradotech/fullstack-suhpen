import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { RavenInterceptor, RavenModule } from 'nest-raven'
import {
  EntityNotFoundExceptionFilter,
  HttpExceptionFilter,
  QueryErrorFilter,
  RelationNotFoundExceptionFilter,
} from './common/exceptions/http-exeception.filter'
import { ValidationPipe } from './common/pipes/validation.pipe'
import { DatabaseModule } from './database/database.module'
import { DashboardModule } from './modules/dashboard/dashboard.module'
import { FeatureModule } from './modules/feature/feature.module'
import { IamModule } from './modules/iam/iam.module'
import { LoggerModule } from './modules/support/logger/logger.module'
import { SentryModule } from './modules/support/sentry/sentry.module'
import { SupportModule } from './modules/support/support.module'

@Module({
  imports: [
    SentryModule.forRoot(),
    LoggerModule,
    RavenModule,
    DatabaseModule,
    SupportModule,
    IamModule,
    DashboardModule,
    FeatureModule,
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
      useClass: RelationNotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: QueryErrorFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
