import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { KeyValueRequest } from '@server/infrastructure/interfaces/key-value.request'
import { In, Repository } from 'typeorm'
import { EntNotificationTemplate } from './notification-template.entity'
import { INotificationTemplate } from './notification-template.interface'

class NotificationTemplateRepo extends Repository<EntNotificationTemplate> {
  constructor(
    @InjectRepository(EntNotificationTemplate)
    private readonly repo: Repository<EntNotificationTemplate>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<EntNotificationTemplate[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findOneWithCategory(id: string): Promise<EntNotificationTemplate> {
    return await this.findOneOrFail({ where: { id }, relations: ['category'] })
  }
}

@Injectable()
export class NotificationTemplateService extends NotificationTemplateRepo {
  replaceVariable(
    template: INotificationTemplate,
    variables: KeyValueRequest[],
  ): INotificationTemplate {
    variables.forEach((variable) => {
      template.message = template.message.replace(
        `{{${variable.key}}}`,
        variable.value,
      )
    })

    return template
  }
}
