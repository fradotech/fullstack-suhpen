import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { RegionDistrict } from './district.entity'
import { IDistrict } from './district.interface'

class DistrictRepo extends Repository<IDistrict> {
  constructor(
    @InjectRepository(RegionDistrict)
    private readonly repo: Repository<IDistrict>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<IDistrict[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findByIdRelationProvince(id: string): Promise<IDistrict> {
    return await this.findOneOrFail({
      where: { id },
      relations: ['city.province'],
    })
  }
}

@Injectable()
export class DistrictService extends DistrictRepo {}
