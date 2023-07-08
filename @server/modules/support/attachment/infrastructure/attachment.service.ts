import { Injectable } from '@nestjs/common'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Exception } from '@server/common/exceptions/index.exception'
import { config } from '@server/config'
import { diskStorage } from 'multer'
import { Repository } from 'typeorm'
import { EntAttachment } from './attachment.entity'
import {
  AttachmentFindRequest,
  AttachmentUploadRequest,
} from './attachment.request'

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(EntAttachment)
    private readonly attachmentRepo: Repository<EntAttachment>,
  ) {}

  async upload(
    fileUrl: string,
    req: AttachmentUploadRequest,
  ): Promise<EntAttachment> {
    const attachment = this.attachmentRepo.create({
      fileUrl,
      module: req.module,
    })

    return await this.attachmentRepo.save(attachment)
  }

  async findOne(req: AttachmentFindRequest): Promise<EntAttachment> {
    return await this.attachmentRepo.findOneOrFail({
      where: [{ fileUrl: req.fileUrl }, { module: req.module }],
    })
  }

  static fileFilter(req: Request, file: any, callback: any) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
      Exception.badRequest('This file type is not allowed!')
    }
    callback(null, true)
  }

  static multerOptions(): MulterOptions {
    return {
      fileFilter: this.fileFilter,
      storage: diskStorage({
        destination: `.${config.attachment.storage}`,
        filename: (req, file, callback) => {
          callback(null, `${Date.now() + '-'}${file.originalname}`)
        },
      }),
    }
  }
}
