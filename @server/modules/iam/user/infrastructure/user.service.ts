import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { In, Repository } from 'typeorm'
import { EntUser } from '../infrastructure/user.entity'

class UserRepo extends Repository<EntUser> {
  constructor(
    @InjectRepository(EntUser)
    private readonly userRepo: Repository<EntUser>,
  ) {
    super(userRepo.target, userRepo.manager, userRepo.queryRunner)
  }
}

@Injectable()
export class UserService extends UserRepo implements BaseService {
  async findByInIds(ids: string[]): Promise<EntUser[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findOneWithRoles(id: string): Promise<EntUser> {
    return await this.findOne({
      where: { id },
      relations: ['roles.permissions'],
    })
  }

  async findOneByEmailWithRoles(email: string): Promise<EntUser> {
    return await this.findOne({
      where: { email },
      relations: ['roles.permissions'],
    })
  }
}
