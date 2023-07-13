import {
  AppstoreOutlined,
  FileExcelFilled,
  PlusCircleFilled,
  SearchOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Button, Col, DatePicker, Input, Row, notification } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import FileDownload from 'js-file-download'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PermissionMethodEnum } from '../../../../@server/modules/iam/permission/common/permission.enum'
import isHasPermission from '../../../Modules/Iam/Role/common/isHasPermission'
import useModules from '../../../common/useModules'
import { Util } from '../../../common/utils/util'
import { HOST_API } from '../../../infrastructure/api.service'
import Loading from '../../Molecules/Loading/Loading'
import { IDataTableHeader } from './DataTable.interface'
import styles from './DataTable.module.css'

const DataTableHeader: React.FC<IDataTableHeader> = (
  props: IDataTableHeader,
) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const [value, setValue] = React.useState(props.searchValue)
  const [params] = useSearchParams()
  const { modules } = useModules()

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      props.onSearch && props.onSearch(value)
    }, 500)
    return () => clearTimeout(timeout)
  }, [value])

  const renderIfHasPermission = (href: string | undefined): boolean => {
    if (!href) return false

    let permissionKey: string

    if (href.includes('save')) {
      permissionKey = `${PermissionMethodEnum.post.name}/${modules}`
    } else {
      return isHasPermission([href])
    }

    return isHasPermission([permissionKey], true)
  }

  const handleExport = async () => {
    setIsLoading(true)
    await axios
      .get(`${HOST_API}${props.hrefExport}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`,
        },
        params: props.query,
      })
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
              <Button
                onClick={() => {
                  props.setShowCard && props.setShowCard(!props.showCard)
                }}
              >
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
                defaultValue={
                  [
                    params.get('startAt') && dayjs(params.get('startAt')),
                    params.get('endAt') && dayjs(params.get('endAt')),
                  ] as any
                }
              />
            </Col>
          )}
        </Row>
        <Row>
          {renderIfHasPermission(props.hrefExport) && (
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
          {renderIfHasPermission(props.hrefCreate) && (
            <Col className={styles.headerItem}>
              <Button
                type="primary"
                onClick={() => props.hrefCreate && navigate(props.hrefCreate)}
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
