import { Injectable, Logger } from '@nestjs/common'
import { Util } from '@server/common/utils/util'
import { config } from '@server/config'
import fs from 'fs'
import { LoggerResponse } from './logger.response'

@Injectable()
export class LoggerService {
  logPath = process.cwd() + '/' + config.app.logFile

  async fetch(): Promise<LoggerResponse[]> {
    const log = await this.getFile()
    return JSON.parse(log)
  }

  async getFile(): Promise<string> {
    const logPath = this.logPath
    try {
      return String(fs.readFileSync(logPath))
    } catch (e) {
      fs.writeFileSync(logPath, '[]')
      return String(fs.readFileSync(logPath))
    }
  }

  setFile(file: string, logNew: LoggerResponse) {
    if (Util.isValidJSON(file)) {
      const logFile = JSON.parse(file)
      logFile.push(logNew)

      const logFileUpdate = JSON.stringify(logFile)
      fs.writeFile(this.logPath, logFileUpdate, (e) => {
        e && Logger.error(e)
      })
    }
  }
}
