import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { RegionProvince } from './province.entity'
import { IProvince } from './province.interface'

class ProvinceRepo extends Repository<IProvince> {
  constructor(
    @InjectRepository(RegionProvince)
    private readonly repo: Repository<IProvince>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<IProvince[]> {
    return await this.findBy({ id: In(ids) })
  }
}

@Injectable()
export class ProvinceService extends ProvinceRepo {}
