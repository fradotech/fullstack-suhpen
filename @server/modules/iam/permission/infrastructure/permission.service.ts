import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { In, Repository } from 'typeorm'
import { EntPermission } from './permission.entity'

class PermissionRepo extends Repository<EntPermission> {
  constructor(
    @InjectRepository(EntPermission)
    private readonly permissionRepo: Repository<EntPermission>,
  ) {
    super(
      permissionRepo.target,
      permissionRepo.manager,
      permissionRepo.queryRunner,
    )
  }
}

@Injectable()
export class PermissionService extends PermissionRepo implements BaseService {
  async findByInIds(ids: string[]): Promise<EntPermission[]> {
    return await this.findBy({ id: In(ids) })
  }
}
