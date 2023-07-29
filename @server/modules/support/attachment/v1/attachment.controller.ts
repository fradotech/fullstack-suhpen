import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { config } from '@server/config'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ApiRes } from '@server/infrastructure/interfaces/api.response'
import { Modules } from '@server/modules/modules'
import * as path from 'path'
import { AttachmentUploadResponse } from '../infrastructure/attachment.response'
import { AttachmentService } from '../infrastructure/attachment.service'
import {
  AttachmentFindRequest,
  AttachmentUploadRequest,
} from './attachment.request'

const THIS_MODULE = Modules.Attachment

@Controller(THIS_MODULE)
@ApiTags(THIS_MODULE)
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Get(':filePath')
  findUploadedAttachment(@Param('filePath') file: string, @Res() res: any) {
    return res.sendFile(file, {
      root: path.resolve('./') + config.attachment.storage,
    })
  }

  @Post()
  @UseInterceptors(
    FileInterceptor(THIS_MODULE, AttachmentService.multerOptions()),
  )
  async uploadAttachment(
    @UploadedFile() file: Express.Multer.File,
    @Body() req: AttachmentUploadRequest,
  ): Promise<IApiRes<AttachmentUploadResponse>> {
    const fileUrl =
      config.server.hostApi + '/' + THIS_MODULE + '/' + file.filename

    const attachment = await this.attachmentService.upload(fileUrl, req)
    return ApiRes.dto(AttachmentUploadResponse.dto(attachment))
  }

  @Get()
  async findAttachment(
    @Query() attachmentFindRequest: AttachmentFindRequest,
  ): Promise<IApiRes<AttachmentUploadResponse>> {
    const attachment = await this.attachmentService.findOne(
      attachmentFindRequest,
    )

    return ApiRes.dto(AttachmentUploadResponse.dto(attachment))
  }
}
