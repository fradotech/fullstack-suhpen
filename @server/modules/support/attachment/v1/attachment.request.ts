import { PickType } from '@nestjs/swagger'
import { Attachment } from '../infrastructure/attachment.entity'

export class AttachmentFindRequest extends Attachment {}

export class AttachmentUploadRequest extends PickType(AttachmentFindRequest, [
  'module',
]) {}
