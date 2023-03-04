import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Form, Input, Row } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IDataTableHeader } from './DataTable.interface'

const DataTableHeader: React.FC<IDataTableHeader> = (
  props: IDataTableHeader,
) => {
  const navigate = useNavigate()
  const [value, setValue] = React.useState(props.searchValue)
  const [form] = Form.useForm()

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      props.onSearch && props.onSearch(value)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [value])

  return (
    <Row style={{ justifyContent: 'space-between' }}>
      <Row>
        {props.search && (
          <Col style={{ margin: '2px' }}>
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
          <Col style={{ margin: '2px' }}>
            <Form form={form}>
              <DatePicker.RangePicker />
            </Form>
          </Col>
        )}
      </Row>
      <Col style={{ margin: '2px' }}>
        {props.hrefCreate && (
          <Button type="primary" onClick={() => navigate(props.hrefCreate)}>
            <PlusCircleFilled /> New Data
          </Button>
        )}
      </Col>
    </Row>
  )
}

export default DataTableHeader
