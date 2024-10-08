import { Parser } from '@json2csv/plainjs'
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ApiExportRes } from '@server/infrastructure/interfaces/api-export.response'
import { IApiExportRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { Modules } from '@server/modules/modules'
import { LoggedInGuard } from '../../../auth/common/logged-in.guard'
import { UserIndexRequest } from '../../infrastructure/user-index.request'
import { UserIndexUsecase } from '../../infrastructure/user-index.usecase'
import { UserStrictResponse } from '../../infrastructure/user.response'

const THIS_MODULE = Modules.UserSheet

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
@ApiBearerAuth()
@UseGuards(LoggedInGuard)
export class UserSheetController {
  constructor(private readonly userIndexUsecase: UserIndexUsecase) {}

  @Post('import')
  async import(): Promise<IApiExportRes<boolean>> {
    return ApiExportRes.dto(true)
  }

  @Get('export')
  async fetch(
    @Query() req: UserIndexRequest,
  ): Promise<IApiExportRes<UserStrictResponse[]>> {
    req.isExport = true
    const response = await this.userIndexUsecase.fetch(req)

    const data = UserStrictResponse.dtos(response.data)
    const parser = new Parser()
    const dataExport = parser.parse(data)
    const fileName = `Data - ${Modules.User} - ${new Date().toISOString()}.xlsx`

    return ApiExportRes.dto(dataExport, fileName)
  }
}
