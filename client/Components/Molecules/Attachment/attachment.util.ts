import { RcFile } from 'antd/es/upload'

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const getAttachment = (attachments: any): string | string[] => {
  if (!attachments) return undefined
  if (typeof attachments === typeof '') return attachments
  const fileUrls: string[] = attachments.fileList.map(
    (data: any) => data.response.data.fileUrl,
  )
  if (fileUrls.length <= 1) return fileUrls[0]
  return fileUrls
}
