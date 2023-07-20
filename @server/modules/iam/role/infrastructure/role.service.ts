import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { config } from '@server/config'
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

  async findByInIds(ids: string[]): Promise<EntRole[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findOneRelationPermissions(id: string): Promise<EntRole> {
    return await this.findOneOrFail({
      where: { id },
      relations: ['permissions'],
    })
  }
}

@Injectable()
export class RoleService extends RoleRepo {
  static validatePermission(
    user: IUser,
    method: string,
    path: string,
  ): boolean {
    const key = path.replace(config.app.prefix, method.toLowerCase())
    return user.roles.some((role) => {
      return role.permissions?.some((permission) => {
        return key === permission.key
      })
    })
  }
}
