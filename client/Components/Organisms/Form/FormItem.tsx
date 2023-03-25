import { DatePicker, Form, Input as AntdInput, InputNumber, Select } from 'antd'
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
  input?:
    | 'input'
    | 'inputNumber'
    | 'inputRupiah'
    | 'inputPassword'
    | 'select'
    | 'datePicker'
    | 'rangePicker'
    | 'attachment'
    | 'textArea'
  rules?: Rule[]
  required?: boolean
  placeholder?: string
  type?: string
  options?: DefaultOptionType[]
  optionsEnum?: string[]
  showTime?: boolean | SharedTimeProps<dayjs.Dayjs> | any
  format?: string
  total?: number
}

const FormItem: React.FC<IProps> = (props: IProps) => {
  let input: React.ReactNode

  switch (props.input) {
    case 'inputPassword':
      input = (
        <AntdInput.Password
          type="password"
          placeholder={props.placeholder || Util.titleCase(props.name)}
        />
      )
      break

    case 'inputNumber':
      input = <InputNumber />
      break

    case 'select':
      input = (
        <Select
          options={
            props.optionsEnum
              ? props.optionsEnum.map((data) => {
                  return { label: data, value: data }
                })
              : props.options
          }
          placeholder={props.placeholder || Util.titleCase(props.name)}
        />
      )
      break

    case 'datePicker':
      input = (
        <DatePicker
          showTime={props.showTime}
          format={props.format}
          placeholder={props.placeholder || Util.titleCase(props.name)}
        />
      )
      break

    case 'rangePicker':
      input = (
        <DatePicker.RangePicker
          showTime={props.showTime}
          format={props.format}
        />
      )
      break

    case 'textArea':
      input = <AntdInput.TextArea />
      break

    case 'attachment':
      input = (
        <Attachment total={props.total} name={props.name} form={props.form} />
      )
      break

    default:
      input = (
        <AntdInput
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
