import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { In, Repository } from 'typeorm'
import { EntVariant } from './variant.entity'

class VariantRepo extends Repository<EntVariant> {
  constructor(
    @InjectRepository(EntVariant)
    private readonly variantRepo: Repository<EntVariant>,
  ) {
    super(variantRepo.target, variantRepo.manager, variantRepo.queryRunner)
  }
}

@Injectable()
export class VariantService extends VariantRepo implements BaseService {
  async findByInIds(ids: string[]): Promise<EntVariant[]> {
    return await this.findBy({ id: In(ids) })
  }
}
