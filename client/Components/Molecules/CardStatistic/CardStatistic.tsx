import { Card, Statistic, StatisticProps } from 'antd'
import React from 'react'

interface IProps extends StatisticProps {
  children?: React.ReactNode
}

const CardStatistic: React.FC<IProps> = (props: IProps) => {
  const { children, ...rest } = props
  return (
    <Card
      bordered={false}
      style={{
        width: '100%',
        marginBottom: '12px',
      }}
    >
      <Statistic {...rest} />
      {children}
    </Card>
  )
}

export default CardStatistic
