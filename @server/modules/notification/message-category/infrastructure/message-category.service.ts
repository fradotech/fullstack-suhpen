import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { EntMessageCategory } from './message-category.entity'

class MessageCategoryRepo extends Repository<EntMessageCategory> {
  constructor(
    @InjectRepository(EntMessageCategory)
    private readonly messageCategoryRepo: Repository<EntMessageCategory>,
  ) {
    super(
      messageCategoryRepo.target,
      messageCategoryRepo.manager,
      messageCategoryRepo.queryRunner,
    )
  }

  async findByInIds(ids: string[]): Promise<EntMessageCategory[]> {
    return await this.findBy({ id: In(ids) })
  }
}

@Injectable()
export class MessageCategoryService extends MessageCategoryRepo {}
