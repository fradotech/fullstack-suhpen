import { Module } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
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
import { InventoryModule } from './modules/inventory/inventory.module'
import { SentryModule } from './modules/support/sentry/sentry.module'
import { SupportModule } from './modules/support/support.module'

@Module({
  imports: [
    SentryModule.forRoot(config.sentry),
    RavenModule,

    DatabaseModule,
    SupportModule,

    DashboardModule,
    IamModule,
    InventoryModule,
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
  ],
})
export class AppModule {}
