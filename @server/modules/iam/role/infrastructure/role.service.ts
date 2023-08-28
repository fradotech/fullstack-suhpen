import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { config } from '@server/config'
import { In, Repository } from 'typeorm'
import { IIamUser } from '../../user/infrastructure/user.interface'
import { IamRole } from './role.entity'

class RoleRepo extends Repository<IamRole> {
  constructor(
    @InjectRepository(IamRole)
    private readonly repo: Repository<IamRole>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<IamRole[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findOneRelationPermissions(id: string): Promise<IamRole> {
    return await this.findOneOrFail({
      where: { id },
      relations: ['permissions'],
    })
  }
}

@Injectable()
export class RoleService extends RoleRepo {
  static validatePermission(
    user: IIamUser,
    method: string,
    path: string,
  ): boolean {
    const key = path.replace(config.app.prefix, method.toLowerCase())
    return user.roles?.some((role) => {
      return role.permissions?.some((permission) => {
        return key === permission.key
      })
    })
  }
}
