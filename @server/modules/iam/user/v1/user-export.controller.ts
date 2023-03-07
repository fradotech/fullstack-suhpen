import { Parser } from '@json2csv/plainjs'
import { Controller, Post, Query, Res, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Modules } from '@server/modules/modules'
import { Response } from 'express'
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
    @Res() res: Response,
  ): Promise<void> {
    req.isExport = true
    const response = await this.userIndexApp.fetch(req)

    const data = UserStrictResponse.fromEntities(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${
      Modules.Users
    } - ${new Date().toISOString()}.xlsx`

    res.header('Content-Type', 'xlsx')
    res.attachment(fileName)
    res.header('fileName', fileName)
    res.send(dataExport)
  }
}
