import { Card, Col, Typography } from 'antd'
import React from 'react'
import { Util } from '../../../utils/util'

interface IProps {
  title: string
  value: number
  oneLineWidth: string
}

const CardData: React.FC<IProps> = (props: IProps) => {
  return (
    <Card
      bordered={false}
      style={{
        width: props.oneLineWidth,
        boxShadow: '0px 1px 20px #eeeeee',
        margin: '10px',
      }}
    >
      <Typography.Text strong type="secondary">
        {props.title}
      </Typography.Text>
      <Col>
        <Typography.Text strong style={{ fontSize: '24px' }}>
          {Util.formatCurrency(props.value)}
        </Typography.Text>
      </Col>
    </Card>
  )
}

export default CardData
