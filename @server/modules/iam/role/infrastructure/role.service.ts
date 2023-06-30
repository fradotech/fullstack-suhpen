import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { In, Repository } from 'typeorm'
import { EntRole } from './role.entity'

class RoleRepo extends Repository<EntRole> {
  constructor(
    @InjectRepository(EntRole)
    private readonly roleRepo: Repository<EntRole>,
  ) {
    super(roleRepo.target, roleRepo.manager, roleRepo.queryRunner)
  }
}

@Injectable()
export class RoleService extends RoleRepo implements BaseService {
  async findByInIds(ids: string[]): Promise<EntRole[]> {
    return await this.findBy({ id: In(ids) })
  }
}
