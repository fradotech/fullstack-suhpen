import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
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
export class UserService extends UserRepo {
  // TODO: Create a method if the repository can’t resolve
}
