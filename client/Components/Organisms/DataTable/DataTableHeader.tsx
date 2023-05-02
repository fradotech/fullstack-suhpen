import {
  AppstoreOutlined,
  FileExcelFilled,
  PlusCircleFilled,
  SearchOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Button, Col, DatePicker, Input, notification, Row } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import FileDownload from 'js-file-download'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loading from '../../../Components/Molecules/Loading/Loading'
import { HOST_API } from '../../../services/api.service'
import { Util } from '../../../utils/util'
import { IDataTableHeader } from './DataTable.interface'
import styles from './DataTable.module.css'

const DataTableHeader: React.FC<IDataTableHeader> = (
  props: IDataTableHeader,
) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const [value, setValue] = React.useState(props.searchValue)
  const [params] = useSearchParams()

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      props.onSearch && props.onSearch(value)
    }, 500)
    return () => clearTimeout(timeout)
  }, [value])

  const handleExport = async () => {
    setIsLoading(true)
    await axios
      .post(
        `${HOST_API}${props.hrefExport}`,
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
          {props.setShowCard && (
            <Col className={styles.headerItem}>
              <Button onClick={() => props.setShowCard(!props.showCard)}>
                {props.showCard ? (
                  <UnorderedListOutlined />
                ) : (
                  <AppstoreOutlined />
                )}
              </Button>
            </Col>
          )}
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
          {props.dateRangeColumn && (
            <Col className={styles.headerItem}>
              <DatePicker.RangePicker
                onChange={props.onDateRange}
                placeholder={[
                  `${Util.titleCase(props.dateRangeColumn)} Start`,
                  `${Util.titleCase(props.dateRangeColumn)} End`,
                ]}
                defaultValue={[
                  params.get('startAt') && dayjs(params.get('startAt')),
                  params.get('endAt') && dayjs(params.get('endAt')),
                ]}
              />
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
                icon={<FileExcelFilled />}
              >
                Export
              </Button>
            </Col>
          )}
          {props.hrefCreate && (
            <Col className={styles.headerItem}>
              <Button
                type="primary"
                onClick={() => navigate(props.hrefCreate)}
                icon={<PlusCircleFilled />}
              >
                New
              </Button>
            </Col>
          )}
        </Row>
      </Row>
    </>
  )
}

export default DataTableHeader
