import {
  FileExcelOutlined,
  PlusCircleFilled,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Input, notification, Row } from 'antd'
import axios from 'axios'
import FileDownload from 'js-file-download'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../Components/Molecules/Loading/Loading'
import { hostApi } from '../../../services/axios.service'
import { IDataTableHeader } from './DataTable.interface'
import styles from './DataTable.module.css'

const DataTableHeader: React.FC<IDataTableHeader> = (
  props: IDataTableHeader,
) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const [value, setValue] = React.useState(props.searchValue)
  const [form] = Form.useForm()

  React.useEffect(() => {
    const timeout = setTimeout(
      () => props.onSearch && props.onSearch(value),
      500,
    )
    return () => clearTimeout(timeout)
  }, [value])

  const handleExport = async () => {
    setIsLoading(true)
    await axios
      .post(
        `${hostApi}${props.hrefExport}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
          },
          params: props.query,
        },
      )
      .then((response: any) =>
        FileDownload(response.data.data, response.data.fileName),
      )
      .catch((e) => {
        setIsLoading(false)
        notification.error({ message: String(e) })
      })
    setIsLoading(false)
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <Row style={{ justifyContent: 'space-between' }}>
        <Row>
          {props.search && (
            <Col className={styles.headerItem}>
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                allowClear
              />
            </Col>
          )}
          {props.dateRange && (
            <Col className={styles.headerItem}>
              <Form form={form}>
                <DatePicker.RangePicker />
              </Form>
            </Col>
          )}
        </Row>
        <Row>
          {props.hrefExport && (
            <Col className={styles.headerItem}>
              <Button
                type="primary"
                onClick={handleExport}
                style={{ backgroundColor: '#0f9d59' }}
              >
                <FileExcelOutlined /> Export
              </Button>
            </Col>
          )}
          {props.hrefCreate && (
            <Col className={styles.headerItem}>
              <Button type="primary" onClick={() => navigate(props.hrefCreate)}>
                <PlusCircleFilled /> New
              </Button>
            </Col>
          )}
        </Row>
      </Row>
    </>
  )
}

export default DataTableHeader
