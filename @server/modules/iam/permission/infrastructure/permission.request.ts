import { OmitType, PartialType } from '@nestjs/swagger'
import { Util } from '@server/common/utils/util'
import { config } from '@server/config'
import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { BaseMasterDataRequest } from '@server/infrastructure/base/master-data/base-master-data.request'
import { Modules } from '@server/modules/modules'
import { PermissionMethodEnum } from '../common/permission.enum'
import { EntPermission } from './permission.entity'
import { IPermission } from './permission.interface'

export class PermissionRequest
  extends OmitType(BaseMasterDataRequest, ['id'])
  implements IBaseMasterData
{
  id: string
}

export class PermissionCreateRequest extends PartialType(PermissionRequest) {
  static dto(req: PermissionCreateRequest): IPermission {
    const data = new EntPermission()
    return Object.assign(data, req)
  }
}

export class PermissionUpdateRequest extends OmitType(PermissionRequest, [
  'id',
]) {
  static dto(res: IPermission, data: PermissionUpdateRequest): IPermission {
    res.thumbnail = data.thumbnail
    res.description = data.description

    return res
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

    res.name = res.name.replace(
      Util.titleCase(PermissionMethodEnum.get.name),
      PermissionMethodEnum.get.accessName,
    )
    res.name = res.name.replace(
      Util.titleCase(PermissionMethodEnum.post.name),
      PermissionMethodEnum.post.accessName,
    )
    res.name = res.name.replace(
      Util.titleCase(PermissionMethodEnum.put.name),
      PermissionMethodEnum.put.accessName,
    )
    res.name = res.name.replace(
      Util.titleCase(PermissionMethodEnum.patch.name),
      PermissionMethodEnum.patch.accessName,
    )
    res.name = res.name.replace(
      Util.titleCase(PermissionMethodEnum.delete.name),
      PermissionMethodEnum.delete.accessName,
    )

    res.labelColor = PermissionMethodEnum[res.method].color

    return res
  }
}
