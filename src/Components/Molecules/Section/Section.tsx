import { Card } from 'antd'
import React from 'react'

interface IProps extends React.PropsWithChildren {
  marginTop?: boolean
  marginLeft?: boolean
  marginRight?: boolean
}

export const Section: React.FC<IProps> = (props: IProps) => {
  return (
    <Card
      style={{
        marginTop: props.marginTop ? '20px' : '0px',
        marginRight: props.marginRight ? '20px' : '0px',
        marginLeft: props.marginLeft ? '20px' : '0px',
        marginBottom: '12px',
      }}
      bordered={false}
    >
      {props.children}
    </Card>
  )
}
