import { Logger } from '@nestjs/common'
import { NestApplication, NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import * as path from 'path'
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked'
import { AppModule } from './app.module'
import { serverStartAtPort } from './common/utils/server-start-at-port.util'
import { config } from './config'
import { SeederMoodule } from './database/seeder/seeder.module'
import { swaggerConfig } from './infrastructure/swagger/swagger.config'

async function bootstrap() {
  initializeTransactionalContext()
  patchTypeORMRepositoryWithBaseRepository()

  const app = await NestFactory.create<NestApplication>(AppModule)

  const publicPath = path.resolve('./') + config.attachment.public
  const host = config.server.host
  const docs = 'docs'

  app.enableCors()
  app.use(helmet())
  app.useStaticAssets(publicPath)
  app.setGlobalPrefix(config.app.prefix)

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(docs, app, document)

  await Promise.all([
    serverStartAtPort(app, +config.server.port),
    SeederMoodule.forRoot(app),
  ])

  Logger.verbose(`🚀 App running at ${host}`, 'NestApplication')
  Logger.verbose(`🚀 API Docs Swagger at ${host}/${docs}`, 'Swagger UI')
}
bootstrap()
