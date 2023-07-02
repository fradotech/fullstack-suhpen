import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { In, Repository } from 'typeorm'
import { IUser } from '../../user/infrastructure/user.interface'
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

  static validatePermission(user: IUser, path: string): boolean {
    return user.roles.some((role) => {
      return role.permissions.some((permission) => {
        return path === permission.path
      })
    })
  }
}
