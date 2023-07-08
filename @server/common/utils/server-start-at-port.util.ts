import { Logger } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

export const serverStartAtPort = async (
  app: NestExpressApplication,
  port: number,
): Promise<number> => {
  try {
    await app.listen(port)
  } catch (e) {
    Logger.warn(`Try to listen at port :::${port + 1}`, 'NestApplication')
    return await serverStartAtPort(app, port + 1)
  }
  return port
}
