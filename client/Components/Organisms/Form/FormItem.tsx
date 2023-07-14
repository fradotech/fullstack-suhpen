import {
  Input as AntdInput,
  DatePicker,
  Form,
  InputNumber,
  Select,
  Switch,
  Tag,
} from 'antd'
import { Colorpicker } from 'antd-colorpicker'
import { FormInstance, Rule } from 'antd/es/form'
import { DefaultOptionType } from 'antd/es/select'
import dayjs from 'dayjs'
import { SharedTimeProps } from 'rc-picker/lib/panels/TimePanel'
import React from 'react'
import { Util } from '../../../common/utils/util'
import Attachment from '../../Molecules/Attachment/Attachment'

interface IProps {
  name: string
  form?: FormInstance
  label?: string
  disabled?: boolean
  input?:
    | 'input'
    | 'inputNumber'
    | 'inputPercentage'
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
  rows?: number
  style?: React.CSSProperties
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
        return {
          label: <Tag color={data['labelColor']}>{data['name']}</Tag>,
          value: data['id'],
        }
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
          style={props.style}
        />
      )
      break

    case 'inputNumber':
      input = (
        <InputNumber
          disabled={props.disabled}
          placeholder={props.placeholder || Util.titleCase(props.name)}
          parser={(value: string) => +value}
          style={{ ...props.style, width: '100%' }}
        />
      )
      break

    case 'inputPercentage':
      input = (
        <InputNumber
          disabled={props.disabled}
          placeholder={props.placeholder || Util.titleCase(props.name)}
          addonAfter="%"
          parser={(value: string) => +value}
          style={{ ...props.style, width: '100%' }}
        />
      )
      break

    case 'inputRupiah':
      input = (
        <InputNumber
          disabled={props.disabled}
          placeholder={props.placeholder || Util.titleCase(props.name)}
          addonBefore="Rp"
          parser={(value: string) => +value}
          style={{ ...props.style, width: '100%' }}
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
          style={{ ...props.style, width: '100%' }}
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
          style={{ ...props.style, width: '100%' }}
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
          style={{ ...props.style, width: '100%' }}
        />
      )
      break

    case 'rangePicker':
      input = (
        <DatePicker.RangePicker
          disabled={props.disabled}
          showTime={props.showTime}
          format={props.format}
          style={{ ...props.style, width: '100%' }}
        />
      )
      break

    case 'textArea':
      input = (
        <AntdInput.TextArea
          disabled={props.disabled}
          rows={props.rows}
          placeholder={props.placeholder || Util.titleCase(props.name)}
          style={props.style}
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
          style={props.style}
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
