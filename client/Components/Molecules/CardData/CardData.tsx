import { Card, Col, Typography } from 'antd'
import React from 'react'
import { Util } from '../../../utils/util'
interface IProps {
  title?: string
  price?: number
  value?: number
  children?: React.ReactNode
}

const CardData: React.FC<IProps> = (props: IProps) => {
  return (
    <Card
      bordered={false}
      style={{
        width: '100%',
        boxShadow: '0px 1px 20px #eeeeee',
        marginBottom: '12px',
      }}
    >
      <Typography.Text strong type="secondary">
        {props.title}
      </Typography.Text>
      <Col style={{ marginBottom: '10px' }}>
        <Typography.Text strong style={{ fontSize: '24px' }}>
          {(props.price && Util.formatCurrency(props.price)) ||
            (props.value && props.value)}
        </Typography.Text>
      </Col>
      {props.children}
    </Card>
  )
}

export default CardData
