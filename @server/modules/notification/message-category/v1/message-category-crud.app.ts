import { Injectable } from '@nestjs/common'
import { IMessageCategory } from '../infrastructure/message-category.interface'
import {
  MessageCategoryCreateRequest,
  MessageCategoryUpdateRequest,
} from '../infrastructure/message-category.request'
import { MessageCategoryService } from '../infrastructure/message-category.service'

@Injectable()
export class MessageCategoryCrudApp {
  constructor(private readonly roleService: MessageCategoryService) {}

  async find(): Promise<IMessageCategory[]> {
    return await this.roleService.find()
  }

  async create(req: MessageCategoryCreateRequest): Promise<IMessageCategory> {
    const data = MessageCategoryCreateRequest.dto(req)

    return await this.roleService.save(data)
  }

  async findOneOrFail(id: string): Promise<IMessageCategory> {
    return await this.roleService.findOneByOrFail({ id })
  }

  async update(
    id: string,
    req: MessageCategoryUpdateRequest,
  ): Promise<IMessageCategory> {
    const data = await this.roleService.findOneByOrFail({ id })
    const dataUpdate = MessageCategoryUpdateRequest.dto(data, req)

    return await this.roleService.save(dataUpdate)
  }

  async delete(id: string): Promise<IMessageCategory> {
    const data = await this.roleService.findOneByOrFail({ id })
    await this.roleService.delete(id)
    return data
  }
}
