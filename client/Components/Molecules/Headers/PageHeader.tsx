import { Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import Loading from '../Loading/Loading'
import styles from './PageHeader.module.css'

interface IProps {
  title?: string
  isLoading?: boolean
}

export const PageHeader: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <Loading isLoading={props.isLoading} />
      <Row className={styles.container}>
        {props.title && <Title className={styles.title}>{props.title}</Title>}
      </Row>
    </>
  )
}
