import { Descriptions, DescriptionsProps, Grid } from 'antd'
import React from 'react'

const DescriptionContainer: React.FC<React.PropsWithChildren> = ({
  size = 'default',
  ...props
}: DescriptionsProps) => {
  const { md } = Grid.useBreakpoint()
  return (
    <Descriptions
      layout="horizontal"
      bordered
      size={size}
      labelStyle={
        props.layout == 'horizontal' && {
          ...props.labelStyle,
          width: md && '15%',
        }
      }
      contentStyle={
        props.layout == 'horizontal' && {
          ...props.contentStyle,
          width: md && '30%',
        }
      }
      column={
        props.column ? props.column : { xl: 1, lg: 1, md: 2, sm: 1, xs: 1 }
      }
      {...props}
    >
      {props.children}
    </Descriptions>
  )
}

export default DescriptionContainer
