import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
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
}
