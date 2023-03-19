import { Card, Image } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

interface IProps {
  mainText: string
  title?: string
  image?: string
  description?: string
}

const CardItem: React.FC<IProps> = (props: IProps) => {
  return (
    <Card
      hoverable
      style={{ width: 180 }}
      bodyStyle={{ padding: '12px 6px' }}
      cover={
        <Image
          preview={false}
          style={{ height: 180, objectFit: 'cover' }}
          src={
            props.image ||
            'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
          }
        />
      }
    >
      {props.title || 'Europe Street beat'}
      <Meta
        title={props.mainText || 'Rp 500.000'}
        description={props.description || 'lorem woy'}
      />
    </Card>
  )
}

export default CardItem
