import { Layout } from 'antd'
import React from 'react'

export type IProps = {
  children: React.ReactNode
  headerRightMenu?: React.FC
}

const { Content } = Layout

const Blank: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <Layout>
      <Content style={{ padding: '150px' }}>{children}</Content>
    </Layout>
  )
}

export default Blank
