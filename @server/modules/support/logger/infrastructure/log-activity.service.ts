import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { LogActivity } from './log-activity.entity'

class LogActivityRepo extends Repository<LogActivity> {
  constructor(
    @InjectRepository(LogActivity)
    private readonly repo: Repository<LogActivity>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<LogActivity[]> {
    return await this.findBy({ id: In(ids) })
  }
}

@Injectable()
export class LogActivityService extends LogActivityRepo {}
