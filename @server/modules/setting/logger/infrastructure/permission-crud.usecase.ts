import { Injectable } from '@nestjs/common'
import { ILogActivity } from './log-activity.interface'
import { LogActivityService } from './log-activity.service'

@Injectable()
export class LogActivityCrudUsecase {
  constructor(private readonly permissionService: LogActivityService) {}

  async findOneOrFail(id: string): Promise<ILogActivity> {
    return await this.permissionService.findOneByOrFail({ id })
  }
}
