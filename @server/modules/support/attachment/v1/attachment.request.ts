import { PickType } from '@nestjs/swagger'
import { EntAttachment } from '../infrastructure/attachment.entity'

export class AttachmentFindRequest extends EntAttachment {}

export class AttachmentUploadRequest extends PickType(AttachmentFindRequest, [
  'module',
]) {}
