import { Logger } from '@nestjs/common'
import { NestApplication } from '@nestjs/core'

export const serverStartAtPort = async (
  app: NestApplication,
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
