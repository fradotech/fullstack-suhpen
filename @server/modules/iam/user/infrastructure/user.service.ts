import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { In, Repository } from 'typeorm'
import { IamUser } from '../infrastructure/user.entity'

class UserRepo extends Repository<IamUser> {
  constructor(
    @InjectRepository(IamUser)
    private readonly repo: Repository<IamUser>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<IamUser[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findOneRelationRoles(id: string): Promise<IamUser | null> {
    return await this.findOne({
      where: { id },
      relations: ['roles.permissions'],
    })
  }

  async findOneOrFailRelationRoles(id: string): Promise<IamUser> {
    return await this.findOneOrFail({
      where: { id },
      relations: ['roles.permissions'],
    })
  }

  async findOneByEmailRelationRoles(email: string): Promise<IamUser | null> {
    return await this.findOne({
      where: { email },
      relations: ['roles.permissions'],
    })
  }
}

@Injectable()
export class UserService extends UserRepo {}
