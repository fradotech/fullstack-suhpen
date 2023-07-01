import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { Util } from '@server/common/utils/util'
import { config } from '@server/config'
import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { BaseMasterDataRequest } from '@server/infrastructure/base/master-data/base-master-data.request'
import { Modules } from '@server/modules/modules'
import { EntPermission } from './permission.entity'
import { IPermission } from './permission.interface'

export class PermissionRequest
  extends OmitType(BaseMasterDataRequest, ['id'])
  implements IBaseMasterData
{
  id: string
  @ApiProperty({ example: '#007fd0' })
  labelColor: string
}

export class PermissionCreateRequest extends PartialType(PermissionRequest) {
  static dto(req: PermissionCreateRequest): IPermission {
    const data = new EntPermission()
    return Object.assign(data, req)
  }
}

export class PermissionUpdateRequest extends PartialType(PermissionRequest) {
  static dto(data: IPermission, req: PermissionUpdateRequest): IPermission {
    return Object.assign(data, req)
  }
}

export class PermissionSyncRequest extends PartialType(PermissionRequest) {
  static dto(layer: any): IPermission {
    const res = new EntPermission()

    res.key = layer.route.path.replace(
      config.app.prefix,
      layer.route?.stack[0].method,
    )

    res.path = layer.route.path
    res.method = layer.route.stack[0].method

    res.name = res.key.replaceAll('/', ' ').trim().replaceAll(':', '')
    res.name = Util.titleCase(res.name)

    Object.values(Modules).forEach((module) => {
      const moduleTitle = Util.titleCase(module)

      if (res.name.toLowerCase().includes(module.toLowerCase())) {
        res.name = res.name.replace(moduleTitle, ` - ${moduleTitle}`)
        res.module = module
      }
    })

    res.name = res.name.replace('Get', 'READ')
    res.name = res.name.replace('Post', 'WRITE')
    res.name = res.name.replace('Put', 'EDIT')
    res.name = res.name.replace('Patch', 'MODIFY')
    res.name = res.name.replace('Delete', 'DELETE')

    res.method === 'get' && (res.labelColor = '#00a120')
    res.method === 'post' && (res.labelColor = '#cf720e')
    res.method === 'put' && (res.labelColor = '#001fe6')
    res.method === 'patch' && (res.labelColor = '#45a8ff')
    res.method === 'delete' && (res.labelColor = '#ff0033')

    return res
  }
}
