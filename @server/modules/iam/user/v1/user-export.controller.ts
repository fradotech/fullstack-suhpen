import { Parser } from '@json2csv/plainjs'
import { Controller, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { Modules } from '@server/modules/modules'
import { AdminGuard } from '../../auth/common/admin.guard'
import { UserIndexApp } from '../infrastructure/user-index.app'
import { UserIndexRequest } from '../infrastructure/user-index.request'
import { UserStrictResponse } from '../infrastructure/user.response'

const THIS_MODULE = Modules.Users + '/export'

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class UserExportController {
  constructor(private readonly userIndexApp: UserIndexApp) {}

  @Post()
  async fetch(
    @Query() req: UserIndexRequest,
  ): Promise<IApiExportRes<UserStrictResponse[]>> {
    req.isExport = true
    const response = await this.userIndexApp.fetch(req)

    const data = UserStrictResponse.fromEntities(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.Users
    } - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.fromEntity(dataExport, fileName)
  }
}
