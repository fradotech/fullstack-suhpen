import { Col, FormInstance, Row } from 'antd'
import React from 'react'
import { Section } from '../../../../Components/Molecules/Section/Section'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { rule } from '../../../../common/utils/form.rules'

interface IProps {
  form: FormInstance
  isDetail: boolean | undefined
}

const RoleFieldsMain: React.FC<IProps> = (props: IProps) => {
  return (
    <Section>
      <Row gutter={12}>
        <Col sm={24} md={6}>
          <FormItem
            isDetail={props.isDetail}
            name="thumbnail"
            input="attachment"
            total={1}
            form={props.form}
          />
        </Col>

        <Col sm={24} md={12}>
          <Row gutter={12}>
            <Col sm={24} md={20}>
              <FormItem
                isDetail={props.isDetail}
                name="name"
                rules={[rule.required]}
              />
            </Col>
            <Col sm={24} md={4}>
              <FormItem
                isDetail={props.isDetail}
                name="isActive"
                input="switch"
                rules={[rule.required]}
                form={props.form}
              />
            </Col>
            <Col sm={24} md={24}>
              <FormItem
                isDetail={props.isDetail}
                name="description"
                input="textArea"
              />
            </Col>

            <Col sm={24} md={24} style={{ display: 'none' }}>
              <FormItem isDetail={props.isDetail} name="permissionIds" />
            </Col>
          </Row>
        </Col>
        <Col sm={24} md={6}>
          <FormItem
            isDetail={props.isDetail}
            name="labelColor"
            input="colorPicker"
          />
        </Col>
      </Row>
    </Section>
  )
}

export default RoleFieldsMain
