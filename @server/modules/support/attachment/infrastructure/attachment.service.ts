import { Injectable } from '@nestjs/common'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Exception } from '@server/common/exceptions/index.exception'
import { config } from '@server/config'
import { diskStorage } from 'multer'
import { Repository } from 'typeorm'
import {
  AttachmentFindRequest,
  AttachmentUploadRequest,
} from '../v1/attachment.request'
import { Attachment } from './attachment.entity'

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepo: Repository<Attachment>,
  ) {}

  async upload(
    fileUrl: string,
    req: AttachmentUploadRequest,
  ): Promise<Attachment> {
    const attachment = this.attachmentRepo.create({
      fileUrl,
      module: req.module,
    })

    return await this.attachmentRepo.save(attachment)
  }

  async findOne(req: AttachmentFindRequest): Promise<Attachment> {
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
