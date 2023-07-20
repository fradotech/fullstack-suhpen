import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { In, Repository } from 'typeorm'
import { EntUser } from '../infrastructure/user.entity'

class UserRepo extends Repository<EntUser> {
  constructor(
    @InjectRepository(EntUser)
    private readonly userRepo: Repository<EntUser>,
  ) {
    super(userRepo.target, userRepo.manager, userRepo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<EntUser[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findOneRelationRoles(id: string): Promise<EntUser | null> {
    return await this.findOne({
      where: { id },
      relations: ['roles.permissions'],
    })
  }

  async findOneOrFailRelationRoles(id: string): Promise<EntUser> {
    return await this.findOneOrFail({
      where: { id },
      relations: ['roles.permissions'],
    })
  }

  async findOneByEmailRelationRoles(email: string): Promise<EntUser | null> {
    return await this.findOne({
      where: { email },
      relations: ['roles.permissions'],
    })
  }
}

@Injectable()
export class UserService extends UserRepo {}
