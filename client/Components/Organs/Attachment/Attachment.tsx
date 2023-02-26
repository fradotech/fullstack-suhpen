import { PlusOutlined } from '@ant-design/icons'
import { Form, Modal, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import React from 'react'
import { Route } from '../../../Enums/Route'
import { host } from '../../../services/axios.service'
import { getBase64 } from './attachment.util'

interface IProps {
  total: number
  defaultValues?: string[]
  name: string
}

const Attachment: React.FC<IProps> = (props: IProps) => {
  const defaultValues = () =>
    props.defaultValues?.length > 0
      ? props.defaultValues?.map((data) => {
          return { uid: data, name: data, url: data }
        })
      : []

  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [previewImage, setPreviewImage] = React.useState('')
  const [previewTitle, setPreviewTitle] = React.useState('')
  const [fileList, setFileList] = React.useState<UploadFile[]>(defaultValues())

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  return (
    <>
      <Form.Item name={props.name}>
        <Upload
          action={`${host}${Route.Attachment}`}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          name={Route.Attachment.substring(1)}
        >
          {fileList.length >= props.total ? null : (
            <>
              <PlusOutlined />
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
