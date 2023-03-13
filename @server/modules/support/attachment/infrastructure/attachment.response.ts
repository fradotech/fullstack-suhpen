import { EntAttachment } from './attachment.entity'
import { IAttachment } from './attachment.interface'

export class AttachmentUploadResponse extends EntAttachment {
  static fromEntity(data: IAttachment): AttachmentUploadResponse {
    return Object.assign(new AttachmentUploadResponse(), data)
  }
}
