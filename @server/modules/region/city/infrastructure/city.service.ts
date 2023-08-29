import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { RegionCity } from './city.entity'
import { ICity } from './city.interface'

class CityRepo extends Repository<ICity> {
  constructor(
    @InjectRepository(RegionCity)
    private readonly repo: Repository<ICity>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<ICity[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findByIdRelationProvince(id: string): Promise<ICity> {
    return await this.findOneOrFail({ where: { id }, relations: ['province'] })
  }
}

@Injectable()
export class CityService extends CityRepo {}
