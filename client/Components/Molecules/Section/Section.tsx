import { Card } from 'antd'
import React from 'react'

export const Section: React.FC<React.PropsWithChildren> = (props) => {
  const { ...cardProps } = props
  return (
    <Card
      style={{ boxShadow: '0px 1px 20px #eeeeee', marginBottom: '20px' }}
      {...cardProps}
    >
      {props.children}
    </Card>
  )
}
