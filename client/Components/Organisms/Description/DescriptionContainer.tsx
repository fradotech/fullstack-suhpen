import { Descriptions, DescriptionsProps, Grid } from 'antd'
import React from 'react'

const DescriptionContainer: React.FC<React.PropsWithChildren> = ({
  size = 'small',
  ...props
}: DescriptionsProps) => {
  const { md } = Grid.useBreakpoint()
  return (
    <Descriptions
      layout="horizontal"
      bordered
      size={size}
      labelStyle={
        props.layout === 'horizontal'
          ? {
              ...props.labelStyle,
              width: md ? '15%' : undefined,
            }
          : undefined
      }
      contentStyle={
        props.layout === 'horizontal'
          ? {
              ...props.contentStyle,
              width: md ? '15%' : undefined,
            }
          : undefined
      }
      column={
        props.column ? props.column : { xl: 2, lg: 1, md: 2, sm: 1, xs: 1 }
      }
      {...props}
    >
      {props.children}
    </Descriptions>
  )
}

export default DescriptionContainer
