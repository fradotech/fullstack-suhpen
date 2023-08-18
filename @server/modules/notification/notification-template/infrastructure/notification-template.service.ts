import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IKeyValue } from '@server/infrastructure/interfaces/key-value.interface'
import { In, Repository } from 'typeorm'
import { NotificationTemplate } from './notification-template.entity'
import { INotificationTemplate } from './notification-template.interface'

class NotificationTemplateRepo extends Repository<NotificationTemplate> {
  constructor(
    @InjectRepository(NotificationTemplate)
    private readonly repo: Repository<NotificationTemplate>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner)
  }

  async findByInIds(ids: string[]): Promise<NotificationTemplate[]> {
    return await this.findBy({ id: In(ids) })
  }

  async findOneWithCategory(id: string): Promise<NotificationTemplate> {
    return await this.findOneOrFail({ where: { id }, relations: ['category'] })
  }
}

@Injectable()
export class NotificationTemplateService extends NotificationTemplateRepo {
  replaceVariable(
    template: INotificationTemplate,
    variables: IKeyValue[],
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
