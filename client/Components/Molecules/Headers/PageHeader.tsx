import Title from 'antd/es/typography/Title'
import React from 'react'

interface IProps {
  title: string
  hrefCreate?: string
}

export const PageHeader: React.FC<IProps> = (props: IProps) => {
  return (
    <Title
      style={{
        fontSize: '24px',
        lineHeight: '32px',
        marginTop: 0,
        marginLeft: 2,
      }}
    >
      {props.title}
    </Title>
  )
}
