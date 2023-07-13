import { PlusOutlined } from '@ant-design/icons'
import { Form, FormInstance, Modal, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import React from 'react'
import { Path } from '../../../common/Path'
import { HOST_API } from '../../../infrastructure/api.service'
import { getBase64 } from './attachment.util'

interface IProps {
  form: FormInstance
  total: number
  name: string
}

const Attachment: React.FC<IProps> = (props: IProps) => {
  const [isInit, setIsInit] = React.useState(true)
  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [previewImage, setPreviewImage] = React.useState('')
  const [previewTitle, setPreviewTitle] = React.useState('')
  const [fileList, setFileList] = React.useState<UploadFile[]>([])
  const handleCancel = () => setPreviewOpen(false)

  React.useMemo(() => {
    const fieldValue = props?.form.getFieldValue(props.name)
    const defaultValues: string[] =
      isInit && typeof fieldValue === typeof ''
        ? [fieldValue]
        : fieldValue
        ? fieldValue
        : fileList

    const attachments: UploadFile[] = Array.isArray(defaultValues)
      ? defaultValues?.map((data: any) => {
          isInit && setIsInit(false)
          if (data.status === 'uploading') return null
          if (data.file) return data.file
          return { uid: data, name: data, url: data }
        })
      : [defaultValues]

    typeof attachments[0]?.url === typeof '' && setFileList(attachments)
  }, [fileList, isInit, props])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList }) =>
    setFileList(fileList)

  return (
    <>
      <Form.Item name={props.name}>
        <Upload
          action={`${HOST_API}${Path.Attachment}`}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          name={Path.Attachment.substring(1)}
        >
          {fileList.length >= props.total ? null : (
            <>
              <PlusOutlined style={{ margin: '4px' }} />
              <div> Upload</div>
            </>
          )}
        </Upload>
      </Form.Item>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default Attachment
