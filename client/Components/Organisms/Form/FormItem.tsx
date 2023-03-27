import {
  DatePicker,
  Form,
  Input as AntdInput,
  InputNumber,
  Select,
  Switch,
} from 'antd'
import { Colorpicker } from 'antd-colorpicker'
import { FormInstance, Rule } from 'antd/es/form'
import { DefaultOptionType } from 'antd/es/select'
import dayjs from 'dayjs'
import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel'
import React from 'react'
import { Util } from '../../../utils/util'
import Attachment from '../../Molecules/Attachment/Attachment'

interface IProps {
  form?: FormInstance
  label?: string
  name: string
  disabled?: boolean
  input?:
    | 'input'
    | 'inputNumber'
    | 'inputRupiah'
    | 'inputPassword'
    | 'select'
    | 'selectMultiple'
    | 'datePicker'
    | 'rangePicker'
    | 'attachment'
    | 'textArea'
    | 'colorPicker'
    | 'switch'
  rules?: Rule[]
  required?: boolean
  placeholder?: string
  type?: string
  options?: Record<string, any>[] | DefaultOptionType[]
  optionsEnum?: string[]
  showTime?: boolean | SharedTimeProps<dayjs.Dayjs> | any
  format?: string
  total?: number
}

const FormItem: React.FC<IProps> = (props: IProps) => {
  let input: React.ReactNode
  const [isChecked, setIsChecked] = React.useState(false)

  const filterOption = (input: string, option: DefaultOptionType) => {
    return String(option?.label ?? '')
      .toLowerCase()
      .includes(input.toLowerCase())
  }

  const selectOption = props.optionsEnum
    ? (props.optionsEnum.map((data) => {
        return { label: data, value: data }
      }) as DefaultOptionType[])
    : (props.options?.map((data: Record<string, any>) => {
        return { label: data['name'], value: data }
      }) as unknown as DefaultOptionType[])

  React.useMemo(() => {
    setIsChecked(props.form?.getFieldValue(props.name))
  }, [props.form?.getFieldValue(props.name)])

  switch (props.input) {
    case 'inputPassword':
      input = (
        <AntdInput.Password
          disabled={props.disabled}
          type="password"
          placeholder={props.placeholder || Util.titleCase(props.name)}
        />
      )
      break

    case 'inputNumber':
      input = (
        <InputNumber
          disabled={props.disabled}
          parser={(value: string) => +value}
          style={{ width: '100%' }}
        />
      )
      break

    case 'select':
      input = (
        <Select
          disabled={props.disabled}
          showSearch
          filterOption={filterOption}
          options={selectOption}
          placeholder={props.placeholder || Util.titleCase(props.name)}
        />
      )
      break

    case 'selectMultiple':
      input = (
        <Select
          disabled={props.disabled}
          allowClear
          mode="multiple"
          showSearch
          filterOption={filterOption}
          options={selectOption}
          placeholder={props.placeholder || Util.titleCase(props.name)}
        />
      )
      break

    case 'datePicker':
      input = (
        <DatePicker
          disabled={props.disabled}
          showTime={props.showTime}
          format={props.format}
          placeholder={props.placeholder || Util.titleCase(props.name)}
          style={{ width: '100%' }}
        />
      )
      break

    case 'rangePicker':
      input = (
        <DatePicker.RangePicker
          disabled={props.disabled}
          showTime={props.showTime}
          format={props.format}
          style={{ width: '100%' }}
        />
      )
      break

    case 'textArea':
      input = (
        <AntdInput.TextArea
          disabled={props.disabled}
          placeholder={props.placeholder || Util.titleCase(props.name)}
        />
      )
      break

    case 'attachment':
      input = (
        <Attachment total={props.total} name={props.name} form={props.form} />
      )
      break

    case 'switch':
      input = (
        <Switch
          disabled={props.disabled}
          checked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
        />
      )
      break

    case 'colorPicker':
      input = <Colorpicker />
      break

    default:
      input = (
        <AntdInput
          disabled={props.disabled}
          type={props.type}
          placeholder={props.placeholder || Util.titleCase(props.name)}
        />
      )
      break
  }

  return (
    <Form.Item
      label={props.label || Util.titleCase(props.name)}
      name={props.name}
      rules={props.rules}
    >
      {input}
    </Form.Item>
  )
}

export default FormItem
