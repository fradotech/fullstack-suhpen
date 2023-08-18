import { Attachment } from './attachment.entity'
import { IAttachment } from './attachment.interface'

export class AttachmentUploadResponse extends Attachment {
  static dto(data: IAttachment): AttachmentUploadResponse {
    return Object.assign(new AttachmentUploadResponse(), data)
  }
}
