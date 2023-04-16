import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from '@server/infrastructure/base/base.service'
import { Repository } from 'typeorm'
import { EntUser } from '../infrastructure/user.entity'
import { IUser } from '../infrastructure/user.interface'

@Injectable()
export class UserService implements BaseService {
  constructor(
    @InjectRepository(EntUser)
    private readonly userRepo: Repository<IUser>,
  ) {}

  async create(req: IUser): Promise<IUser> {
    const data = this.userRepo.create(req)
    return await this.userRepo.save(data)
  }

  async find(): Promise<IUser[]> {
    return await this.userRepo.find()
  }

  async findOne(id: string): Promise<IUser> {
    return await this.userRepo.findOne({ where: { id } })
  }

  async findOneOrFail(id: string): Promise<IUser> {
    return await this.userRepo.findOneOrFail({ where: { id } })
  }

  async update(req: IUser): Promise<IUser> {
    const data = this.userRepo.create(req)
    await this.userRepo.update(data.id, data)
    return await this.findOneOrFail(req.id)
  }

  async remove(id: string): Promise<IUser> {
    const data = (await this.findOneOrFail(id)) as EntUser
    return await this.userRepo.remove(data)
  }

  async softRemove(id: string): Promise<IUser> {
    const data = (await this.findOneOrFail(id)) as EntUser
    return await this.userRepo.softRemove(data)
  }

  // --- Another findOneBy() Methods --- \\

  async findNoRelation(id: string | string[]): Promise<IUser | IUser[]> {
    if (!Array.isArray(id)) {
      return await this.userRepo.findOneOrFail({ where: { id } })
    }

    return await this.userRepo
      .createQueryBuilder('user')
      .whereInIds(id)
      .getMany()
  }

  public async findOneByEmail(email: string): Promise<IUser> {
    return await this.userRepo.findOneOrFail({ where: { email } })
  }

  public async findOneByPhoneNumber(phoneNumber: string): Promise<IUser> {
    return await this.userRepo.findOneOrFail({ where: { phoneNumber } })
  }

  public async findOneByToken(token: string): Promise<IUser> {
    return await this.userRepo.findOne({ where: { token } })
  }
}
