import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { In, Repository } from 'typeorm'
import { EntCategory } from '../infrastructure/category.entity'

class CategoryRepo extends Repository<EntCategory> {
  constructor(
    @InjectRepository(EntCategory)
    private readonly categoryRepo: Repository<EntCategory>,
  ) {
    super(categoryRepo.target, categoryRepo.manager, categoryRepo.queryRunner)
  }
}

@Injectable()
export class CategoryService extends CategoryRepo implements BaseService {
  async findByInIds(ids: string[]): Promise<EntCategory[]> {
    return await this.findBy({ id: In(ids) })
  }
}
