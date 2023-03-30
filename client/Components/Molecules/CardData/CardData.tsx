import { Card, Col, Typography } from 'antd'
import React from 'react'
import { isMobileScreen } from '../../../utils/is-mobile'
import { Util } from '../../../utils/util'
interface IProps {
  title?: string
  value?: number
  oneLineWidth?: string
  children?: React.ReactNode
}

const CardData: React.FC<IProps> = (props: IProps) => {
  const isMobile = isMobileScreen()
  return (
    <Card
      bordered={false}
      style={{
        width: isMobile ? '100%' : props.oneLineWidth,
        boxShadow: '0px 1px 20px #eeeeee',
        margin: '10px',
      }}
    >
      <Typography.Text strong type="secondary">
        {props.title}
      </Typography.Text>
      <Col style={{ marginBottom: '10px' }}>
        <Typography.Text strong style={{ fontSize: '24px' }}>
          {props.value && Util.formatCurrency(props.value)}
        </Typography.Text>
      </Col>
      {props.children}
    </Card>
  )
}

export default CardData
