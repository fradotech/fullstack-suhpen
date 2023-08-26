import { OmitType, PartialType } from '@nestjs/swagger'
import { Util } from '@server/common/utils/util'
import { config } from '@server/config'
import { Modules } from '@server/modules/modules'
import { PermissionMethodValue } from '../common/permission.enum'
import { IamPermission } from '../infrastructure/permission.entity'
import { IIamPermission } from '../infrastructure/permission.interface'

export class PermissionRequest
  extends IamPermission
  implements IIamPermission {}

export class PermissionCreateRequest extends PartialType(PermissionRequest) {
  static dto(req: PermissionCreateRequest): IIamPermission {
    const data = new IamPermission()
    return Object.assign(data, req)
  }
}

export class PermissionUpdateRequest extends OmitType(PermissionRequest, [
  'id',
]) {
  static dto(
    res: IIamPermission,
    data: PermissionUpdateRequest,
  ): IIamPermission {
    res.thumbnail = data.thumbnail
    res.description = data.description

    return res
  }
}

export class PermissionSyncRequest extends PartialType(PermissionRequest) {
  static dto(layer: any): IIamPermission {
    const res = new IamPermission()

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

      if (res.key.toLowerCase().includes(module.toLowerCase())) {
        res.name = res.name.replace(moduleTitle, ` - ${moduleTitle}`)
        res.module = module
      }
    })

    res.name = res.name.replace(
      Util.titleCase(res.method),
      PermissionMethodValue[res.method].accessName,
    )

    res.labelColor = PermissionMethodValue[res.method].color

    return res
  }
}
