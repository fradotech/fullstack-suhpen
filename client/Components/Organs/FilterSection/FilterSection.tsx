import { SearchOutlined } from '@ant-design/icons'
import { Col, DatePicker, Form, FormInstance, Input, Row, Select } from 'antd'
import React from 'react'
import { Utils } from '../../../utils/utils'

export interface IFilterSection {
  filters?: {
    name: string
    enum?: Record<string, any>
  }[]
  onFiltersChange?: (values: Record<string, any>) => void
  onSearch?: (value: string) => void
  searchValue?: string
}

export type InternalHooks = {
  registerWatch: (FC: (store: Record<string, any>) => void) => void
}
export interface IFilterFormInstance<T = any> extends FormInstance<T> {
  getInternalHooks: (mark: string) => InternalHooks
}
export const HOOK_MARK = 'RC_FORM_INTERNAL_HOOKS'

export const FilterSection = (props: IFilterSection) => {
  const [value, setValue] = React.useState(props.searchValue)
  const [form] = Form.useForm()

  React.useEffect(() => {
    const { registerWatch } = (form as IFilterFormInstance).getInternalHooks(
      HOOK_MARK,
    )

    const cancelRegister = registerWatch((store) =>
      props?.onFiltersChange(store),
    )
    return cancelRegister
  }, [])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      props.onSearch && props.onSearch(value)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [value])

  return (
    <Row gutter={[8, 0]} align="middle">
      {/* Filters */}
      <Form form={form}>
        <Row gutter={[8, 0]} align="middle">
          {props.filters?.map((item, index) => {
            return (
              <Col key={index}>
                <Form.Item name={item.name} noStyle>
                  {item.name == 'dateRange' ? (
                    <DatePicker.RangePicker />
                  ) : (
                    <Select
                      placeholder={Utils.titleCase(item.name)}
                      options={React.useMemo(() => {
                        return Object.keys(item.enum).map((key) => {
                          return { label: key, value: key }
                        })
                      }, [])}
                      allowClear
                      style={{ minWidth: '120px' }}
                    />
                  )}
                </Form.Item>
              </Col>
            )
          })}
        </Row>
      </Form>

      <Col flex="auto">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          allowClear
        />
      </Col>
    </Row>
  )
}
