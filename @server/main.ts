import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule } from '@nestjs/swagger'
import * as path from 'path'
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked'
import { AppModule } from './app.module'
import { serverStartAtPort } from './common/utils/server-start-at-port.util'
import { config } from './config'
import { swaggerConfig } from './infrastructure/swagger/swagger.config'

export let app: NestExpressApplication

async function bootstrap() {
  initializeTransactionalContext()
  patchTypeORMRepositoryWithBaseRepository()

  app = await NestFactory.create<NestExpressApplication>(AppModule)

  const publicPath = path.resolve('./') + config.attachment.public
  const host = config.server.host
  const docs = 'docs'

  app.useStaticAssets(publicPath)
  app.setGlobalPrefix(config.app.prefix)
  app.enableCors()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(docs, app, document)

  const port = await serverStartAtPort(app, +config.server.port)

  Logger.verbose(`🚀 App running at ${host}:${port}`, 'NestApplication')
  Logger.verbose(`🚀 API Docs Swagger at ${host}:${port}/${docs}`, 'Swagger UI')
}
bootstrap()
