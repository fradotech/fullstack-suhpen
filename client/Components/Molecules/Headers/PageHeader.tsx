import Title from 'antd/es/typography/Title'
import React from 'react'
import Loading from '../Loading/Loading'

interface IProps {
  title: string
  hrefCreate?: string
  isLoading?: boolean
}

export const PageHeader: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <Loading isLoading={props.isLoading} />
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
    </>
  )
}
